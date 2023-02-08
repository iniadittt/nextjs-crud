import React from 'react'
import Navigasi from '../components/Navigasi'
const Index = () => {
    return (
        <>
            <Navigasi/>
            <div className="jumbotron mt-5 container">
                <h1 className="display-4">Aditya Bayu Aji!</h1>
                <p className="lead">Website CRUD sederhana menggunakan NextJS dan MySQL</p>
                <hr className="my-3"/>
                <p className='lead'>Jangan Lupa kunjungi github</p>
                <a className="btn btn-success btn-sm px-4 py-2 rounded-pill" href="https://github.com/iniadittt" target="_blank" rel='noreferrer' role="button">Github</a>
            </div>
        </>
    )
}

export default Index