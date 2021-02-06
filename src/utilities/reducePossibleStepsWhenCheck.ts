function reducePossibleStepsWhenCheck (pathWichCauseCheck: number[][] | undefined, possibleSteps: number[][]) {

    return possibleSteps.filter(possibleStep => pathWichCauseCheck?.find(oneStepofPath => oneStepofPath[0] === possibleStep[0] && oneStepofPath[1] === possibleStep[1]))
}

export { reducePossibleStepsWhenCheck }