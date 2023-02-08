import React, { useEffect } from 'react'
import Router from 'next/router'

const NotFound = () => {

    useEffect(() => {
        setTimeout(() => {
            Router.push('/')
        }, 2000)
    }, [])
    
    return (
        <div>404</div>
    )
}

export default NotFound