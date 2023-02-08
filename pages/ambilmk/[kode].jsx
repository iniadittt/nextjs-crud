import React, { useState, useEffect } from 'react'
import Navigasi from '../../components/Navigasi'
import Router from 'next/router'

export async function getServerSideProps(ctx) {
    const { kode } = ctx.params
    const reqAmbilMk = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ambilmk/${kode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resAmbilMk = await reqAmbilMk.json()
    const data = resAmbilMk.data || null
    const reqMahasiswa = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/mahasiswa/${data.nim}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resMahasiswa = await reqMahasiswa.json()
    const dataMahasiswa = resMahasiswa.data || null
    const reqMatakuliah = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/matakuliah/${data.kodemk}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resMatakuliah = await reqMatakuliah.json()
    const dataMatakuliah = resMatakuliah.data || null
    return {
        props: {
            data,
            dataMahasiswa,
            dataMatakuliah,
            kode
        }
    }
}

const UpdateMatakuliah = ({ data, dataMahasiswa, dataMatakuliah, kode }) => {

    const [fields, setFields] = useState(data)

    useEffect(() => {
        return () => {
            setTimeout(() => {
                if(!data) return Router.push('/ambilmk')
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
        const reqUpdateAmbilMk = await fetch(`/api/ambilmk/${kode}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resUpdateAmbilMk = await reqUpdateAmbilMk.json()
        if(resUpdateAmbilMk.code === 200){
            alert(resUpdateAmbilMk.message)
            Router.push('/ambilmk')
        }else{
            alert(resUpdateAmbilMk.message)
        }
    }

    return (
        <>
            <Navigasi/>
            {
                !data ?
                <p className='container mt-3 display-6'>Data Tidak Tersedia</p>:
                <div className='container mt-5'>
                    <h1 className="display-6 text-uppercase">Kode Ambil Matakuliah : {fields.kodeambilmk}</h1>
                    <form className='mt-4'>

                        <div className="mb-3 row">
                            <label for="exampleFormControlInputKodeAmbilMk" className="col-sm-2 col-form-label">Kode Ambil Matakuliah</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control text-uppercase" name='kodeambilmk' id="exampleFormControlInputKodeAmbilMk" value={fields.kodeambilmk} maxLength={10} disabled/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="exampleFormControlInputNIM" className="col-sm-2 col-form-label">NIM</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="exampleFormControlInputNIM" name='nim' placeholder="1234567890" value={fields.nim} maxLength={10} onChange={e => handlerFields(e)} disabled/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="exampleFormControlInputNamaMahasiswa" className="col-sm-2 col-form-label">Nama Mahasiswa</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="exampleFormControlInputNamaMahasiswa" name='mahasiswa' placeholder="Aditya Bayu" maxLength={30} disabled value={dataMahasiswa.nama}/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="exampleFormControlInputKodemk" className="col-sm-2 col-form-label">Kode Matakuliah</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="exampleFormControlInputKodemk" name='kodemk' placeholder="Basdat01" value={fields.kodemk} maxLength={10} onChange={e => handlerFields(e)} disabled/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="exampleFormControlInputNamaMk" className="col-sm-2 col-form-label">Nama Matakuliah</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="exampleFormControlInputNamaMk" name='matakuliah' placeholder="Basis Data Lanjut" maxLength={30} disabled value={dataMatakuliah.nama}/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="exampleFormControlInputNilai" className="col-sm-2 col-form-label">Nilai</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="exampleFormControlInputNilai" name='nilai' placeholder="99" value={fields.nilai} maxLength={2} onChange={e => handlerFields(e)}/>
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

export default UpdateMatakuliah