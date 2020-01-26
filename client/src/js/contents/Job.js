import React from 'react'

class Job extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content">
                <h1 className="content-title h1-block">就職先</h1>
                <div className="content-header">
                    <h2 className="h2">就職先一覧</h2>
                </div>
                <div className="list">
                    <ul>
                        {
                            JOBS.map((job)=>(
                                <JobRow job={job} />
                            ))
                        }
                        <li className="list-item">etc...</li>
                    </ul>
                </div>
            </div>
        )
    }
}

const JobRow = (props) => {
    return (
        <li className="list-item">{props.job.name}</li>
    )
}

const JOBS = [
    {
        id: 1,
        name: 'yahoo',
    },
    {
        id: 2,
        name: 'cyber agent',
    },
]

export default Job