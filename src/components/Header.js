import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Header = (props) => {
	return (			
        <Navbar>
            <Link to="/home">
                <Logo src="home.ico" />
            </Link>            
            <Title>Financial Advisor</Title>
        </Navbar>		
	);
}

const Navbar = styled.div`
    padding: 10px;
    background: #0084bf;
    background-image: linear-gradient(45deg, #0084bf, #0c8996);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;    
`
const Logo = styled.img`
    max-width: 60px;
    max-height: 60px;
    @media (max-width: 520px) {
        max-width: 40px;
        max-height: 40px;
    }  
`
const Title = styled.div`
    font-size: 55px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: rgba(255,255,255,0.85);
    font-family: "Roboto", sans-serif;
    @media (max-width: 520px) {
        font-size: 30px;
    }  
`

export default Header
