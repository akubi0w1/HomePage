import React from 'react'

// Activity
// 活動記録とか
class Activity extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="content">
                <h1 className="content-title h1-block">活動記録</h1>
                <Toc />
                <ActivityList />
            </div>
        )
    }
}

// Toc
// 目次部分
const Toc = () => {
    return (
        <div className="list">
            <ul>
                {
                    ACTIVITIES.map((act) => (
                        <TocRow activity={act}/>
                    ))
                }
            </ul>
        </div>
    )
}

const TocRow = (props) => {
    return (
        <li>
            <a href={`#${props.activity.id}`} className="list-item">{props.activity.title}</a>
        </li>
    )
}

// ActivityList
// 内容
const ActivityList = () => {
    return (
        <div className="list-stripe">
            {
                ACTIVITIES.map((act) => (
                    <ActivityRow activity={act}/>
                ))
            }
        </div>
    )
}

const ActivityRow = (props) => {
    return (
        <div className="list-item" id={props.activity.id}>
            <h2 className="list-title">{props.activity.title}</h2>
            <ul>
                {
                    props.activity.news.map((news) => (
                        <NewsRow news={news}/>
                    ))
                }
            </ul>
        </div>
    )
}

const NewsRow = (props) => {
    return (
        <li>{props.news.content}</li>
    )
}

const ACTIVITIES = [
    {
        id: "2018news",
        title: "2018年度のニュース",
        news: [
            {
                content: "きみのなは"
            },
            {
                content: "おおお",
            }
        ]
    },
    {
        id: "2017news",
        title: "2017年度のニュース",
        news: [
            {
                content: "入学"
            },
            {
                content: "おおお",
            }
        ]
    },

]

export default Activity