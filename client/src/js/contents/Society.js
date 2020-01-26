import React from 'react'

class Society extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div class="content">
                <h1 className="content-title h1-block">学会発表</h1>
                <SocietyTable/>   
            </div>
        )
    }
}

const SocietyTable = () => {
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
                    SOCIETIES.map((soc) => (
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