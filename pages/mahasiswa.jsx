import React, { useState, useEffect } from 'react'
import Navigasi from '../components/Navigasi'
import Link from 'next/link'
import Router from 'next/router'

export async function getServerSideProps(ctx) {
    const reqMahasiswa = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/mahasiswa`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resMahasiswa = await reqMahasiswa.json()
    const data = resMahasiswa.code === 200 ? resMahasiswa.data : null
    return {
        props: {
            data
        }
    }
}

const Mahasiswa = ({ data }) => {

    const [fields, setFields] = useState({
        nim: '',
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
        const reqTambahMahasiswa = await fetch('/api/mahasiswa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields),
        })
        const resTambahMahasiswa = await reqTambahMahasiswa.json()
        if(resTambahMahasiswa.code === 200){
            alert(resTambahMahasiswa.message)
            Router.push('/mahasiswa')
        }else{
            alert(resTambahMahasiswa.message)
        }
    }

    const handlerDelete = async(e, nim) => {
        e.preventDefault()
        const status = confirm(`Apakah anda yakin ingin menghapus data NIM : ${nim}`)
        const reqDeleteMahasiswa = await fetch(`/api/mahasiswa/${nim}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        const resDeleteMahasiswa = await reqDeleteMahasiswa.json()
        if(resDeleteMahasiswa.code === 200){
            alert(resDeleteMahasiswa.message)
            Router.push('/mahasiswa')
        }else{
            alert(resDeleteMahasiswa.message || 'Data mahasiswa masih digunakan pada menu lain')
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
                return element.nim.toLowerCase().includes(searchData.toLowerCase())
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
                <h1 className="display-6">CRUD Mahasiswa</h1>
                <div className='mt-4 d-flex justify-space-beetwen'>
                    <button type="button" className="btn btn-success col-1" data-bs-toggle="modal" data-bs-target="#tambahMahasiswa">
                        Tambah
                    </button>
                    <div className='col-9'/>
                    <input type="email" className="form-control col" name='searchData' placeholder="Cari NIM Mahasiswa" onChange={e => changeSearchData(e)} maxLength={10} value={searchData}/>
                </div>
                <div className="modal modal-xl fade" id="tambahMahasiswa" tabIndex="-1" aria-labelledby="tambahMahasiswaLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 px-3" id="tambahMahasiswaLabel">Tambah Data Mahasiswa</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='px-3'>
                                <div className="mb-3 row">
                                    <label htmlFor="exampleFormControlInputNIM" className="col-sm-3 col-form-label">NIM</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name='nim' id="exampleFormControlInputNIM" placeholder='1234567890' value={fields.nim} maxLength={10} onChange={e => handlerFields(e)}/>
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
                    <p>Data Mahasiswa Belum Tersedia</p> :
                    <table className="table table-striped mt-2">
                        <thead className="bg-success text-white">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">NIM</th>
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
                                newData.map((mahasiswa, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{mahasiswa.nim}</td>
                                                <td>{mahasiswa.nama}</td>
                                                <td>{mahasiswa.jenisKelamin}</td>
                                                <td>{mahasiswa.tempatLahir} {mahasiswa.tanggalLahir}</td>
                                                <td>{mahasiswa.alamat}</td>
                                                <td>{mahasiswa.email}</td>
                                                <td>{mahasiswa.noHp}</td>
                                                <td>
                                                    <div className='d-flex flex-row gap-2'>
                                                        <Link href={`/mahasiswa/${mahasiswa.nim}`} className="btn btn-sm btn-primary">Update</Link>
                                                        <a className="btn btn-sm btn-danger" onClick={e => handlerDelete(e, mahasiswa.nim)}>Delete</a>
                                                    </div>
                                                </td>
                                            </tr>
                                }):
                                data.map((mahasiswa, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{mahasiswa.nim}</td>
                                                <td>{mahasiswa.nama}</td>
                                                <td>{mahasiswa.jenisKelamin}</td>
                                                <td>{mahasiswa.tempatLahir} {mahasiswa.tanggalLahir}</td>
                                                <td>{mahasiswa.alamat}</td>
                                                <td>{mahasiswa.email}</td>
                                                <td>{mahasiswa.noHp}</td>
                                                <td>
                                                    <div className='d-flex flex-row gap-2'>
                                                        <Link href={`/mahasiswa/${mahasiswa.nim}`} className="btn btn-sm btn-primary">Update</Link>
                                                        <a className="btn btn-sm btn-danger" onClick={e => handlerDelete(e, mahasiswa.nim)}>Delete</a>
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

export default Mahasiswa