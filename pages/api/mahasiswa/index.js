import { responseMessage, responseError } from "../../../utils/resMessage"
import { getMahasiswa, postMahasiswa } from "./mahasiswa"

const handler = async(req, res) => {
    try {
        const method = req.method
        if (method === 'GET') return getMahasiswa(req, res)
        if (method === 'POST') return postMahasiswa(req, res)
        return responseMessage(res, 405, 'Method Tidak Tersedia')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export default handler