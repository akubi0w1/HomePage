import React from 'react'

class Error extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <div className="content">
                <h1 className="content-title h1-block">エラー</h1>
                <p>エラーの内容とか。TODO:stateでエラーの内容とか仕分けできればよし。。。。
                </p>
            </div>
        )
    }
}

export default Error