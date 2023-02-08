import { responseMessage, responseError } from "../../../utils/resMessage"
import { getDosenByNidn, putDosenByNidn, deleteDosenByNidn } from "./dosen"

const handler = async(req, res) => {
    try {
        const method = req.method
        if (method === 'GET') return getDosenByNidn(req, res)
        if (method === 'PUT') return putDosenByNidn(req, res)
        if (method === 'DELETE') return deleteDosenByNidn(req, res)
        return responseMessage(res, 405, 'Method Tidak Tersedia')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export default handler