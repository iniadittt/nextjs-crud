import httpStatus from './httpstatus'

export const responseMessage = (res, code, message) => {
    const status = httpStatus[code]
    res.status(code).json({ code, status, message })
}

export const responseData = (res, code, message, data) => {
    const status = httpStatus[code]
    res.status(code).json({ code, status, message, data })
}

export const responseError = (res, code, error) => {
    const status = httpStatus[code]
    res.status(code).json({ code, status, error })
}