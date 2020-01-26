import React from 'react'
import { Link } from 'react-router-dom'

// TODO: authorized
class MemberDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: 'sample',
            student_id: 'がくせきばんごう',
            grade: 3,
            department: '工学部',
            comment: 'hello',
        }
    }

    render () {
        return (
            <div className="content">
                {/* {this.props.match.params.id} */}
                <div className="card mt-50">
                    <div className="card-content">

                        <div className="card-item">
                            <h2 className="h2">{this.state.name}</h2>
                            <label className="label-block col-gray">{this.state.student_id}</label>
                        </div>
                        <div className="card-item">
                            <label className="label-block">学年：{this.state.grade}年</label>
                        </div>
                        <div className="card-item">
                            <label className="label-block">学部：{this.state.department}</label>
                        </div>
                        <div className="card-item">
                            <label className="label-block">コメント：{this.state.comment}</label>
                        </div>
                        {/* 本人だった場合 */}
                        <div className="card-item">
                            <Link to={`/member/${this.state.id}/edit`} className="btn btn-success">編集する</Link>
                            <Link to={`/member/${this.state.id}/edit_pass`} className="btn btn-success">パスワードの変更</Link>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default MemberDetail