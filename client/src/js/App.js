import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from './Header'
import Container from './Container'
import Footer from './Footer'


// TODO: ログイン状態の管理
class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header />
                    <Container />
                    <Footer />
                </BrowserRouter>
            </div>
        )
    }
}
export default App