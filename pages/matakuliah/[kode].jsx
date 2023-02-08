import React, { useState, useEffect } from 'react'
import Navigasi from '../../components/Navigasi'
import Router from 'next/router'

const dataSKS = [1,2,3,4,5,6,7,8,9]

export async function getServerSideProps(ctx) {
    const { kode } = ctx.params
    const reqMatakuliah = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/matakuliah/${kode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resMatakuliah = await reqMatakuliah.json()
    const data = resMatakuliah.data || null
    const reqDosen = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dosen`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resDosen = await reqDosen.json()
    const dataDosen = resDosen.code === 200 ? resDosen.data : null
    return {
        props: {
            data,
            dataDosen,
            kode
        }
    }
}

const UpdateMatakuliah = ({ data, dataDosen, kode }) => {

    const [fields, setFields] = useState(data)

    useEffect(() => {
        return () => {
            setTimeout(() => {
                if(!data) return Router.push('/matakuliah')
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
        const reqUpdateMatakuliah = await fetch(`/api/matakuliah/${kode}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resUpdateMatakuliah = await reqUpdateMatakuliah.json()
        if(resUpdateMatakuliah.code === 200){
            alert(resUpdateMatakuliah.message)
            Router.push('/matakuliah')
        }else{
            alert(resUpdateMatakuliah.message)
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
                            <label for="exampleFormControlInputKode" className="col-sm-2 col-form-label">Kode Matakuliah</label>
                            <div className="col-sm-10">
                                <input type="text" readonly className="form-control-plaintext text-uppercase" name='kodemk' id="exampleFormControlInputKode" value={fields.kodemk} maxLength={10}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputNama" className="col-sm-2 col-form-label">Nama Lengkap</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="exampleFormControlInputNama" name='nama' placeholder="John Doe" value={fields.nama} maxLength={80} onChange={e => handlerFields(e)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputSKS" className="col-sm-2 col-form-label">SKS</label>
                            <div className="col-sm-10">
                                <select className="form-select" name='SKS' aria-label="Default select example" onChange={e => handlerFields(e)}>
                                    {
                                        dataSKS.map(element => {
                                            return  element == data.sks ? 
                                                    <option key={element} value={element} selected>{element}</option>:
                                                    <option key={element} value={element}>{element}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="exampleFormControlInputNidn" className="col-sm-2 col-form-label">NIDN</label>
                            <div className="col-sm-10">
                                <select className="form-select" name='nidn' aria-label="Default select example" onChange={e => handlerFields(e)}>
                                        {
                                            dataDosen.map((dosen, index) => {
                                                return dosen.nidn === data.nidn ? 
                                                    <option key={index} value={dosen.nidn} selected>{dosen.nidn} - {dosen.nama}</option>:
                                                    <option key={index} value={dosen.nidn}>{dosen.nidn} - {dosen.nama}</option>
                                            })
                                        }
                                </select>
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