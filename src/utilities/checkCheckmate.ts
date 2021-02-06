import { calculateNextEnemyStepsReturn } from './interfaces'
import { getPossibleNextEnemyStepsFlat } from './getPossibleNextEnemyStepsFlat'

const checkCheckmate = (square: string[][], possibleNextEnemySteps: calculateNextEnemyStepsReturn[], possibleKingSteps: number[][] | undefined, check: boolean, figureWichCauseCheck: string | undefined, possibleNextStepsAllOwnFigures: calculateNextEnemyStepsReturn[], pathWichCauseCheck: number[][] | undefined, setFiguresWichCanMoveWhenCheck: React.Dispatch<React.SetStateAction<string[] | undefined>>): boolean => {
    const possibleNextEnemyStepsFlat = getPossibleNextEnemyStepsFlat(possibleNextEnemySteps)

    const checkIfKingCanMove = () => possibleKingSteps?.filter(kingStep => !possibleNextEnemyStepsFlat.find(step => kingStep[0] === step[0] && kingStep[1] === step[1])).length === 0
    const figuresWichCanMoveWhenCheck = (possibleNextStepsAllOwnFigures.filter(obj => obj.possibleSteps.find(possibleNextStep => pathWichCauseCheck?.find(oneStepofPath => oneStepofPath[0] === possibleNextStep[0] && oneStepofPath[1] === possibleNextStep[1])))).map(obj => obj.figure)
    
    setFiguresWichCanMoveWhenCheck(figuresWichCanMoveWhenCheck)

    if(check && checkIfKingCanMove() && figuresWichCanMoveWhenCheck.length === 0) {
        return true
    }   
    return false
}

export { checkCheckmate }