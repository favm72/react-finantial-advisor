import React, { Fragment } from "react"
import { useSelector } from "react-redux";
import styled from "styled-components"
import { selectRisk } from "../redux/riskSlice";

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(start, end) {
    var xystart = polarToCartesian(200, 200, 100, start);
    var xyend = polarToCartesian(200, 200, 100, end);
    let f = 0    
    if (start === 0 && end < 0) {
        f = 1      
    }
    var d = [
        "M", xystart.x, xystart.y,
        "A", 100, 100, 0, f, 1, xyend.x, xyend.y
    ].join(" ");

    return d;
}

const setData = (data) => {
    let sum = data.reduce((s, x) => {
        s += x.value
        return s
    }, 0)
    let datacopy = data.filter(x => x.value > 0).slice()
    let start = 0
    for (const elem of datacopy) {
        if (elem.value > 0) {
            elem.start = start
            let angle = start + elem.value * 360 / sum
            angle = angle > 180 ? angle - 360 : angle
            elem.end = angle
            start = angle
        }
    }   
    return datacopy
}

export default function Donut() {
    const store = useSelector(selectRisk)
    let data = []
    if (store.selected) {
        data = [
            { value: store.selected.bonds, color: "#cc3010", label: "Bonds" },
            { value: store.selected.largeCap, color: "#20bb10", label: "Large Cap" },
            { value: store.selected.midCap, color: "#3010bb", label: "Mid Cap" },
            { value: store.selected.foreign, color: "#80cc20", label: "Foreign" },
            { value: store.selected.smallCap, color: "#20aa80", label: "Small Cap" },
        ]
    }
    
    let clone = setData(data)
    return (
        <Container>
            <ChartContainer>
                <svg width="100%" height="100%" viewBox="0 0 400 400">
                    {
                        clone.map(x => {
                            return <Path key={x.label}
                                fill="transparent"
                                stroke={x.color}
                                strokeWidth="60"
                                d={describeArc(x.start, x.end)} />
                        })
                    }
                </svg>
            </ChartContainer>
            <Labels>
                {
                    clone.map(x => <Fragment key={x.label}>
                        <Box bgcolor={x.color} />
                        <Label>{x.label} - {x.value}</Label>
                    </Fragment>)
                }
            </Labels>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 535px) {
        flex-direction: column;
    }  
`
const ChartContainer = styled.div`   
    max-width: 700px;
    height: auto;
`
const Labels = styled.div`
    display: grid;
    grid-template-columns: 40px 1fr;
    row-gap: 4px;
    column-gap: 4px;
`
const Box = styled.div`    
    background-color: ${props => props.bgcolor};
`
const Label = styled.label`
    
`
const Path = styled.path`
    :hover {
        opacity: 0.5;
    }
`
