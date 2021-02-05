import { calculateNextEnemyStepsReturn } from './interfaces'
import { getPossibleNextEnemyStepsFlat } from './getPossibleNextEnemyStepsFlat'

const checkCheckmate = (possibleNextEnemySteps: calculateNextEnemyStepsReturn[], possibleKingSteps: number[][] | undefined, check: boolean): boolean => {
    const possibleNextEnemyStepsFlat = getPossibleNextEnemyStepsFlat(possibleNextEnemySteps)
    const checkIfEnemyKingCanMove = () => possibleKingSteps?.filter(kingStep => !possibleNextEnemyStepsFlat.find(step => kingStep[0] === step[0] && kingStep[1] === step[1])).length === 0
    
    if(check && checkIfEnemyKingCanMove()) {
        return true
    }   
    return false
}

export { checkCheckmate }