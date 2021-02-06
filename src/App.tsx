import './App.css'
import React, { useEffect, useState } from 'react'
import { Legende, ChessField } from './components'
import { startSquare } from './utilities/startSquare'
import { calculateNextSteps } from './utilities/calculateNextSteps'
import { checkCheck } from './utilities/checkCheck'
import { checkCheckmate } from './utilities/checkCheckmate'
import { calculateNextEnemyStepsReturn } from './utilities/interfaces'

function App() {

  const [square, setSquare] = useState(startSquare)
  const [selecting, setSelecting] = useState(true)
  const [isBlackNext, setisBlackNext] = useState(false)
  const [selectedFigure, setSelectedFigure] = useState<string | undefined>()
  const [previousValue, setPreviousValue] = useState<number[] | undefined>()
  const [possibleNextSteps, setPossibleNextSteps] = useState<number[][]>()
  const [possibleNextEnemySteps, setPossibleNextEnemySteps] = useState<calculateNextEnemyStepsReturn[]>([{figure: "", possibleSteps: []}])
  const [possibleNextStepsAllOwnFigures, setpossibleNextStepsAllOwnFigures] = useState<calculateNextEnemyStepsReturn[]>([{figure: "", possibleSteps: []}])
  const [possibleKingSteps, setpossibleKingSteps] = useState<number[][]>()
  const [checkmate, setCheckmate] = useState<boolean>(false)
  const [check, setCheck] = useState<boolean>(false)
  const [figureWichCauseCheck, setFigureWichCauseCheck] = useState<string | undefined>('')
  const [figuresWichCanBeatCauseOfCheck, setFiguresWichCanBeatCauseOfCheck] = useState<string[]>()
  const [pathWichCauseCheck, setPathWichCauseCheck] = useState<number[][]>()
  
  useEffect(() => {
    setCheck(checkCheck(square, isBlackNext, setPossibleNextEnemySteps, setpossibleKingSteps, setFigureWichCauseCheck, setpossibleNextStepsAllOwnFigures, setPathWichCauseCheck))
  }, [isBlackNext])

  useEffect(() => {
    setCheckmate(checkCheckmate(square, possibleNextEnemySteps, possibleKingSteps, check, figureWichCauseCheck, possibleNextStepsAllOwnFigures, setFiguresWichCanBeatCauseOfCheck))
  }, [check])

  const handelClick = (field: string, ri: number, fi: number) => {
    if (selecting && field !== '0') {
      setSelectedFigure(field)
      setSelecting(false)
      setPossibleNextSteps(check && !/.61/.test(field) ? getPossitionFigureWichCauseCheck() : calculateNextSteps(square, ri, fi, possibleNextEnemySteps, false).flatMap(steps => steps).filter(step => step[0] !== undefined && step[1] !== undefined))
      setPreviousValue([ri, fi])
    } else if (!selecting && selectedFigure === field) {
      resetStates()
      setSelecting(true)
    } else if (!selecting && previousValue !== undefined && selectedFigure !== undefined) {
      resetStates()
      setFigureWichCauseCheck(undefined)
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
    setSelectedFigure(undefined)
  }


  // Voller Leerlauf
  const getPossitionFigureWichCauseCheck = () => square.map((row,ri) => row.map((cell, ci) => cell === figureWichCauseCheck ? [ri, ci] : [])).flatMap(step => step).filter((step) => step[0] !== undefined && step[1] !== undefined)

  return (
    <div className='FlexContainer'>
      <Legende />
      <ChessField square={square} check={check} checkmate={checkmate} possibleNextSteps={possibleNextSteps} selectedFigure={selectedFigure} isBlackNext={isBlackNext} selecting={selecting} figuresWichCanBeatCauseOfCheck={figuresWichCanBeatCauseOfCheck} handelClick={handelClick}/>
    </div>
  );
}

export { App }