import { calculateNextSteps } from './calculateNextSteps'
import { calculateNextEnemySteps } from './calculateNextEnemySteps'
import { calculateNextEnemyStepsReturn } from './interfaces'
import { getPossibleNextEnemyStepsFlat } from './getPossibleNextEnemyStepsFlat'
import { getPathWichCauseCheck } from './getPathWichCauseCheck'

const checkCheck = (square: string[][], isBlackNext: boolean, setPossibleNextEnemySteps: React.Dispatch<React.SetStateAction<calculateNextEnemyStepsReturn[]>>, setpossibleKingSteps: React.Dispatch<React.SetStateAction<number[][] | undefined>>, setFiguresWichCauseCheck: React.Dispatch<React.SetStateAction<string[] | undefined>>, setpossibleNextStepsAllOwnFigures: React.Dispatch<React.SetStateAction<calculateNextEnemyStepsReturn[]>>, setPathsWichCauseCheck: React.Dispatch<React.SetStateAction<(number[] | number[][])[][] | undefined>>): boolean => {
    const makeEnemyKingInvisibal = () => square.map((row, ir) => row.map((chell, ic) => ir === positionEnemyKing[0] && ic === positionEnemyKing[1] ? '0' : chell))
    const compairMyStepsToEnemyKingPosition = () => getPossibleNextEnemyStepsFlat(possibleNextEnemySteps).map((step) => step[0] === positionEnemyKing[0] && step[1] === positionEnemyKing[1] ? true : false).filter((e) => e !== false)[0]

    const positionEnemyKing = square.flatMap((row, ir) => row.flatMap((chell, ic) => isBlackNext && /26./.test(square[ir][ic]) ? [ir, ic] : !isBlackNext && /16./.test(square[ir][ic]) ? [ir, ic] : []))
    const possibleKingSteps = (calculateNextSteps(square, positionEnemyKing[0], positionEnemyKing[1], [], false)).flatMap(steps => steps).filter(step => step[0] !== undefined && step[1] !== undefined)
    const possibleNextEnemySteps: calculateNextEnemyStepsReturn[] = calculateNextEnemySteps(makeEnemyKingInvisibal(), isBlackNext)
    const possibleNextStepsAllOwnFigures: calculateNextEnemyStepsReturn[] = calculateNextEnemySteps(square, !isBlackNext)

    setpossibleKingSteps(possibleKingSteps)
    setPossibleNextEnemySteps(possibleNextEnemySteps)
    setpossibleNextStepsAllOwnFigures(possibleNextStepsAllOwnFigures)

    if(compairMyStepsToEnemyKingPosition()) {
        const figuresWichCauseCheck = (possibleNextEnemySteps.filter(obj => obj.possibleSteps.find((step: number[]) => step[0] === positionEnemyKing[0] && step[1] === positionEnemyKing[1] ? true : false))).map(figuresWichCauseCheck => figuresWichCauseCheck.figure)
        const positionFiguresWichCauseCheck = figuresWichCauseCheck.map(figureWichCauseCheck =>  square.map((row,ri) => row.map((cell, ci) => cell === figureWichCauseCheck ? [ri, ci] : [])).flatMap(step => step).filter((step) => step[0] !== undefined && step[1] !== undefined).flatMap(step => step))

        setFiguresWichCauseCheck(positionFiguresWichCauseCheck.map(positionFigureWichCauseCheck => square[positionFigureWichCauseCheck[0]][positionFigureWichCauseCheck[1]]))
        setPathsWichCauseCheck(getPathWichCauseCheck(square, positionEnemyKing, positionFiguresWichCauseCheck, figuresWichCauseCheck))
        
        return true
    } 
    return false
}

export { checkCheck }