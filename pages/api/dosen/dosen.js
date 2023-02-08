import { responseMessage, responseData, responseError } from "../../../utils/resMessage"
import db from "../../../libs/database"

export const getDosen = async(req, res) => {
    try {
        const dataDosen = await db('dosen').select('nidn', 'nama', 'jenisKelamin', 'tempatLahir', db.raw("DATE_FORMAT(tanggalLahir, '%Y-%m-%d') as tanggalLahir"), 'alamat', 'email', 'noHp')
        if (dataDosen.length === 0) return responseMessage(res, 404, 'Data Dosen Tidak Tersedia')
        return responseData(res, 200, 'Berhasil GET Data Dosen', dataDosen)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const getDosenByNidn = async(req, res) => {
    try {
        const { nidn } = req.query
        const dataDosen = await db('dosen').select('nidn', 'nama', 'jenisKelamin', 'tempatLahir', db.raw("DATE_FORMAT(tanggalLahir, '%Y-%m-%d') as tanggalLahir"), 'alamat', 'email', 'noHp').where({ nidn }).first()
        if (!dataDosen) return responseMessage(res, 404, 'Data Dosen Tidak Tersedia')
        return responseData(res, 200, 'Berhasil GET Data Dosen', dataDosen)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const postDosen = async(req, res) => {
    try {
        const {
            nidn,
            nama,
            jenisKelamin,
            tempatLahir,
            tanggalLahir,
            alamat,
            email,
            noHp
        } = req.body
        const checkNidn = await db('dosen').select('*').where({ nidn }).first()
        if (checkNidn) return responseMessage(res, 400, `NIDN ${nidn} Sudah Digunakan`)
        const tambahData = await db('dosen').insert({ nidn, nama, jenisKelamin, tempatLahir, tanggalLahir, alamat, email, noHp })
        if (tambahData.length === 0) return responseMessage(res, 400, 'Gagal Tambah Data Dosen')
        return responseMessage(res, 200, 'Berhasil Tambah Data Dosen')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const putDosenByNidn = async(req, res) => {
    try {
        const { nidn } = req.query
        const {
            nama,
            jenisKelamin,
            tempatLahir,
            tanggalLahir,
            alamat,
            email,
            noHp
        } = req.body
        const updateData = await db('dosen').where({ nidn }).update({
            nama,
            jenisKelamin,
            tempatLahir,
            tanggalLahir,
            alamat,
            email,
            noHp
        })
        if (!updateData) return responseMessage(res, 400, `NIDN ${nidn} Gagal Diupdate`)
        return responseMessage(res, 200, `NIDN ${nidn} Berhasil Diupdate`)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const deleteDosenByNidn = async(req, res) => {
    try {
        const { nidn } = req.query
        const { status } = req.body
        if (!status) return responseMessage(res, 400, 'Status Tidak Disetujui')
        const checkNidn = await db('dosen').select('*').where({ nidn }).first()
        if (!checkNidn) return responseMessage(res, 404, 'NIDN Tidak ada')
        const deleteData = await db('dosen').where({ nidn }).del()
        if (deleteData.length === 0) return responseMessage(res, 400, `NIDN ${nidn} gagal dihapus`)
        return responseMessage(res, 200, `NIDN ${nidn} berhasil dihapus`)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}