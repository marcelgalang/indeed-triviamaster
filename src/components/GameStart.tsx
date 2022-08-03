import React from "react";
import styled from "styled-components";
import breakpoints from "../styles/breakpoints";
import { Button } from "../styles/global";
 
type Props = {
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Start = styled.div`
    font-size: 24px;
    margin: 24px 0;
    align-items: center;
    justify-content :center;
    display: flex;
    flex-direction: column;
    min-height: 200px;
    @media ${breakpoints.device.sm} {
        font-size: 36px;
  } 
`
const BodyCopy = styled.div`
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6px;
    @media ${breakpoints.device.sm} {
        font-size: 16px;
  }
`

const GameStart:React.FC<Props> = ({
    callback
}) => {
    return (
        <Start>
            <div>Are you a Trivia Master?</div>
            <BodyCopy>Questions can have multiple right answers.</BodyCopy>
            <BodyCopy>Choose the best!</BodyCopy>
            <Button onClick={callback}>Start game</Button>
        </Start>
    )
}

export default GameStart;