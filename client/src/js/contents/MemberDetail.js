import React from 'react'
import { Link } from 'react-router-dom'

import { BASE_URL } from '../constants/config'
import axios from 'axios'

// TODO: authorized
class MemberDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                id: props.match.params.id,
            },
            isFetching: false,
            isAdmin: false, // TODO: login情報。というか、本人確認
        }
    }

    componentDidMount() {
        this.setState({
            isFetching: true
        })
        // TODO: data fetch
        const self = this
        axios.get(BASE_URL+"/users/"+this.state.user.id)
            .then(function(res){
                console.log(res)
                const _user = res.data
                
                self.setState({
                    user: _user,
                    isFetching: false
                })
            })
            .catch(function(err) {
                console.log(err)
                // TODO: redirect member.
            })
    }

    render () {
        // TODO: gradeの表示。修士どうしようね
        return (
            <div className="content">
                {
                    this.state.isFetching
                    ? <div>NowLoading...</div>
                    :
                        < div className="card mt-50">
                            <div className="card-content">
                                <div className="card-item">
                                    <h2 className="h2">{this.state.user.name}</h2>
                                    <label className="label-block col-gray">{this.state.user.student_id}</label>
                                </div>
                                <div className="card-item">
                                    <label className="label-block">学年：{this.state.user.grade ? this.state.user.grade+"年" : "卒業生"}</label>
                                </div>
                                <div className="card-item">
                                    <label className="label-block">学部：{this.state.user.department}</label>
                                </div>
                                <div className="card-item">
                                    <label className="label-block">コメント：{this.state.user.comment}</label>
                                </div>
                                {/* 本人だった場合 */}
                                <div className="card-item">
                                    <Link to={`/member/${this.state.user.id}/edit`} className="btn btn-success">編集する</Link>
                                    <Link to={`/member/${this.state.user.id}/edit_pass`} className="btn btn-info">パスワードの変更</Link>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default MemberDetail