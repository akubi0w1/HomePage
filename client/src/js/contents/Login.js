import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            studentID: '',
            password: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const field = e.target.name
        this.setState({
            [field]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const studentID = this.state.studentID
        const password = this.state.password
        console.log(studentID, password)
        this.setState({
            studentID: '',
            password: '',
        })
    }

    render(){
        return(
            <div className="content">
                <h1 className="content-title h1-block">ログイン</h1>
                
                <form className="form">
                    <h3 className="input-label">学籍番号</h3>
                    <input type="text" className="input-text" name="studentID" onChange={this.handleChange} value={this.state.studentID} />
                    <h3 className="input-label">パスワード</h3>
                    <input type="password" className="input-text" name="password" onChange={this.handleChange} value={this.state.password}/>

                    <input type="submit" value="ログイン" className="btn btn-primary mt-20" onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }
}

export default Login