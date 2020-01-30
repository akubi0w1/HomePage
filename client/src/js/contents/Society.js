import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/config'

class Society extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFetching: false,
            societies: [],
        }
    }

    componentDidMount(){
        this.setState({
            isFetching: true
        })
        const self = this
        axios.get(BASE_URL+"/societies")
            .then(res => {
                const _societies = res.data.societies
                self.setState({
                    societies: _societies,
                })
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => {
                self.setState({
                    isFetching: false
                })
            })
    }

    render() {
        return(
            <div class="content">
                <h1 className="content-title h1-block">学会発表</h1>
                {
                    this.state.isFetching
                    ? <p>NowLoading....</p>
                    : <SocietyTable societies={this.state.societies} />
                }   
            </div>
        )
    }
}

const SocietyTable = (props) => {
    return (
        <table className="table-basic">
            <thead>
                <tr>
                    <th>日付</th>
                    <th>名前</th>
                    <th>タイトル</th>
                    <th>発表学会</th>
                    <th>受賞</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.societies.map((soc) => (
                        <SocietyRow society={soc}/>
                    ))
                }
            </tbody>
        </table>
    )
}

const SocietyRow = (props) => {
    return (
        <tr>
            <td>{props.society.date}</td>
            <td>{props.society.author}</td>
            <td>{props.society.title}</td>
            <td>{props.society.society}</td>
            <td>{props.society.award}</td>
        </tr>
    )
}

const SOCIETIES = [
    {
        date: "2020/11/11",
        author: "author",
        title: "title",
        society: "gakkai",
        award: "show",
    },
    {
        date: "2020/11/11",
        author: "author",
        title: "title",
        society: "gakkai",
        award: "show",
    },
]

export default Society