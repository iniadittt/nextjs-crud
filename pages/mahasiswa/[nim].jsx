import React, { useState, useEffect } from 'react'
import Navigasi from '../../components/Navigasi'
import Router from 'next/router'

export async function getServerSideProps(ctx) {
    const { nim } = ctx.params
    const reqMahasiswa = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/mahasiswa/${nim}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resMahasiswa = await reqMahasiswa.json()
    const data = resMahasiswa.data || null
    return {
        props: {
            data,
            nim
        }
    }
}

const UpdateMahasiswa = ({ data, nim }) => {

    const [fields, setFields] = useState(data)

    useEffect(() => {
        return () => {
            setTimeout(() => {
                if(!data) return Router.push('/mahasiswa')
            }, 2000)
        }
    }, [data])

    const handlerFields = (e) => {
        e.preventDefault()
        const name = e.target.name
        setFields({
            ...fields,
            [name] : e.target.value,
        })
    }

    const handlerUpdate = async(e) => {
        e.preventDefault()
        const reqUpdateMahasiswa = await fetch(`/api/mahasiswa/${nim}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resUpdateMahasiswa = await reqUpdateMahasiswa.json()
        if(resUpdateMahasiswa.code === 200){
            alert(resUpdateMahasiswa.message)
            Router.push('/mahasiswa')
        }else{
            alert(resUpdateMahasiswa.message)
        }
    }

    return (
        <>
            <Navigasi/>
            {
                !data ?
                <p className='container mt-3 display-6'>Data Tidak Tersedia</p>:
                <div className='container mt-5'>
                    <h1 className="display-6">{data.nama}</h1>
                    <form className='mt-4'>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputNIM" className="col-sm-2 col-form-label">NIM</label>
                            <div className="col-sm-10">
                                <input type="text" readonly className="form-control-plaintext" name='nim' id="exampleFormControlInputNIM" value={fields.nim} maxLength={10}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputNama" className="col-sm-2 col-form-label">Nama Lengkap</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="exampleFormControlInputNama" name='nama' placeholder="John Doe" value={fields.nama} maxLength={80} onChange={e => handlerFields(e)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputJenisKelamin" className="col-sm-2 col-form-label">Jenis Kelamin</label>
                            <div className="col-sm-10">
                            <select className="form-select" name='jenisKelamin' aria-label="Default select example" onChange={e => handlerFields(e)}>
                                {
                                    fields.jenisKelamin === 'L' ?
                                        <>
                                            <option value="L" selected>Laki-laki</option>
                                            <option value="P">Perempuan</option>
                                        </> :
                                        <>
                                            <option value="L">Laki-laki</option>
                                            <option value="P" selected>Perempuan</option>
                                        </>
                                }
                            </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputTempatLahir" className="col-sm-2 col-form-label">Tempat Lahir</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="exampleFormControlInputTempatLahir" name='tempatLahir' placeholder="Jakarta" value={fields.tempatLahir} maxLength={20} onChange={e => handlerFields(e)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputTanggalLahir" className="col-sm-2 col-form-label">Tanggal Lahir</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="exampleFormControlInputTanggalLahir" name='tanggalLahir' placeholder="YYYY-MM-DD" maxLength={10} value={fields.tanggalLahir} onChange={e => handlerFields(e)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputAlamat" className="col-sm-2 col-form-label">Alamat Lengkap</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="exampleFormControlInputAlamat" name='alamat' placeholder="Jl. Pahlawan No.17, Jakarta." value={fields.alamat} maxLength={128} onChange={e => handlerFields(e)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="exampleFormControlInputEmail" name='email' placeholder="johndoe@example.com" value={fields.email} maxLength={32} onChange={e => handlerFields(e)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputNoHp" className="col-sm-2 col-form-label">Nomor Handpone</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" id="exampleFormControlInputNoHp" name='noHp' placeholder="081212345678" value={fields.noHp} onChange={e => handlerFields(e)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInput1" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <button type="button" className="btn btn-success" onClick={e => handlerUpdate(e)}>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default UpdateMahasiswa