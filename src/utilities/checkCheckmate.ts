const checkCheckmate = (myPossibleSteps: number[][], possibleEnemyKingSteps: number[][] | undefined): boolean => {
 
    if(possibleEnemyKingSteps?.filter(kingStep => !myPossibleSteps.find(myStep => kingStep[0] === myStep[0] && kingStep[1] === myStep[1])).length === 0) {
        return true
    }   
    return false
}

export { checkCheckmate }