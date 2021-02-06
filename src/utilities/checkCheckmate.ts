import { calculateNextEnemyStepsReturn } from './interfaces'
import { getPossibleNextEnemyStepsFlat } from './getPossibleNextEnemyStepsFlat'

const checkCheckmate = (square: string[][], possibleNextEnemySteps: calculateNextEnemyStepsReturn[], possibleKingSteps: number[][] | undefined, check: boolean, figureWichCauseCheck: string | undefined, possibleNextStepsAllOwnFigures: calculateNextEnemyStepsReturn[], setFiguresWichCanBeatCauseOfCheck: React.Dispatch<React.SetStateAction<string[] | undefined>>): boolean => {
    const possibleNextEnemyStepsFlat = getPossibleNextEnemyStepsFlat(possibleNextEnemySteps)

    const checkIfKingCanMove = () => possibleKingSteps?.filter(kingStep => !possibleNextEnemyStepsFlat.find(step => kingStep[0] === step[0] && kingStep[1] === step[1])).length === 0
    const figuresWichCanBeatCauseofCheck = (possibleNextStepsAllOwnFigures.filter(obj => obj.possibleSteps.find(possibleNextStep => square[possibleNextStep[0]][possibleNextStep[1]] === figureWichCauseCheck))).map(obj => obj.figure)
    
    setFiguresWichCanBeatCauseOfCheck(figuresWichCanBeatCauseofCheck)

    if(check && checkIfKingCanMove() && figuresWichCanBeatCauseofCheck.length === 0) {
        return true
    }   
    return false
}

export { checkCheckmate }