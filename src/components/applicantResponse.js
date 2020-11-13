// this is the third sidebar for the scoring page

import React, { useState } from 'react'
import styled from 'styled-components'
import ResponseInput from './responseInput'
import { COLOR } from '../constants'
import { render } from '@testing-library/react';


const Main = styled.div`
    padding: 20px;
    border: 1px solid gray;
    margin-right: 30px;
    text-align: left;
`;


const Tab = styled.div`
    margin-right: 20px;
    :hover {
        color: ${COLOR.BLUE_TEXT};
        cursor: pointer;
    }
`;

export default function ApplicantResponse() {

    const tabs = ["Overview", "Resume", "Comments"]

    const [activeTab, setActiveTab] = useState('Overview')

  


    return(
        <Main>
            <div style={{ "display": "flex", "flexDirection": "row"}}>
                <Tab onClick={()=>(setActiveTab('Overview'))}> Overview </Tab>
                <Tab onClick={()=>(setActiveTab('Resume'))}> Resume </Tab>
                <Tab onClick={()=>(setActiveTab('Comments'))}> Comments </Tab>
            </div>
    
            <div>
                Current tab is {activeTab}
            </div>

            {activeTab === 'Overview' ?
                <OverviewTab> </OverviewTab> :
                activeTab === 'Resume' ?
                    <ResumeTab></ResumeTab> :
                    <CommentTab></CommentTab>
            }

        </Main>
    )


    function OverviewTab() {
        return(
            <>
                <ResponseInput label="Is this your first hackathon?" response="yes" />
                <ResponseInput label="GitHub/GitLab/BitBucket" reponse="https://github.com/yungalyx" />
            </>
        )
    }

    function ResumeTab(){
        return(
            <div> RESUME !</div>
        )
    }

    function CommentTab(){
        return(
            <div> Comments !</div>
        )
    }

}