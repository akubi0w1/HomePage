import React from 'react'
import { Route } from 'react-router-dom'

import Home from './contents/Home'
import Activity from './contents/Activity'
import Society from './contents/Society'
import Research from './contents/Research'
import Job from './contents/Job'
import Member from './contents/Member'
import MemberDetail from './contents/MemberDetail'
import MemberEdit from './contents/MemberEdit'
import Links from './contents/Links'
import Equipment from './contents/Equipment'
import Lecture from './contents/Lecture'
import Login from './contents/Login'
import PasswordEdit from './contents/PasswordEdit'

// TODO: ここでルーティングするか、Appでルーティングするか...
class Container extends React.Component {
    render() {
        return (
            <div className="container">
                <Route
                    exact
                    path='/'
                    render={props =>
                        <Home
                            {...props}
                        />}
                />
                <Route
                    exact
                    path='/activity'
                    render={props =>
                        <Activity
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/society'
                    render={props =>
                        <Society
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/research'
                    render={ props =>
                        <Research 
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/job'
                    render={props =>
                        <Job
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/member'
                    render={props=>
                        <Member
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/member/:id'
                    render={props=>
                        <MemberDetail
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/member/:id/edit'
                    render={props =>
                        <MemberEdit
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/member/:id/edit_pass'
                    render={props =>
                        <PasswordEdit
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/link'
                    render={props=>
                        <Links
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/equipment'
                    render={ props =>
                        <Equipment
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/lecture'
                    render={ props =>
                        <Lecture 
                            {...props}
                        />
                    }
                />
                <Route
                    exact
                    path='/login'
                    render={ props =>
                        <Login
                            {...props}
                        />
                    }
                />
            </div>
        )
    }
}

export default Container