import { responseMessage, responseData, responseError } from "../../../utils/resMessage"
import db from "../../../libs/database"

export const getAmbilMk = async(req, res) => {
    try {
        const dataAmbilMk = await db('ambilmk').select('*')
        if (dataAmbilMk.length === 0) return responseMessage(res, 404, 'Data Ambil Matakuliah Tidak Tersedia')
        return responseData(res, 200, 'Berhasil GET Data Ambil Matakuliah', dataAmbilMk)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const getAmbilMkByKode = async(req, res) => {
    try {
        const { kode } = req.query
        const dataAmbilMk = await db('ambilmk').select('*').where({ kodeambilmk: kode }).first()
        if (!dataAmbilMk) return responseMessage(res, 404, 'Data Ambil Matakuliah Tidak Tersedia')
        return responseData(res, 200, 'Berhasil GET Data Ambil Matakuliah', dataAmbilMk)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const postAmbilMk = async(req, res) => {
    try {
        const {
            kodeambilmk,
            nim,
            kodemk,
            nilai
        } = req.body
        if (!kodemk) return responseMessage(res, 400, 'Data Tidak Lengkap')
        const newKodeAmbilMk = kodeambilmk.toLowerCase()
        const checkKodeAmbilmk = await db('ambilmk').select('*').where({ kodeambilmk: newKodeAmbilMk }).first()
        if (checkKodeAmbilmk) return responseMessage(res, 400, `Kode Ambil Matakuliah ${newKodeAmbilMk} Sudah Digunakan`)
        const tambahAmbilMk = await db('ambilmk').insert({ kodeambilmk: newKodeAmbilMk, nim, kodemk, nilai })
        if (tambahAmbilMk.length === 0) return responseMessage(res, 400, 'Gagal Tambah Data Ambil Matakuliah')
        return responseMessage(res, 200, 'Berhasil Tambah Data Ambil Matakuliah')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const putAmbilMkByKode = async(req, res) => {
    try {
        const { kode } = req.query
        const { nilai } = req.body
        const updateData = await db('ambilmk').where({ kodeambilmk: kode }).update({ nilai })
        if (!updateData) return responseMessage(res, 400, `Data Ambil Matakuliah ${kode} Gagal Diupdate`)
        return responseMessage(res, 200, `Data Ambil Matakuliah ${kode} Berhasil Diupdate`)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const deleteAmbilMkByKode = async(req, res) => {
    try {
        const { kode } = req.query
        const { status } = req.body
        const kodeAmbilMk = kode.toUpperCase()
        if (!status) return responseMessage(res, 400, 'Status Tidak Disetujui')
        const checkKodeAmbilMk = await db('ambilmk').select('*').where({ kodeambilmk: kodeAmbilMk }).first()
        if (!checkKodeAmbilMk) return responseMessage(res, 404, 'Kode Ambil Matakuliah Tidak ada')
        const deleteAmbilMk = await db('ambilmk').where({ kodeambilmk: kodeAmbilMk }).del()
        if (deleteAmbilMk.length === 0) return responseMessage(res, 400, `Kode Ambil Matakuliah ${kodeAmbilMk} gagal dihapus`)
        return responseMessage(res, 200, `Kode Ambil Matakuliah ${kodeAmbilMk} berhasil dihapus`)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}