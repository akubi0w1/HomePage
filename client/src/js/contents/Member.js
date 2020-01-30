import React from 'react'
import { Link } from 'react-router-dom'

class Member extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content">
                <h1 className="content-title h1-block">メンバー</h1>
                <MemberGrade />
                <MemberGraduate />
            </div>
        )
    }
}

const MemberGrade = () => {
    // とりあえず卒業生は度外視
    return (
        <div className="flex-block">
            {
                MEMBERS.map((member)=>(
                    <MemberList member={member}/>
                ))
            }
        </div>
    )
}

const MemberGraduate = () => {
    return (
        <div className="list">
            <h3 className="list-title h3">卒業生</h3>
            <ul>
            {
                GRADUATER.users.map((user) => (
                    <MemberRow user={user}/>
                ))
            }
            </ul>
        </div>
    )
}

const MemberList = (props) => {
    if (props.member.grade === 0) {
        return null
    }
    return (
        <div className="list items-3">
            <h3 class="list-title h3">{props.member.grade}年</h3>
            <ul>
                {
                    props.member.users.map((user) => (
                        <MemberRow user={user}/>
                    ))
                }
            </ul>
        </div>
    )
}

const MemberRow = (props) => {
    return (
        <li>
            <Link to={`/member/${props.user.id}`} className="list-item">{props.user.name}</Link>
        </li>
    )
}

const MEMBERS = [
    {
        grade: 2,
        users: [
            {
                id: 1,
                name: "he",
            },
            {
                id: 2,
                name: "lon",
            }
        ]
    },
    {
        grade: 3,
        users: [
            {
                id: 3,
                name: "me",
            },
            {
                id: 4,
                name: "son",
            }
        ]
    },
    {
        grade: 4,
        users: [
            {
                id: 5,
                name: "then",
            },
            {
                id: 6,
                name: "her"
            }
        ]
    },
]

const GRADUATER = {
        grade: 0,
        users: [
            {
                name: "thfs",
            },
            {
                name: "his"
            }
        ]
    }

export default Member