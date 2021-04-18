import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import styled from "styled-components"
import CalcTable from "../components/CalcTable"
import RiskTable from "../components/RiskTable"
import { selectRisk } from "../redux/riskSlice"

export default function Calculator(props) {
    const store = useSelector(selectRisk)
    if (!store.selected)
        return <Redirect to="/home" />
    return (
        <Center>
            <Container>
                <Title>Personalized Portfolio</Title>
                <Description>Risk Level {store.selected.risk}</Description>
                <RiskTable levels={[store.selected]} />
                <Description>Please Enter Your Current Portfolio</Description>
                <CalcTable />
            </Container>
        </Center>
    )
}
const Container = styled.div`    
    width: fit-content;
`
const Center = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
`
const Description = styled.div`  
    font-weight: bold;   
`
