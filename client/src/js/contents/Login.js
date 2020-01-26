import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className="content">
                <h1 className="content-title h1-block">ログイン</h1>
                
                <form className="form">
                    <h3 className="input-label">学籍番号</h3>
                    <input type="text" className="input-text"></input>
                    <h3 className="input-label">パスワード</h3>
                    <input type="password" className="input-text"></input>

                    <input type="submit" value="ログイン" className="btn btn-primary mt-20"/>
                </form>
            </div>
        )
    }
}

export default Login