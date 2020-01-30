import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/config'

class Research extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            researches: [],
            isFetching: false
        }
    }

    componentDidMount(){
        this.setState({
            isFetching: true
        })
        const self = this
        axios.get(BASE_URL+"/researches")
            .then(res=>{
                const _researches = res.data.researches
                // researchesが空だとnullでくるので。その対策
                if (_researches) {
                    self.setState({
                        researches: _researches
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                // TODO: redirect
            })
            .then(()=>{
                self.setState({
                    isFetching: false
                })
            })

    }

    render() {
        return (
            <div className="content">
                <h1 className="content-title h1-block">卒業研究</h1>
                {
                    this.state.isFetching
                    ? <p>Now Loading...</p>
                    : <ResearchTable researches={this.state.researches} />
                }
            </div>
        )
    }
}

const ResearchTable = (props) => {
    console.log(props.researches)
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
                    props.researches.map((res) => (
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