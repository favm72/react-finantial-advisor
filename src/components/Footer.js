import React from 'react'
import styled from "styled-components"

const Footer = (props) => {
    return (
        <Container>
            <address>
                Lima, Perú<br />
                <i className="fa fa-phone"></i> Contact Phone: +51 989976691<br />
                <i className="fa fa-envelope"></i> Email: <a href="mailto:favm72@gmail.com">favm72@gmail.com</a>
            </address>
            <div>
                <p>© Copyright 2021</p>
            </div>
        </Container>
    )
}

const Container = styled.div`
    padding: 10px;
    background: #0084bf;
    color: white;
    font-weight: 400;
    background-image: linear-gradient(45deg, #0084bf, #0c8996);
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 460px) {
        flex-direction: column;        
    }  
`

export default Footer
