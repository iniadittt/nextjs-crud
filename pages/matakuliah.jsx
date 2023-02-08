import React, { useState, useEffect } from 'react'
import Navigasi from '../components/Navigasi'
import Link from 'next/link'
import Router from 'next/router'

const dataSKS = [1,2,3,4,5,6,7,8,9]

export async function getServerSideProps(ctx) {
    const reqMatakuliah = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/matakuliah`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resMatakuliah = await reqMatakuliah.json()
    const data = resMatakuliah.code === 200 ? resMatakuliah.data : null
    const reqDosen = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dosen`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resDosen = await reqDosen.json()
    const dataDosen = resDosen.code === 200 ? resDosen.data : ''
    return {
        props: {
            data,
            dataDosen
        }
    }
}

const Matakuliah = ({ data, dataDosen }) => {    

    console.log(dataDosen)
    const [fields, setFields] = useState({
        kodemk: '',
        nama: '',
        sks: dataSKS[0],
        nidn: dataDosen ? dataDosen[0].nidn : ''
    })
    const [newData, setNewData] = useState(null)
    const [searchData, setSearchData] = useState('')

    const handlerFields = (e) => {
        e.preventDefault()
        const name = e.target.name
        return setFields({ ...fields, [name] : e.target.value })
    }

    const handlerSubmit = async(e) => {
        e.preventDefault()
        const reqTambahMatakuliah = await fetch('/api/matakuliah', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields),
        })
        const resTambahMatakuliah = await reqTambahMatakuliah.json()
        if(resTambahMatakuliah.code === 200){
            alert(resTambahMatakuliah.message)
            Router.push('/matakuliah')
        }else{
            alert(resTambahMatakuliah.message)
        }
    }

    const handlerDelete = async(e, kodemk) => {
        e.preventDefault()
        const status = confirm(`Apakah anda yakin ingin menghapus Matakuliah (Kode Matakuliah) : ${kodemk}`)
        const reqDeleteMatakuliah = await fetch(`/api/matakuliah/${kodemk}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        const resDeleteMatakuliah= await reqDeleteMatakuliah.json()
        if(resDeleteMatakuliah.code === 200){
            alert(resDeleteMatakuliah.message)
            Router.push('/matakuliah')
        }else{
            alert(resDeleteMatakuliah.message || 'Data matakuliah masih digunakan pada menu lain')
        }
    }

    const changeSearchData = (e) => {
        e.preventDefault()
        setSearchData(e.target.value)
    }

    useEffect(() => {
        if(data){
            const filteredData = data.filter(element => {
                if (searchData === '') return element
                return element.kodemk.toLowerCase().includes(searchData.toLowerCase())
            })
            setNewData(filteredData)
        }else{
            setNewData([])
        }
    },[searchData, data])

    return (
        <>
            <Navigasi/>
            <div className='container mt-5'>
                <h1 className="display-6">CRUD Matakuliah</h1>
                <div className='mt-4 d-flex justify-space-beetwen'>
                    <button type="button" className="btn btn-success col-1" data-bs-toggle="modal" data-bs-target="#tambahMatakuliah">
                        Tambah
                    </button>
                    <div className='col-9'/>
                    <input type="email" className="form-control col" name='searchData' placeholder="Cari Kode Matakuliah" onChange={e => changeSearchData(e)} maxLength={10} value={searchData}/>
                </div>
                <div className="modal modal-lg fade" id="tambahMatakuliah" tabIndex="-1" aria-labelledby="tambahMatakuliahLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 px-3" id="tambahMatakuliahLabel">Tambah Data Matakuliah</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='px-3'>
                                    <div className="mb-3 row">
                                        <label htmlFor="exampleFormControlInputKode" className="col-sm-3 col-form-label">Kode Matakuliah</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name='kodemk' id="exampleFormControlInputKode" placeholder='1234567890' value={fields.nim} maxLength={5} onChange={e => handlerFields(e)}/>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="exampleFormControlInputNama" className="col-sm-3 col-form-label">Nama Matakuliah</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="exampleFormControlInputNama" name='nama' placeholder="John Doe" value={fields.nama} maxLength={80} onChange={e => handlerFields(e)}/>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="exampleFormControlInputSKS" className="col-sm-3 col-form-label">Jumlah SKS</label>
                                        <div className="col-sm-9">
                                        <select className="form-select" name='sks' id='exampleFormControlInputSKS' aria-label="Default select example" onChange={e => handlerFields(e)}>
                                            {
                                                dataSKS.map(element => {
                                                    return <option key={element} value={element}>{element}</option>
                                                })
                                            }
                                        </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="exampleFormControlInputNIDN" className="col-sm-3 col-form-label">NIDN Dosen</label>
                                        <div className="col-sm-9">
                                        <select className="form-select" name='nidn' id='exampleFormControlInputNIDN' aria-label="Default select example" onChange={e => handlerFields(e)}>
                                            {
                                                dataDosen ?
                                                dataDosen.map((dosen, index) => {
                                                    return <option key={index} value={dosen.nidn}>{dosen.nidn} - {dosen.nama}</option>
                                                }):
                                                <option>Data dosen belum tersedia</option>
                                            }
                                        </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer px-4">
                                <button type="button" className="btn btn-success" onClick={e => handlerSubmit(e)}>Tambah</button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !data ?
                    <p>Data Matakuliah Belum Tersedia</p> :
                    <table className="table table-striped mt-2">
                        <thead className="bg-success text-white">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Kode Matakuliah</th>
                                <th scope="col">Nama Matakuliah</th>
                                <th scope="col">SKS</th>
                                <th scope="col">Dosen Pengampu</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newData ?
                                newData.map((matakuliah, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td className='text-uppercase'>{matakuliah.kodemk}</td>
                                                <td>{matakuliah.nama}</td>
                                                <td>{matakuliah.sks}</td>
                                                <td>{matakuliah.nidn} - {matakuliah.namaDosen}</td>
                                                <td>
                                                    <div className='d-flex flex-row gap-2'>
                                                        <Link href={`/matakuliah/${matakuliah.kodemk}`} className="btn btn-sm btn-primary">Update</Link>
                                                        <a className="btn btn-sm btn-danger" onClick={e => handlerDelete(e, matakuliah.kodemk)}>Delete</a>
                                                    </div>
                                                </td>
                                            </tr>
                                }):
                                data.map((matakuliah, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td className='text-uppercase'>{matakuliah.kodemk}</td>
                                                <td>{matakuliah.nama}</td>
                                                <td>{matakuliah.sks}</td>
                                                <td>{matakuliah.nidn} - {matakuliah.namaDosen}</td>
                                                <td>
                                                    <div className='d-flex flex-row gap-2'>
                                                        <Link href={`/matakuliah/${matakuliah.kodemk}`} className="btn btn-sm btn-primary">Update</Link>
                                                        <a className="btn btn-sm btn-danger" onClick={e => handlerDelete(e, matakuliah.kodemk)}>Delete</a>
                                                    </div>
                                                </td>
                                            </tr>
                                })      
                            }
                        </tbody>
                    </table>
                }
                
            </div>
        </>
    )
}

export default Matakuliah