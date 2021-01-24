import React, { useEffect, useState } from 'react'
import './App.css'
import { Legende, ChessField } from './components'
import { startSquare } from './utilities/startSquare'
import { calculateNextSteps } from './utilities/calculateNextSteps'
import { calculateNextEnemySteps } from './utilities/calculateNextEnemySteps'
import { checkCeckmate } from './utilities/checkCheckmate'

function App() {

  const [square, setSquare] = useState(startSquare)
  const [selecting, setSelecting] = useState(true)
  const [isBlackNext, setisBlackNext] = useState(false)
  const [selectedFigure, setSelectedFigure] = useState<string | undefined>()
  const [previousValue, setPreviousValue] = useState<number[] | undefined>()
  const [possibleNextSteps, setPossibleNextSteps] = useState<number[][]>()
  const [possibleNextEnemySteps, setPossibleNextEnemySteps] = useState<number[][]>()
  const [checkmate, setCheckmate] = useState<boolean>(false)

  useEffect(() => {
    setCheckmate(checkCeckmate(square, isBlackNext))
  }, [isBlackNext])

  const handelClick = (field: string, ri: number, fi: number) => {
    if (selecting && field !== '0') {
      setSelectedFigure(field)
      setSelecting(false)
      setPossibleNextSteps(calculateNextSteps(square, ri, fi).filter((step) => step[0] !== undefined && step[1] !== undefined))
      setPossibleNextEnemySteps(calculateNextEnemySteps(square, ri, fi))
      setPreviousValue([ri, fi])
    } else if (!selecting && selectedFigure === field) {
      resetStates()
      setSelecting(true)
    } else if (!selecting && previousValue !== undefined && selectedFigure !== undefined) {
      resetStates()
      setSelecting(true)
      setisBlackNext(!isBlackNext)
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
    setPossibleNextEnemySteps(undefined)
    setSelectedFigure(undefined)
  }

  return (
    <div className='FlexContainer'>
      <Legende />
      <ChessField square={square} checkmate={checkmate} possibleNextEnemySteps={possibleNextEnemySteps} possibleNextSteps={possibleNextSteps} selectedFigure={selectedFigure} isBlackNext={isBlackNext} selecting={selecting} handelClick={handelClick}/>
    </div>
  );
}

export { App }