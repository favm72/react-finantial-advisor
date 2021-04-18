import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import styled from "styled-components"
import { selectRisk, setRisk, setTable } from "../redux/riskSlice"


const Level = ({ level }) => {    
    const dispatch = useDispatch()
    const store = useSelector(selectRisk)
    const handleClick = () => {
        dispatch(setRisk(level))
    }   
    return <Button active={store.selected && level.risk === store.selected.risk} onClick={handleClick}>{level.risk}</Button>
}

const Levels = () => {
    const store = useSelector(selectRisk)    
    return store.list.map(x => <Level key={x.risk} level={x} />)
}

export default function RiskBar(props) {
    const store = useSelector(selectRisk)
    const history = useHistory()
    const dispatch = useDispatch()
    return (
        <Container>
            <Title>Please Select A Risk Level For Your Investment Portfolio</Title>
            <Levels />
            <Button type="button" onClick={() => history.push("/calculator")}>Calculator</Button>
            <Button type="button" onClick={() => dispatch(setTable(!store.table)) }>{ store.table ? "show chart" : "show table" }</Button>
        </Container>
    )
}

const Container = styled.div`
    text-align: center;
`
const Title = styled.div`
    padding: 5px;
    text-align: center;
    font-weight: bold;
`
const Button = styled.button`
    margin: 2px;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 10px;
    padding: 7px 15px;
    background: ${props => props.active ? "red" : "#0084bf"};
    background-image: ${props => props.active ? "red" : "linear-gradient(45deg, #0084bf, #0c8996)"};
    color: white;
`

