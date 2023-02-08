import { responseMessage, responseError } from "../../../utils/resMessage"
import { getAmbilMk, postAmbilMk } from "./ambilmk"

const handler = async(req, res) => {
    try {
        const method = req.method
        if (method === 'GET') return getAmbilMk(req, res)
        if (method === 'POST') return postAmbilMk(req, res)
        return responseMessage(res, 405, 'Method Tidak Tersedia')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export default handler