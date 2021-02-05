import { calculateNextSteps } from './calculateNextSteps'
import { calculateNextEnemySteps } from './calculateNextEnemySteps'
import { calculateNextEnemyStepsReturn } from './interfaces'
import { getPossibleNextEnemyStepsFlat } from './getPossibleNextEnemyStepsFlat'

const checkCheck = (square: string[][], isBlackNext: boolean, setPossibleNextEnemySteps: React.Dispatch<React.SetStateAction<calculateNextEnemyStepsReturn[]>>, setpossibleKingSteps: React.Dispatch<React.SetStateAction<number[][] | undefined>>, setFigureWichCauseCheck: React.Dispatch<React.SetStateAction<string | undefined>>, setpossibleNextStepsAllOwnFigures: React.Dispatch<React.SetStateAction<calculateNextEnemyStepsReturn[]>>): boolean => {
    const makeEnemyKingInvisibal = () => square.map((row, ir) => row.map((chell, ic) => ir === positionEnemyKing[0] && ic === positionEnemyKing[1] ? '0' : chell))
    const compairMyStepsToEnemyKingPosition = () => getPossibleNextEnemyStepsFlat(possibleNextEnemySteps).map((step) => step[0] === positionEnemyKing[0] && step[1] === positionEnemyKing[1] ? true : false).filter((e) => e !== false)[0]

    const positionEnemyKing = square.flatMap((row, ir) => row.flatMap((chell, ic) => isBlackNext && /26./.test(square[ir][ic]) ? [ir, ic] : !isBlackNext && /16./.test(square[ir][ic]) ? [ir, ic] : []))
    const possibleKingSteps = calculateNextSteps(square, positionEnemyKing[0], positionEnemyKing[1], [], false).filter((step) => step[0] !== undefined && step[1] !== undefined)
    const possibleNextEnemySteps: calculateNextEnemyStepsReturn[] = calculateNextEnemySteps(makeEnemyKingInvisibal(), isBlackNext)
    const possibleNextStepsAllOwnFigures: calculateNextEnemyStepsReturn[] = calculateNextEnemySteps(square, !isBlackNext)

    setpossibleKingSteps(possibleKingSteps)
    setPossibleNextEnemySteps(possibleNextEnemySteps)
    setpossibleNextStepsAllOwnFigures(possibleNextStepsAllOwnFigures)

    if(compairMyStepsToEnemyKingPosition()) {
        setFigureWichCauseCheck((possibleNextEnemySteps.filter(obj => obj.possibleSteps.find((step: number[]) => step[0] === positionEnemyKing[0] && step[1] === positionEnemyKing[1] ? true : false)))[0].figure)
        return true
    } 

    return false
}

export { checkCheck }