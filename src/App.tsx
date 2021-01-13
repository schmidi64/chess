import React, { useState } from 'react'
import './App.css'
import { Legende, ChessField } from './components'
import { startSquare } from './utilities/startSquare'
import { calculateNextSteps } from './utilities/calculateNextSteps'

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
      setSelecting(true)  
      setSquare((oldlist) => {
        oldlist[ri][fi] = selectedFigure
        oldlist[previousValue[0]][previousValue[1]] = '0'
        return oldlist
      }) 
    }
  }

  const resetStates = () => {
    setPreviousValue(undefined)
    setPossibleNextSteps(undefined)
    setSelectedFigure(undefined)
  }

  return (
    <div className='FlexContainer'>
      <Legende />
      <ChessField square={square} possibleNextSteps={possibleNextSteps} selectedFigure={selectedFigure} selecting={selecting} handelClick={handelClick}/>
    </div>
  );
}

export { App }