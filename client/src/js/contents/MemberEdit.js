import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/config'

// TODO: input にnameを...
class MemberEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.id,
            name: '',
            student_id: '',
            grade: '',
            department: '',
            comment: '',
            isFetching: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.setState({
            isFetching: true
        })

        const self = this
        axios.get(BASE_URL+"/users/"+this.state.id)
            .then(res => {
                const _user = res.data
                self.setState({
                    name: _user.name,
                    student_id: _user.student_id,
                    grade: _user.grade,
                    department: _user.department,
                    comment: _user.comment,
                })
            })
            .catch(err => {
                console.log(err)
            })
            .then(()=>{
                self.setState({
                    isFetching: false
                })
            })
    }

    handleChange(e) {
        const field = e.target.name
        this.setState({
            [field]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)
        // TODO: connect api
        // TODO: redirect!
    }

    render() {
        // TODO: gradeの初期化
        return (
            <div className="content">
                <h1 className="content-title h1-block">アカウント情報編集</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form-item">
                        <label className="input-label">名前</label>
                        <input type="text" className="input-text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </div>

                    <div className="form-item">
                        <label className="input-label">学籍番号</label>
                        <input type="text" className="input-text" name="student_id" value={this.state.student_id} onChange={this.handleChange} />
                    </div>

                    <div className="form-item">
                        <label className="input-label">学年</label>
                        <select className="input-select" name="grade">
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
                        <input type="text" className="input-text" name="department" value={this.state.department} onChange={this.handleChange} />
                    </div>

                    <div className="form-item">
                        <label className="input-label">コメント</label>
                        <textarea className="input-textarea" name="comment" value={this.state.comment} onChange={this.handleChange}></textarea>
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