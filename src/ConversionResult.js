import React from 'react'

let ConversionResult = (props) => {
    return (
        <div>
            <h2>1 {props.cBaseCur} = {props.cSelectedRate} {props.cToCur} </h2>
            <h2>{props.cAmount} {props.cBaseCur} = {props.cResult} {props.cToCur}</h2>
        </div>
    )
}

export default ConversionResult