import React from 'react'
import styled from 'styled-components';
import ApplicantResponse from '../components/applicantResponse'
import ApplicantScore from '../components/applicantScore'

const Sidebar = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export default function ApplicantSidebar({form}){
    // form is either Hacker or Volunteer
    
    return(
        <Sidebar >
            
            <ApplicantScore />
            <ApplicantResponse/>
        
        </Sidebar>    
    )

}