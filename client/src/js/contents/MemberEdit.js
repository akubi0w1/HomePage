import React from 'react'

// TODO: input にnameを...
class MemberEdit extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content">
                <h1 className="content-title h1-block">アカウント情報編集</h1>
                <form className="form">
                    <div className="form-item">
                        <label className="input-label">名前</label>
                        <input type="text" className="input-text" />
                    </div>

                    <div className="form-item">
                        <label className="input-label">学籍番号</label>
                        <input type="text" className="input-text" />
                    </div>

                    <div className="form-item">
                        <label className="input-label">学年</label>
                        <select className="input-select">
                            <option value="B2">学部2年</option>
                            <option value="B3">学部3年</option>
                            <option value="B4">学部4年</option>
                            <option value="M1">修士1年</option>
                            <option value="M2">修士2年</option>
                            <option value="D1">修士1年</option>
                            <option value="D2">修士2年</option>
                            <option value="0">卒業生</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label className="input-label">学部</label>
                        <input type="text" className="input-text" />
                    </div>

                    <div className="form-item">
                        <label className="input-label">コメント</label>
                        <textarea className="input-textarea"></textarea>
                    </div>

                    <div className="form-item">
                        <input type="submit" className="btn btn-primary" value="保存" />
                    </div>
                </form>
            </div>
        )
    }
}

export default MemberEdit