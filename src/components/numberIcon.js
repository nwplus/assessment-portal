import React from 'react'
import styled from 'styled-components'

const Circle = styled.div`
    background: white;
    border-radius: 50%;
    border: 2px solid #2F80ED;
    width: 35px;
    height: 35px;
    color: #2F80ED;
`;


export default function Number({number, selected}) {


    return(
        <Circle>
            {number}
        </Circle>
    )

}