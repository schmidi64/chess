const checkCheckmate = (myPossibleSteps: number[][], possibleEnemyKingSteps: number[][] | undefined, check: boolean): boolean => {
 
    if(check && possibleEnemyKingSteps?.filter(kingStep => !myPossibleSteps.find(myStep => kingStep[0] === myStep[0] && kingStep[1] === myStep[1])).length === 0) {
        return true
    }   
    return false
}

export { checkCheckmate }