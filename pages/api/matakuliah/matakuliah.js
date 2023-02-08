import { responseMessage, responseData, responseError } from "../../../utils/resMessage"
import db from "../../../libs/database"

export const getMatakuliah = async(req, res) => {
    try {
        const dataMatakuliah = await db('matakuliah').join('dosen', 'matakuliah.nidn', '=', 'dosen.nidn').select('matakuliah.kodemk', 'matakuliah.nama', 'matakuliah.sks', 'matakuliah.nidn', 'dosen.nama as namaDosen')
        if (dataMatakuliah.length === 0) return responseMessage(res, 404, 'Data Matakuliah Tidak Tersedia')
        return responseData(res, 200, 'Berhasil GET Data Matakuliah', dataMatakuliah)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const getMatakuliahByKode = async(req, res) => {
    try {
        const { kode } = req.query
        const dataMatakuliah = await db('matakuliah').select('*').where({ kodemk: kode }).first()
        if (!dataMatakuliah) return responseMessage(res, 404, 'Data Matakuliah Tidak Tersedia')
        return responseData(res, 200, 'Berhasil GET Data Matakuliah', dataMatakuliah)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const postMatakuliah = async(req, res) => {
    try {
        const {
            kodemk,
            nama,
            sks,
            nidn
        } = req.body
        const newKodemk = kodemk.toLowerCase()
        const checkKodemk = await db('matakuliah').select('*').where({ kodemk: newKodemk }).first()
        if (checkKodemk) return responseMessage(res, 400, `Kode Matakuliah ${newKodemk} Sudah Digunakan`)
        const tambahMatakuliah = await db('matakuliah').insert({ kodemk: newKodemk, nama, sks, nidn })
        if (tambahMatakuliah.length === 0) return responseMessage(res, 400, 'Gagal Tambah Data Matakuliah')
        return responseMessage(res, 200, 'Berhasil Tambah Data Matakuliah')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const putMatakuliahByKode = async(req, res) => {
    try {
        const { kode } = req.query
        const {
            nama,
            sks,
            nidn
        } = req.body
        const updateData = await db('matakuliah').where({ kodemk: kode }).update({
            nama,
            sks,
            nidn
        })
        if (!updateData) return responseMessage(res, 400, `Kode Matakuliah ${kode} Gagal Diupdate`)
        return responseMessage(res, 200, `Kode Matakuliah ${kode} Berhasil Diupdate`)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export const deleteMatakuliahByKode = async(req, res) => {
    try {
        const { kode } = req.query
        const { status } = req.body
        const kodemk = kode.toLowerCase()
        if (!status) return responseMessage(res, 400, 'Status Tidak Disetujui')
        const checkMatakuliah = await db('matakuliah').select('*').where({ kodemk }).first()
        if (!checkMatakuliah) return responseMessage(res, 404, 'Matakuliah Tidak ada')
        const deleteMatakuliah = await db('matakuliah').where({ kodemk }).del()
        if (deleteMatakuliah.length === 0) return responseMessage(res, 400, `Kode Matakuliah ${kodemk} gagal dihapus`)
        return responseMessage(res, 200, `Kode Matakuliah ${kode} berhasil dihapus`)
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}