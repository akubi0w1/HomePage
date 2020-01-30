import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from './Header'
import Container from './Container'
import Footer from './Footer'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: true, // TODO: sessionIDとか保存して...?ん？
        }

        this.handleLoginCheck = this.handleLoginCheck.bind(this)
    }

    handleLoginCheck() {
        if(!this.state.isLogin) {
            // TODO: redirect
            console.log("is not login")
            return false
        }
        return true
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header
                        isLogin={this.state.isLogin} />
                    <Container 
                        handleIsLogin={this.handleLoginCheck} />
                    <Footer />
                </BrowserRouter>
            </div>
        )
    }
}
export default App