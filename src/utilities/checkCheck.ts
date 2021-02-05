import { calculateNextSteps } from './calculateNextSteps'
import { calculateNextEnemySteps } from './calculateNextEnemySteps'
import { calculateNextEnemyStepsReturn } from './interfaces'

const checkCheck = (square: string[][], isBlackNext: boolean, setMyPossibleSteps: React.Dispatch<React.SetStateAction<number[][]>>, setPossibleEnemyKingSteps: React.Dispatch<React.SetStateAction<number[][] | undefined>>): boolean => {
    const makeEnemyKingInvisibal = () => square.map((row, ir) => row.map((chell, ic) => ir === positionEnemyKing[0] && ic === positionEnemyKing[1] ? '0' : chell))
    const compairMyStepsToEnemyKingPosition = () => myPossibleSteps.flatMap((myStep) => myStep[0] === positionEnemyKing[0] && myStep[1] === positionEnemyKing[1] ? true : false).filter((e) => e !== false)[0]

    const positionEnemyKing = square.flatMap((row, ir) => row.flatMap((chell, ic) => isBlackNext && /26./.test(square[ir][ic]) ? [ir, ic] : !isBlackNext && /16./.test(square[ir][ic]) ? [ir, ic] : []))
    const possibleEnemyKingSteps = calculateNextSteps(square, positionEnemyKing[0], positionEnemyKing[1], [], true).filter((step) => step[0] !== undefined && step[1] !== undefined)
    const myPossibleSteps: calculateNextEnemyStepsReturn[] = calculateNextEnemySteps(makeEnemyKingInvisibal(), isBlackNext)

    setPossibleEnemyKingSteps(possibleEnemyKingSteps)
    setMyPossibleSteps(myPossibleSteps)

    if(compairMyStepsToEnemyKingPosition()) {
        return true
    }   
    return false
}

export { checkCheck }