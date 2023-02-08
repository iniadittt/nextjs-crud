import { responseMessage, responseError } from "../../../utils/resMessage"
import { getMatakuliahByKode, putMatakuliahByKode, deleteMatakuliahByKode } from "./matakuliah"

const handler = async(req, res) => {
    try {
        const method = req.method
        if (method === 'GET') return getMatakuliahByKode(req, res)
        if (method === 'PUT') return putMatakuliahByKode(req, res)
        if (method === 'DELETE') return deleteMatakuliahByKode(req, res)
        return responseMessage(res, 405, 'Method Tidak Tersedia')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export default handler