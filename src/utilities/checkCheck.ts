import { calculateNextSteps } from './calculateNextSteps'
import { calculateNextEnemySteps } from './calculateNextEnemySteps'

const checkCheck = (square: string[][], isBlackNext: boolean, setMyPossibleSteps: React.Dispatch<React.SetStateAction<number[][]>>, setPossibleEnemyKingSteps: React.Dispatch<React.SetStateAction<number[][] | undefined>>): boolean => {
    const positionEnemyKing = square.flatMap((row, ir) => row.flatMap((chell, ic) => isBlackNext && /26./.test(square[ir][ic]) ? [ir, ic] : !isBlackNext && /16./.test(square[ir][ic]) ? [ir, ic] : []))
    const possibleEnemyKingSteps = calculateNextSteps(square, positionEnemyKing[0], positionEnemyKing[1]).filter((step) => step[0] !== undefined && step[1] !== undefined)
    const myPossibleSteps: number[][] = calculateNextEnemySteps(square, positionEnemyKing[0], positionEnemyKing[1])
    
    setPossibleEnemyKingSteps(possibleEnemyKingSteps)
    setMyPossibleSteps(myPossibleSteps)

    if(myPossibleSteps.flatMap((cell) => cell[0] === positionEnemyKing[0] && cell[1] === positionEnemyKing[1] ? true : false).filter((e) => e !== false)[0]) {
        return true
    }   
    return false
}

export { checkCheck }