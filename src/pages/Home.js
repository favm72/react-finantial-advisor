import React from "react"
import { useSelector } from "react-redux"
import Donut from "../components/Donut"
import RiskBar from "../components/RiskBar"
import RiskTable from "../components/RiskTable"
import { selectRisk } from "../redux/riskSlice"

export default function Home(props) {
    const store = useSelector(selectRisk)     
    return (
        <div className="container">
            <RiskBar />
            { store.table ? <RiskTable levels={store.list} /> : <Donut /> }            
        </div>
    )
}
