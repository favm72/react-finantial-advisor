import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'
import Calculator from '../pages/Calculator'
import styled from "styled-components"

const Routes = (props) => {
    return <Container>
        <Header />
        <PageContent>
            <Switch>
                <Route path='/home' component={Home} />
                <Route path='/calculator' component={Calculator} />
                <Redirect to="/home" />
            </Switch>
        </PageContent>
        <Footer />
    </Container>
}

const Container = styled.div`   
	display: flex;	
	flex-direction: column;
	min-height: 100vh;
	justify-content: space-between;
`
const PageContent = styled.div`
    padding: 10px;
    display: flex;
	flex-direction: column;
	flex: 1;
`

export default Routes
