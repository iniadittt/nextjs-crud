import { responseMessage, responseError } from "../../../utils/resMessage"
import { getMahasiswaByNim, putMahasiswaByNim, deleteMahasiswaByNim } from "./mahasiswa"

const handler = async(req, res) => {
    try {
        const method = req.method
        if (method === 'GET') return getMahasiswaByNim(req, res)
        if (method === 'PUT') return putMahasiswaByNim(req, res)
        if (method === 'DELETE') return deleteMahasiswaByNim(req, res)
        return responseMessage(res, 405, 'Method Tidak Tersedia')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export default handler