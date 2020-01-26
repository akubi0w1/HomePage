import React from 'react'

class PasswordEdit extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <div className="content">
                <h1 className="content-title h1-block">パスワードの再設定</h1>
                <form className="form">
                    <div className="form-item">
                        <label className="input-label">元のパスワード</label>
                        <input type="text" className="input-text" />
                    </div>

                    <div className="form-item">
                        <label className="input-label">新しいパスワード</label>
                        <input type="text" className="input-text mb-10" placeholder="新規パスワード" />
                        <input type="text" className="input-text" placeholder="確認用" />
                    </div>

                    <div className="form-item">
                        <input type="submit" className="btn btn-primary" value="保存" />
                    </div>

                </form>
            </div>
        )
    }
}

export default PasswordEdit