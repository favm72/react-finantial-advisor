import React, { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { selectRisk } from "../redux/riskSlice"

const attNames = ["bonds", "largeCap", "midCap", "foreign", "smallCap"]

const setInitialState = () => {
    let initialTableState = {}
    let initialInputState = {}
    for (const att of attNames) {
        initialTableState[att] = { difference: null, newAmount: null }
        initialInputState[att] = ""
    }
    return { initialTableState, initialInputState }
}

const setColor = val => {
    return !val ? "auto" : (val >= 0 ? "green" : "red")
}

const formatNumber = val => {
    return val ? val.toFixed(2) : null
}

export default function CalcTable() {
    const store = useSelector(selectRisk)    
    const { initialTableState, initialInputState } = setInitialState()
    const [inputState, setInputState] = useState(initialTableState)
    const [tableState, setTableState] = useState(initialInputState)
    const [actions, setActions] = useState([])
    const balance = useCallback(() => {

        for (const att of attNames) {
            if (!/[0-9]+/.test(inputState[att])) {
                setActions(["Please use only positive digits or zero when entering current amounts. Please enter all inputs correctly."])
                return
            }
        }
        const selected = store.selected
        let sumInputs = attNames.reduce((s, x) => {
            s += +inputState[x]
            return s
        }, 0)

        let sumSelected = attNames.reduce((s, x) => {
            s += selected[x]
            return s
        }, 0)

        let ratio = sumInputs / sumSelected

        let newTableState = {}
        for (const att of attNames) {
            let current = +inputState[att]
            let newAmount = selected[att] * ratio
            let difference = newAmount - current
            newTableState[att] = { newAmount: newAmount, difference: difference }
        }
        setTableState(newTableState)

        let newActions = []
        let positive = null
        for (const att of attNames) {
            if (newTableState[att].difference > 0) {
                positive = att
                break
            }                
        }
        if (positive) {
            for (const att of attNames) {
                let difference = newTableState[att].difference
                if (difference < 0) {
                    newActions.push(`Transfer ${formatNumber(difference)} $ from ${att} to ${positive}`)                 
                }                
            }
        }
        setActions(newActions)

    }, [store.selected, inputState])    

    return (
        <Container>
            <Button onClick={balance}>Balance</Button>
            <Table>
                <thead>
                    <Row>
                        <Cell head>Current Amount</Cell>
                        <Cell head>Difference</Cell>
                        <Cell head>New Amount</Cell>
                        <Cell head>Recommended Actions</Cell>
                    </Row>
                </thead>
                <tbody>
                    {
                        Object.keys(tableState).map((key, index) => <Row key={key}>
                            <Cell>
                                <Columns>
                                    <label>{key}</label>
                                    <Input type="number" onChange={e => setInputState({ ...inputState, [key]: e.target.value })} />
                                </Columns>
                            </Cell>
                            <Cell color={setColor(tableState[key].difference)}>{formatNumber(tableState[key].difference)}</Cell>
                            <Cell color="blue">{formatNumber(tableState[key].newAmount)}</Cell>
                            {
                                index === 0 ?
                                    <Cell maxWidth={180} rowSpan={5}>
                                        {
                                            actions.map((x, i) => <div key={i}>- {x}</div>)
                                        }
                                    </Cell>
                                    : null
                            }
                        </Row>)
                    }
                </tbody>
            </Table>
        </Container>
    )
}

const Container = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
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
    color: ${props => props.color ? props.color : "auto"};
    max-width: ${props => props.maxWidth ? props.maxWidth + "px" : "unset"};
    font-weight: ${props => props.head ? "bold" : "auto"};
    border-bottom: ${props => props.head ? "3px solid #ccc" : "auto"};
`
const Columns = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Input = styled.input`
    width: 70px;
    padding: 4px 8px;
    border-radius: 4px;
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
