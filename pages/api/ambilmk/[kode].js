import { responseMessage, responseError } from "../../../utils/resMessage"
import { getAmbilMkByKode, putAmbilMkByKode, deleteAmbilMkByKode } from "./ambilmk"

const handler = async(req, res) => {
    try {
        const method = req.method
        if (method === 'GET') return getAmbilMkByKode(req, res)
        if (method === 'PUT') return putAmbilMkByKode(req, res)
        if (method === 'DELETE') return deleteAmbilMkByKode(req, res)
        return responseMessage(res, 405, 'Method Tidak Tersedia')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export default handler