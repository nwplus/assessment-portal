// this is the third sidebar for the scoring page

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ResponseInput from './responseInput'
import { COLOR, TABS } from '../constants'
import { render } from '@testing-library/react';
import { Document, Page, pdfjs } from "react-pdf";


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

export default function ApplicantResponse(props) {

    useEffect(() => { // DO NOT DELETE
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        console.log("applicantResponse", props);
    }, [])

    


    const [activeTab, setActiveTab] = useState(TABS.OVERVIEW)

    return(
        
        <Main>
            <div style={{ "display": "flex", "flexDirection": "row"}}>
                <Tab onClick={()=>(setActiveTab(TABS.OVERVIEW))}> Overview </Tab>
                <Tab onClick={()=>(setActiveTab(TABS.RESUME))}> Resume </Tab>
                <Tab onClick={()=>(setActiveTab(TABS.COMMENTS))}> Comments </Tab>
            </div>
            {activeTab === TABS.OVERVIEW ?
                <OverviewTab> </OverviewTab> :
                activeTab === TABS.RESUME ?
                    <ResumeTab pdf={props.hacker.resume}></ResumeTab> :
                    <CommentTab comments={props.hacker.comments}></CommentTab>
            }

        </Main>
    )

    function OverviewTab() {
        return( // i think we can do a mapping from KV pairs of data elements into a single response label
            // for i in map: <ReponseInput label={key} reponse={value} /> 
            <>
                <ResponseInput label="Is this your first hackathon?" response="yes" />
                <ResponseInput label="GitHub/GitLab/BitBucket" reponse="https://github.com/yungalyx" />
            </>
        )
    }

    function ResumeTab(props){
        return(
            <Document file={props.pdf}>
                <Page pageNumber={1} />
            </Document>
        )
    }

    function CommentTab(props){
        if(props.comments) {
            return(
                <div>
                    {Object.entries(props.comments).map(([key, value])=>(
                        <div> {key} </div>
                    ))}
                </div>
            )
        } else {
            return(<div> got nothing fam </div>)
        } 
    }

        // {Object.entriesprops.map((id, data) => {
        //     return (
        //     <div key={id}> {data.comment} by {data.by} </div>
        //         )
        //     })
        // }
       

}