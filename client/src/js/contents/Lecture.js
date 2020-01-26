import React from 'react'
import { Link } from 'react-router-dom'

// Lecture
// レクチャーに関してのページ
class Lecture extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content">
                <h1 className="content-title h1-block">レクチャー</h1>
                <div className="content-header">
                    <h2 className="h2">レクチャー資料一覧</h2>
                    <button className="btn btn-success">資料アップロード</button>
                </div>

                <div>
                    <table className="table-stripe">
                        <thead>
                            <tr>
                                <th>名前</th>
                                <th>投稿者</th>
                                <th>コメント</th>
                                <th>投稿日</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>いち</td>
                                <td>いち</td>
                                <td>いち</td>
                                <td>いち</td>
                            </tr>
                            <tr>
                                <td>いち</td>
                                <td>いち</td>
                                <td>いち</td>
                                <td>いち</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Lecture