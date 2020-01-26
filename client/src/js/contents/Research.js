import React from 'react'

class Research extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content">
                <h1 className="content-title h1-block">卒業研究</h1>
                <ResearchTable />
            </div>
        )
    }
}

const ResearchTable = () => {
    return (
        <table className="table-stripe">
            <thead>
                <tr>
                    <th>タイトル</th>
                    <th>著者</th>
                    <th>コメント</th>
                    <th>投稿日</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    RESEARCHES.map((res) => (
                        <ResearchRow research={res} />
                    ))
                }
            </tbody>
        </table>
    )
}

const ResearchRow = (props) => {
    return (
        <tr>
            <td>{props.research.title}</td>
            <td>{props.research.author}</td>
            <td>{props.research.comment}</td>
            <td>{props.research.publish}</td>
            {/* TODO: download script */}
            <td><button className="btn btn-primary">Download</button></td>
        </tr>
    )
}

const RESEARCHES = [
    {
        title: 'namae',
        author: 'author',
        comment: 'comment',
        publish: '2020/11/11',
    },
    {
        title: 'namae',
        author: 'author',
        comment: 'comment',
        publish: '2020/11/11',
    },
]

export default Research