import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { selectRisk } from "../redux/riskSlice"

const Level = ({ level }) => {
    const store = useSelector(selectRisk)
    return <Row active={store.selected && level.risk === store.selected.risk}>
        <Cell>{level.risk}</Cell>
        <Cell>{level.bonds}</Cell>
        <Cell>{level.largeCap}</Cell>
        <Cell>{level.midCap}</Cell>
        <Cell>{level.foreign}</Cell>
        <Cell>{level.smallCap}</Cell>
    </Row>
}

const Levels = ({ levels }) => {   
    return <Table>
        <thead>
            <Row>
                <Cell head>Risk</Cell>
                <Cell head>Bonds %</Cell>
                <Cell head>Large Cap %</Cell>
                <Cell head>Mid Cap %</Cell>
                <Cell head>Foreign %</Cell>
                <Cell head>Small Cap %</Cell>
            </Row>
        </thead>
        <tbody>
            {
                levels.map(x => <Level key={x.risk} level={x} />)
            }
        </tbody>
    </Table>
}

export default function RiskTable({ levels }) {
    return (
        <Container>
            <Levels levels={levels} />
        </Container>
    )
}

const Container = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
`
const Table = styled.table`
   border-collapse: collapse;
`
const Row = styled.tr`
   background-color: ${props => props.active ? "red" : "none"};
   color: ${props => props.active ? "white" : "auto"};
`
const Cell = styled.td`
    border: 1px solid #ccc;
    text-align: center;
    padding: 4px;
    font-weight: ${props => props.head ? "bold" : "auto"};
    border-bottom: ${props => props.head ? "3px solid #ccc" : "auto"};
`
