import React, { useState, useEffect } from 'react'
import Navigasi from '../components/Navigasi'
import Link from 'next/link'
import Router from 'next/router'

export async function getServerSideProps(ctx) {
    const reqDosen = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dosen`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resDosen = await reqDosen.json()
    const data = resDosen.code === 200 ? resDosen.data : null
    return {
        props: {
            data
        }
    }
}

const Dosen = ({ data }) => {

    const [fields, setFields] = useState({
        nidn: '',
        nama: '',
        jenisKelamin: 'L',
        tempatLahir: '',
        tanggalLahir: '',
        alamat: '',
        email: '',
        noHp: '',
    })
    const [newData, setNewData] = useState(null)
    const [searchData, setSearchData] = useState('')
    
    const handlerFields = (e) => {
        e.preventDefault()
        const name = e.target.name
        setFields({ ...fields, [name] : e.target.value })
    }

    const handlerSubmit = async(e) => {
        e.preventDefault()
        const reqTambahDosen = await fetch('/api/dosen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields),
        })
        const resTambahDosen = await reqTambahDosen.json()
        if(resTambahDosen.code === 200){
            alert(resTambahDosen.message)
            Router.push('/dosen')
        }else{
            alert(resTambahDosen.message)
        }
    }

    const handlerDelete = async(e, nidn) => {
        e.preventDefault()
        const status = confirm(`Apakah anda yakin ingin menghapus data NIDN : ${nidn}`)
        const reqDeleteDosen = await fetch(`/api/dosen/${nidn}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        const resDeleteDosen = await reqDeleteDosen.json()
        if(resDeleteDosen.code === 200){
            alert(resDeleteDosen.message)
            Router.push('/dosen')
        }else{
            alert(resDeleteDosen.message || 'Data dosen masih digunakan pada menu lain')
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
                return element.nidn.toLowerCase().includes(searchData.toLowerCase())
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
                <h1 className="display-6">CRUD Dosen</h1>
                <div className='mt-4 d-flex justify-space-beetwen'>
                    <button type="button" className="btn btn-success col-1" data-bs-toggle="modal" data-bs-target="#tambahDosen">
                        Tambah
                    </button>
                    <div className='col-9'/>
                    <input type="email" className="form-control col" name='searchData' placeholder="Cari NIDN Dosen" onChange={e => changeSearchData(e)} maxLength={10} value={searchData}/>
                </div>
                <div className="modal modal-xl fade" id="tambahDosen" tabIndex="-1" aria-labelledby="tambahDosenLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 px-3" id="tambahDosenLabel">Tambah Data Dosen</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='px-3'>
                                <div className="mb-3 row">
                                    <label htmlFor="exampleFormControlInputNIDN" className="col-sm-3 col-form-label">NIDN</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name='nidn' id="exampleFormControlInputNIDN" placeholder='1234567890' value={fields.nidn} maxLength={10} onChange={e => handlerFields(e)}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="exampleFormControlInputNama" className="col-sm-3 col-form-label">Nama Lengkap</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="exampleFormControlInputNama" name='nama' placeholder="John Doe" value={fields.nama} maxLength={80} onChange={e => handlerFields(e)}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="exampleFormControlInputJenisKelamin" className="col-sm-3 col-form-label">Jenis Kelamin</label>
                                    <div className="col-sm-9">
                                    <select className="form-select" name='jenisKelamin' aria-label="Default select example" onChange={e => handlerFields(e)}>
                                        {
                                            fields.jenisKelamin === 'P' ?
                                                <>
                                                    <option value="L">Laki-laki</option>
                                                    <option value="P" defaultValue>Perempuan</option>
                                                </>:
                                                <>
                                                    <option value="L" defaultValue>Laki-laki</option>
                                                    <option value="P">Perempuan</option>
                                                </>
                                        }
                                    </select>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="exampleFormControlInputTempatLahir" className="col-sm-3 col-form-label">Tempat Lahir</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="exampleFormControlInputTempatLahir" name='tempatLahir' placeholder="Jakarta" value={fields.tempatLahir} maxLength={20} onChange={e => handlerFields(e)}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="exampleFormControlInputTanggalLahir" className="col-sm-3 col-form-label">Tanggal Lahir</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="exampleFormControlInputTanggalLahir" name='tanggalLahir' placeholder="YYYY-MM-DD" maxLength={10} value={fields.tanggalLahir} onChange={e => handlerFields(e)}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="exampleFormControlInputAlamat" className="col-sm-3 col-form-label">Alamat Lengkap</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="exampleFormControlInputAlamat" name='alamat' placeholder="Jl. Pahlawan No.17, Jakarta." value={fields.alamat} maxLength={128} onChange={e => handlerFields(e)}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="exampleFormControlInputEmail" className="col-sm-3 col-form-label">Email</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="exampleFormControlInputEmail" name='email' placeholder="johndoe@example.com" value={fields.email} maxLength={32} onChange={e => handlerFields(e)}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="exampleFormControlInputNoHp" className="col-sm-3 col-form-label">Nomor Handpone</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" id="exampleFormControlInputNoHp" name='noHp' placeholder="081212345678" value={fields.noHp} onChange={e => handlerFields(e)}/>
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
                    <p>Data Dosen Belum Tersedia</p> :
                    <table className="table table-striped mt-2">
                        <thead className="bg-success text-white">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">NIDN</th>
                                <th scope="col">Nama Lengkap</th>
                                <th scope="col">Jenis Kelamin</th>
                                <th scope="col">Tempat Tanggal Lahir</th>
                                <th scope="col">Alamat</th>
                                <th scope="col">Email</th>
                                <th scope="col">Nomor Handpone</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newData ?
                                newData.map((dosen, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{dosen.nidn}</td>
                                                <td>{dosen.nama}</td>
                                                <td>{dosen.jenisKelamin}</td>
                                                <td>{dosen.tempatLahir} {dosen.tanggalLahir}</td>
                                                <td>{dosen.alamat}</td>
                                                <td>{dosen.email}</td>
                                                <td>{dosen.noHp}</td>
                                                <td>
                                                    <div className='d-flex flex-row gap-2'>
                                                        <Link href={`/dosen/${dosen.nidn}`} className="btn btn-sm btn-primary">Update</Link>
                                                        <a className="btn btn-sm btn-danger" onClick={e => handlerDelete(e, dosen.nidn)}>Delete</a>
                                                    </div>
                                                </td>
                                            </tr>
                                }):
                                data.map((dosen, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{dosen.nidn}</td>
                                                <td>{dosen.nama}</td>
                                                <td>{dosen.jenisKelamin}</td>
                                                <td>{dosen.tempatLahir} {dosen.tanggalLahir}</td>
                                                <td>{dosen.alamat}</td>
                                                <td>{dosen.email}</td>
                                                <td>{dosen.noHp}</td>
                                                <td>
                                                    <div className='d-flex flex-row gap-2'>
                                                        <Link href={`/dosen/${dosen.nidn}`} className="btn btn-sm btn-primary">Update</Link>
                                                        <a className="btn btn-sm btn-danger" onClick={e => handlerDelete(e, dosen.nidn)}>Delete</a>
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

export default Dosen