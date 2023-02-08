import { responseMessage, responseError } from "../../../utils/resMessage"
import { getMatakuliah, postMatakuliah } from "./matakuliah"

const handler = async(req, res) => {
    try {
        const method = req.method
        if (method === 'GET') return getMatakuliah(req, res)
        if (method === 'POST') return postMatakuliah(req, res)
        return responseMessage(res, 405, 'Method Tidak Tersedia')
    } catch (error) {
        return responseError(res, 500, error.message)
    }
}

export default handler