import { calculateNextEnemyStepsReturn } from './interfaces'

const checkCheckmate = (myPossibleSteps: calculateNextEnemyStepsReturn[], possibleEnemyKingSteps: number[][] | undefined, check: boolean): boolean => {
    // const checkIfEnemyKingCanMove = () => possibleEnemyKingSteps?.filter(kingStep => !myPossibleSteps.find(myStep => kingStep[0] === myStep[0] && kingStep[1] === myStep[1])).length === 0

    // if(check && checkIfEnemyKingCanMove()) {
    //     return true
    // }   
    return false
}

export { checkCheckmate }