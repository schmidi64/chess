import { calculateNextEnemyStepsReturn } from './interfaces'
import { getPossibleNextEnemyStepsFlat } from './getPossibleNextEnemyStepsFlat'

const checkCheckmate = (square: string[][], possibleNextEnemySteps: calculateNextEnemyStepsReturn[], possibleKingSteps: number[][] | undefined, check: boolean, figureWichCauseCheck: string | undefined, possibleNextStepsAllOwnFigures: calculateNextEnemyStepsReturn[]): boolean => {
    const possibleNextEnemyStepsFlat = getPossibleNextEnemyStepsFlat(possibleNextEnemySteps)
    const possibleNextStepsAllOwnFiguresFlat = getPossibleNextEnemyStepsFlat(possibleNextStepsAllOwnFigures)

    const checkIfEnemyKingCanMove = () => possibleKingSteps?.filter(kingStep => !possibleNextEnemyStepsFlat.find(step => kingStep[0] === step[0] && kingStep[1] === step[1])).length === 0
    const checkIfFigureWichCauseCheckCanBeBeaten = () => (possibleNextStepsAllOwnFiguresFlat.find(possibleNextStep => square[possibleNextStep[0]][possibleNextStep[1]] === figureWichCauseCheck) !== undefined)

    if(check && checkIfEnemyKingCanMove() && !checkIfFigureWichCauseCheckCanBeBeaten()) {
        return true
    }   
    return false
}

export { checkCheckmate }