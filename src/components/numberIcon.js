import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants';

const Circle = styled.div`
    background: white;
    margin-right: 10px;
    border-radius: 50%;
    border: 3px solid ${COLOR.BLUE_TEXT};
    width: 35px;
    height: 35px;
    color: ${COLOR.BLUE_TEXT};
    display: flex; 
    text-align: center; 
    justify-content: center;
    :hover {
        color: ${COLOR.RED};
        border: 3px solid ${COLOR.RED};
        cursor: pointer;
    }
`;

export default function Number({number, selected}) {

    return(
        <Circle>
            {number}
        </Circle>
    )

}