import { responseMessage, responseError } from "../../../utils/resMessage"
import { getDosen, postDosen } from "./dosen"

const handler = async(req, res) => {
    try {
        const method = req.method
        if (method === 'GET') return getDosen(req, res)
        if (method === 'POST') return postDosen(req, res)
        return responseMessage(res, 405, 'Method Tidak Tersedia')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export default handler