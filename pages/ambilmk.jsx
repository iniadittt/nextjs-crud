import React, { useState, useEffect } from 'react'
import Navigasi from '../components/Navigasi'
import Link from 'next/link'
import Router from 'next/router'

export async function getServerSideProps(ctx) {
    const reqAmbilMk = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ambilmk`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resAmbilMk = await reqAmbilMk.json()
    const data = resAmbilMk.code === 200 ? resAmbilMk.data : null
    return {
        props: {
            data
        }
    }
}

const AmbilMk = ({ data }) => {

    const [fields, setFields] = useState({
        kodeambilmk: '',
        nim: '',
        kodemk: '',
        nilai: ''
    })
    const [nama, setNama] = useState({ mahasiswa: '', matakuliah: '' })
    const [error, setError] = useState({ mahasiswa: '', matakuliah: '' })
    const [status, setStatus] = useState({ mahasiswa: false, matakuliah: false })
    const [newData, setNewData] = useState(null)
    const [searchData, setSearchData] = useState('')

    const handlerFields = (e) => {
        e.preventDefault()
        const name = e.target.name
        setFields({ ...fields, [name] : e.target.value })
        if(name === 'nim'){
            setStatus({ ...status, mahasiswa: false })
        }else if(name === 'kodemk'){
            setStatus({ ...status, matakuliah: false })
        }else{
            setStatus({ ...status })
        }
        
    }

    const handlerSubmit = async(e) => {
        e.preventDefault()
        if(!(status.mahasiswa && status.matakuliah)) return alert('Cari Data Terlebih Dahulu')
        const reqTambahAmbilMk = await fetch('/api/ambilmk', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields),
        })
        const resTambahAmbilMk = await reqTambahAmbilMk.json()
        if(resTambahAmbilMk.code === 200){
            alert(resTambahAmbilMk.message)
            Router.push('/ambilmk')
        }else{
            alert(resTambahAmbilMk.message)
        }
    }

    const handlerDelete = async(e, kodeambilmk) => {
        e.preventDefault()
        const status = confirm(`Apakah anda yakin ingin menghapus data Ambil Matakuliah : ${kodeambilmk}`)
        const reqDeleteAmbilMk = await fetch(`/api/ambilmk/${kodeambilmk}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        const resDeleteAmbilMk = await reqDeleteAmbilMk.json()
        if(resDeleteAmbilMk.code === 200){
            alert(resDeleteAmbilMk.message)
            Router.push('/ambilmk')
        }else{
            alert(resDeleteAmbilMk.message)
        }
    }

    const handlerCariNim = async(e) => {
        e.preventDefault()
        const { nim } = fields
        const reqGetMahasiswa = await fetch(`/api/mahasiswa/${nim || 0}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resGetMahasiswa = await reqGetMahasiswa.json()
        if(resGetMahasiswa.code !== 200) return setError({ ...error, mahasiswa: resGetMahasiswa.message })
        const mahasiswa = resGetMahasiswa.data.nama
        setError({ ...error, mahasiswa: '' })
        setNama({ ...nama, mahasiswa })
        setStatus({ ...status, mahasiswa: true })
        setFields({ ...fields, kodeambilmk: `${fields.nim.slice(-5)}${fields.kodemk.slice(0,5)}` })
    }

    const handlerCariKodeMk = async(e) => {
        e.preventDefault()
        const { kodemk } = fields
        const reqGetMatakuliah= await fetch(`/api/matakuliah/${kodemk || 0}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resGetMatakuliah = await reqGetMatakuliah.json()
        if(resGetMatakuliah.code !== 200) return setError({ ...error, matakuliah: resGetMatakuliah.message })
        const matakuliah = resGetMatakuliah.data.nama
        setError({ ...error, matakuliah: '' })
        setNama({ ...nama, matakuliah })
        setStatus({ ...status, matakuliah: true })
        setFields({ ...fields, kodeambilmk: `${fields.nim.slice(-5)}${fields.kodemk.slice(0,5)}` })
    }

    const changeSearchData = (e) => {
        e.preventDefault()
        setSearchData(e.target.value)
    }

    useEffect(() => {
        if(data){
            const filteredData = data.filter(element => {
                if (searchData === '') return element
                return element.kodeambilmk.toLowerCase().includes(searchData.toLowerCase())
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
                <h1 className="display-6">CRUD Ambil Matakuliah</h1>
                <div className='mt-4 d-flex justify-space-beetwen'>
                    <button type="button" className="btn btn-success col-1" data-bs-toggle="modal" data-bs-target="#tambahAmbilMatakuliah">
                        Tambah
                    </button>
                    <div className='col-9'/>
                    <input type="email" className="form-control col" name='searchData' placeholder="Cari Kode AmbilMK" onChange={e => changeSearchData(e)} maxLength={10} value={searchData}/>
                </div>
                <div className="modal modal-lg fade" id="tambahAmbilMatakuliah" tabIndex="-1" aria-labelledby="tambahAmbilMatakuliahLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 px-3" id="tambahAmbilMatakuliahLabel">Tambah Data Ambil Matakuliah</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='px-3'>

                                    <div className="mb-3 row">
                                        <label htmlFor="exampleFormControlInputKode" className="col-sm-3 col-form-label">Kode Ambil Matakuliah</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name='kodeambilmk' id="exampleFormControlInputKode" placeholder='1234567890' value={fields.kodeambilmk} maxLength={10} disabled/>
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label htmlFor="exampleFormControlInputNim" className="col-sm-3 col-form-label">NIM</label>
                                        <div className="col-sm-9 d-flex gap-2">
                                            <input type="text" className="form-control" id="exampleFormControlInputNim" name='nim' placeholder="1234567890" value={fields.nim} maxLength={10} onChange={e => handlerFields(e)}/>
                                            <button type="button" className="btn btn-success col-sm-2" onClick={e => handlerCariNim(e)}>Cari NIM</button>
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label htmlFor="exampleFormControlInputNama" className="col-sm-3 col-form-label">Nama Mahasiswa</label>
                                        <div className="col-sm-9 d-flex gap-2">
                                            <input type="text" className="form-control" id="exampleFormControlInputNama" name='namaMahasiswa' placeholder="John Doe" value={error.mahasiswa || nama.mahasiswa} maxLength={80} disabled/>
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label htmlFor="exampleFormControlInputKodemk" className="col-sm-3 col-form-label">Kode Matakuliah</label>
                                        <div className="col-sm-9 d-flex gap-2">
                                            <input type="text" className="form-control" id="exampleFormControlInputKodemk" name='kodemk' placeholder="BASDAT01" value={fields.kodemk} maxLength={10} onChange={e => handlerFields(e)}/>
                                            <button type="button" className="btn btn-success col-sm-3" onClick={e => handlerCariKodeMk(e)}>Cari Matakuliah</button>
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label htmlFor="exampleFormControlInputNamamk" className="col-sm-3 col-form-label">Nama Matakuliah</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="exampleFormControlInputNamamk" name='namaMatakuliah' placeholder="Basis Data Lanjut" value={error.matakuliah || nama.matakuliah} maxLength={80} disabled/>
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label htmlFor="exampleFormControlInputNilai" className="col-sm-3 col-form-label">Nilai</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="exampleFormControlInputNilai" name='nilai' placeholder="99" value={fields.nilai} maxLength={2} onChange={e => handlerFields(e)}/>
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
                                <th scope="col">Kode Ambil Matakuliah</th>
                                <th scope="col">NIM</th>
                                <th scope="col">Kode Matakuliah</th>
                                <th scope="col">Nilai</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newData ?
                                newData.map((ambilmk, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td className='text-uppercase'>{ambilmk.kodeambilmk}</td>
                                                <td>{ambilmk.nim}</td>
                                                <td className='text-uppercase'>{ambilmk.kodemk}</td>
                                                {
                                                    ambilmk.nilai ? 
                                                    <td>{ambilmk.nilai}</td>:
                                                    <td>Proses...</td>
                                                }
                                                <td>
                                                    <div className='d-flex flex-row gap-2'>
                                                        <Link href={`/ambilmk/${ambilmk.kodeambilmk}`} className="btn btn-sm btn-primary">Update</Link>
                                                        <a className="btn btn-sm btn-danger" onClick={e => handlerDelete(e, ambilmk.kodeambilmk)}>Delete</a>
                                                    </div>
                                                </td>
                                            </tr>
                                }):
                                data.map((ambilmk, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td className='text-uppercase'>{ambilmk.kodeambilmk}</td>
                                                <td>{ambilmk.nim}</td>
                                                <td className='text-uppercase'>{ambilmk.kodemk}</td>
                                                {
                                                    ambilmk.nilai ? 
                                                    <td>{ambilmk.nilai}</td>:
                                                    <td>Proses...</td>
                                                }
                                                <td>
                                                    <div className='d-flex flex-row gap-2'>
                                                        <Link href={`/ambilmk/${ambilmk.kodeambilmk}`} className="btn btn-sm btn-primary">Update</Link>
                                                        <a className="btn btn-sm btn-danger" onClick={e => handlerDelete(e, ambilmk.kodeambilmk)}>Delete</a>
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

export default AmbilMk