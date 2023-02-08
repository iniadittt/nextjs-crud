import React from 'react'
import Link from 'next/link'

const Navigasi = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-success">
            <div className="container">
                <Link className="navbar-brand text-white" href="/">ADITYA BAYU</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    CRUD
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/mahasiswa">Mahasiswa</Link></li>
                                    <li><Link className="dropdown-item" href="/dosen">Dosen</Link></li>
                                    <li><Link className="dropdown-item" href="/matakuliah">Matakuliah</Link></li>
                                    <li><Link className="dropdown-item" href="/ambilmk">Ambil Matakuliah</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigasi