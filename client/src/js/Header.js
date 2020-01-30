import React from 'react'

import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin: props.isLogin,
        }
    }

    render() {
        return (
            <div className="header">
                <Navigation isLogin={this.state.isLogin} />
            </div>
        )
    }
}

// Navigation
const Navigation = (props) => {
    return (
        <nav>
            <Logo />
            <Menu isLogin={props.isLogin} />
        </nav>
    )
}

const Logo = () => {
    return (
        <div className="logo">
            <Link to='/'>Lashkia研究室</Link>
        </div>
    )
}

const Menu = (props) => {
    return (
        <ul className="menu">
            {
                MENU.map((menu) => (
                    <MenuRow key={menu.id} menu={menu} isLogin={props.isLogin}/>
                ))
            }
        </ul>
    )
}

const MenuRow = (props) => {
    if(typeof(props.menu.loginRequired) !== "undefined") {
        if (props.menu.loginRequired && !props.isLogin) {
            return null
        }
        if (!props.menu.loginRequired && props.isLogin) {
            return null
        }
    }
    return (
        <li><Link to={'/' + props.menu.id}>{props.menu.display}</Link></li>
    )
}

// Static datas
const MENU = [
    {
        id: "activity",
        display: "活動記録",
    },
    {
        id: "society",
        display: "学会発表",
    },
    {
        id: "research",
        display: "卒業研究",
    },
    {
        id: "job",
        display: "就職先",
    },
    {
        id: "member",
        display: "メンバー",
    },
    {
        id: "link",
        display: "外部リンク",
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