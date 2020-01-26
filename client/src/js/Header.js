import React from 'react'

import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="header">
                <Navigation />
            </div>
        )
    }
}

// Navigation
class Navigation extends React.Component {
    render () {
        return (
            <nav>
                <Logo />
                <Menu />
            </nav>
        )
    }
}

const Logo = () => {
    return (
        <div className="logo">
            <Link to='/'>Lashkia研究室</Link>
        </div>
    )
}

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <ul className="menu">
                {
                    MENU.map((menu) => (
                        <MenuRow menu={menu}/>
                    ))
                }
            </ul>
        )
    }
}

const MenuRow = (props) => {
    return (
        <li><Link to={'/' + props.menu.id}>{props.menu.display}</Link></li>
    )
}

// Static datas
const MENU = [
    {
        id: "activity",
        display: "活動記録",
        loginRequired: false,
    },
    {
        id: "society",
        display: "学会発表",
        loginRequired: false,
    },
    {
        id: "research",
        display: "卒業研究",
        loginRequired: false,
    },
    {
        id: "job",
        display: "就職先",
        loginRequired: false,
    },
    {
        id: "member",
        display: "メンバー",
        loginRequired: false,
    },
    {
        id: "link",
        display: "外部リンク",
        loginRequired: false,
    },
    {
        id: "equipment",
        display: "研究室備品",
        loginRequired: true,
    },
    {
        id: "lecture",
        display: "レクチャー",
        loginRequired: true,
    },
    {
        id: "login",
        display: "ログイン",
        loginRequired: false,
    },
    {
        id: "logout",
        display: "ログアウト",
        loginRequired: true,
    },
]

export default Header