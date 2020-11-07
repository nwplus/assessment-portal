// this is the third sidebar for the scoring page

import React from 'react'
import styled from 'styled-components'
import ResponseInput from './responseInput'


const Main = styled.div`
    padding: 20px;
    border: 1px solid gray;
    margin-right: 30px;
    width: 40%;
`;

const Tabs = styled.div`
    display: flex;
    flex-direction: row;

`;

export default function ApplicantResponse() {

    const tabs = ["Overview", "Resume", "Comments"] 

    return(
        <Main>
            <Tabs>
                <h3>Overview</h3>
                <h3>Resume</h3>
                <h3>Comments</h3>
            </Tabs>
            <ResponseInput label="Is this your first hackathon?" response="yes" />
            <ResponseInput label="GitHub/GitLab/BitBucket" reponse="https://github.com/yungalyx" />
        </Main>
    )
}