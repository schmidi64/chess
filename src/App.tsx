import React, { useState } from 'react'
import './App.css'
import { startSquare } from './utilities/startSquare'
import { calculateNextSteps } from './utilities/calculateNextSteps'
import {  whiteRooks, whiteKnights, whiteBishops, whiteKing, whiteQueen, whitePawns,
          blackRooks, blackKnights, blackBishops, blackKing, blackQueen, blackPawns } from './icons' 

function App() {

  const [square, setSquare] = useState(startSquare)
  const [selecting, setSelecting] = useState(true)
  const [selectedFigure, setSelectedFigure] = useState<string | undefined>()
  const [previousValue, setPreviousValue] = useState<number[] | undefined>()
  const [possibleNextSteps, setPossibleNextSteps] = useState<number[][] | undefined>()

  const handelClick = (field: string, ri: number, fi: number) => {
    if (selecting) {
      setSelectedFigure(field)
      setSelecting(false)
      setPossibleNextSteps(calculateNextSteps(field, ri, fi))
      setPreviousValue([ri, fi])
    } else if (!selecting && selectedFigure === field) {
      resetStates()
      setSelecting(true)
    } else if (!selecting && previousValue !== undefined && selectedFigure !== undefined)  {
      resetStates()  
      setSquare((oldlist) => {
        oldlist[ri][fi] = selectedFigure
        oldlist[previousValue[0]][previousValue[1]] = '0'
        return oldlist
      })
      setSelecting(true)
    }
  }

  const resetStates = () => {
    setPreviousValue(undefined)
    setPossibleNextSteps(undefined)
    setSelectedFigure(undefined)
  }

  return (
    <div className='FlexContainer'>
      <div className='Legende'>
        <h1>Legende</h1>
        <ol className='List'>
          <li>Pawns</li>
          <li>Knights</li>
          <li>Bishops</li>
          <li>Rooks</li>
          <li>Queen</li>
          <li>King</li>
        </ol>
      </div>
      <div className='Square'>
        <h1 className='Heading'>Chess</h1>
        <table className='Table'>
          {square.map((rows, ri) =>
            <tr>{rows.map((field, fi) => 
              <td className='TableData' onClick={event => (possibleNextSteps?.some((possibleNextStep) => possibleNextStep[0] === ri && possibleNextStep[1] === fi) || selecting === true || selectedFigure === field) ? handelClick(field, ri, fi) : undefined } 
                style={possibleNextSteps?.some((possibleNextStep) => possibleNextStep[0] === ri && possibleNextStep[1] === fi) ? {background: 'blue'} :
                       selectedFigure === field ? {background: 'yellow'} : undefined}>
                {
                  // white
                  /14./.test(field) ? <img src={whiteRooks} width="80" height="80" /> : 
                  /12./.test(field) ? <img src={whiteKnights} width="80" height="80" /> : 
                  /13./.test(field) ? <img src={whiteBishops} width="80" height="80" /> : 
                  /16./.test(field) ? <img src={whiteKing} width="80" height="80" /> : 
                  /15./.test(field) ? <img src={whiteQueen} width="80" height="80" /> : 
                  /11./.test(field) ? <img src={whitePawns} width="80" height="80" /> : 
                  // black
                  /24./.test(field) ? <img src={blackRooks} width="80" height="80" /> : 
                  /22./.test(field) ? <img src={blackKnights} width="80" height="80" /> : 
                  /23./.test(field) ? <img src={blackBishops} width="80" height="80" /> : 
                  /26./.test(field) ? <img src={blackKing} width="80" height="80" /> : 
                  /25./.test(field) ? <img src={blackQueen} width="80" height="80" /> : 
                  /21./.test(field) ? <img src={blackPawns} width="80" height="80" /> :
                  null
                } 
              </td>)}
            </tr>)}
        </table>
      </div>
    </div>
  );
}

export { App }