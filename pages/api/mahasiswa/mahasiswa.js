import { responseMessage, responseData, responseError } from "../../../utils/resMessage"
import db from "../../../libs/database"

export const getMahasiswa = async(req, res) => {
    try {
        const dataMahasiswa = await db('mahasiswa').select('nim', 'nama', 'jenisKelamin', 'tempatLahir', db.raw("DATE_FORMAT(tanggalLahir, '%Y-%m-%d') as tanggalLahir"), 'alamat', 'email', 'noHp')
        if (dataMahasiswa.length === 0) return responseMessage(res, 404, 'Data Mahasiswa Tidak Tersedia')
        return responseData(res, 200, 'Berhasil GET Data Mahasiswa', dataMahasiswa)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const getMahasiswaByNim = async(req, res) => {
    try {
        const { nim } = req.query
        const dataMahasiswa = await db('mahasiswa').select('nim', 'nama', 'jenisKelamin', 'tempatLahir', db.raw("DATE_FORMAT(tanggalLahir, '%Y-%m-%d') as tanggalLahir"), 'alamat', 'email', 'noHp').where({ nim }).first()
        if (!dataMahasiswa) return responseMessage(res, 404, 'Data Mahasiswa Tidak Tersedia')
        return responseData(res, 200, 'Berhasil GET Data Mahasiswa', dataMahasiswa)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const postMahasiswa = async(req, res) => {
    try {
        const {
            nim,
            nama,
            jenisKelamin,
            tempatLahir,
            tanggalLahir,
            alamat,
            email,
            noHp
        } = req.body
        const checkNim = await db('mahasiswa').select('*').where({ nim }).first()
        if (checkNim) return responseMessage(res, 400, `NIM ${nim} Sudah Digunakan`)
        const tambahData = await db('mahasiswa').insert({ nim, nama, jenisKelamin, tempatLahir, tanggalLahir, alamat, email, noHp })
        if (tambahData.length === 0) return responseMessage(res, 400, 'Gagal Tambah Data Mahasiswa')
        return responseMessage(res, 200, 'Berhasil Tambah Data Mahasiswa')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const putMahasiswaByNim = async(req, res) => {
    try {
        const { nim } = req.query
        const {
            nama,
            jenisKelamin,
            tempatLahir,
            tanggalLahir,
            alamat,
            email,
            noHp
        } = req.body
        const updateData = await db('mahasiswa').where({ nim }).update({
            nama,
            jenisKelamin,
            tempatLahir,
            tanggalLahir,
            alamat,
            email,
            noHp
        })
        if (!updateData) return responseMessage(res, 400, `NIM ${nim} Gagal Diupdate`)
        return responseMessage(res, 200, `NIM ${nim} Berhasil Diupdate`)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const deleteMahasiswaByNim = async(req, res) => {
    try {
        const { nim } = req.query
        const { status } = req.body
        if (!status) return responseMessage(res, 400, 'Status Tidak Disetujui')
        const checkNim = await db('mahasiswa').select('*').where({ nim }).first()
        if (!checkNim) return responseMessage(res, 404, 'NIM Tidak ada')
        const deleteData = await db('mahasiswa').where({ nim }).del()
        if (deleteData.length === 0) return responseMessage(res, 400, `NIM ${nim} gagal dihapus`)
        return responseMessage(res, 200, `NIM ${nim} berhasil dihapus`)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}