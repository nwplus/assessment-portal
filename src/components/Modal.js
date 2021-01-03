import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const GreyDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
`

const ModalDiv = styled.div`
  width: ${p => p.width ?? '400px'};
  height: ${p => p.height ?? '200px'};
  position: absolute;
  left: 50%;
  top: 25%;
  background-color: white;
  transform: translate(-50%, -25%);
  opacity: 100%;
`

export default function Modal({ setShowing, children, height, width }) {
  const backgroundRef = useRef()
  return (
    <GreyDiv
      ref={backgroundRef}
      onClick={e => {
        if (backgroundRef.current && backgroundRef.current === e.target) {
          setShowing(false)
        }
      }}
    >
      <ModalDiv height={height} width={width}>
        {children}
      </ModalDiv>
    </GreyDiv>
  )
}
