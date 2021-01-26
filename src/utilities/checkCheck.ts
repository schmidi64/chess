import { calculateNextSteps } from './calculateNextSteps'
import { calculateNextEnemySteps } from './calculateNextEnemySteps'

const checkCheck = (square: string[][], isBlackNext: boolean, setMyPossibleSteps: React.Dispatch<React.SetStateAction<number[][]>>, setPossibleEnemyKingSteps: React.Dispatch<React.SetStateAction<number[][] | undefined>>): boolean => {
    const positionEnemyKing = square.flatMap((row, ir) => row.flatMap((chell, ic) => isBlackNext && /26./.test(square[ir][ic]) ? [ir, ic] : !isBlackNext && /16./.test(square[ir][ic]) ? [ir, ic] : []))
    const possibleEnemyKingSteps = calculateNextSteps(square, positionEnemyKing[0], positionEnemyKing[1], []).filter((step) => step[0] !== undefined && step[1] !== undefined)
    const myPossibleSteps: number[][] = calculateNextEnemySteps((square.map((row, ir) => row.map((chell, ic) => ir === positionEnemyKing[0] && ic === positionEnemyKing[1] ? '0' : chell))), isBlackNext)

    console.log(myPossibleSteps)

    setPossibleEnemyKingSteps(possibleEnemyKingSteps)
    setMyPossibleSteps(myPossibleSteps)

    

    if(myPossibleSteps.flatMap((myStep) => myStep[0] === positionEnemyKing[0] && myStep[1] === positionEnemyKing[1] ? true : false).filter((e) => e !== false)[0]) {
        return true
    }   
    return false
}

export { checkCheck }