import React from 'react'
import { Redirect } from 'react-router-dom'
import { STRAGE_KEY } from '../../constants/config'
import * as Crypto from '../../util/crypto'

// Admin 権限がない人をアクセス段階で弾く。
// middleware的な役割なので直接何かを描写するって感じではない
const Admin = (props) => {
    const strageValue = localStorage.getItem(STRAGE_KEY)
    if (!strageValue) {
        return <Redirect to="/login" />
    }
    const loginInfo = Crypto.Decrypt(strageValue)
    return (
        loginInfo.indexOf("owner") > -1
        ? props.children
        : <Redirect to="/login" />
    )
}

export default Admin