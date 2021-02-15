function reducePossibleStepsWhenCheck (pathsWichCauseCheck: (number[] | number[][])[][] | undefined, possibleSteps: number[][]) {

    const reducedPossibleStepsPerPath = pathsWichCauseCheck?.map(pathWichCauseCheck => possibleSteps.filter(possibleStep => pathWichCauseCheck?.find(oneStepofPath => oneStepofPath[0] === possibleStep[0] && oneStepofPath[1] === possibleStep[1])))

    if(reducedPossibleStepsPerPath !== undefined) {
        for(let i = 0; i < reducedPossibleStepsPerPath.length; i++) {
            if(reducedPossibleStepsPerPath[i].length === 0) {
                return []
            }
        }
    }

    return reducedPossibleStepsPerPath?.flatMap(reducedPossibleStepsOnePath => reducedPossibleStepsOnePath)
}

export { reducePossibleStepsWhenCheck }