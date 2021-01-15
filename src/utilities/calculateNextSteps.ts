function calculateNextSteps(square: string[][], field: string, ri: number, fi: number): number[][] | undefined {

    const checkIfPawnIsInital = (ri: number) => ri === 1 && /11./.test(field) || ri === 6 && /21./.test(field) ? true : false
    const checkIfFigureIsAhead = (nextStep: number[]) => square[nextStep[0]][nextStep[1]] === '0' ? [nextStep[0], nextStep[1]] : []
    const checkIfPawnCanBeat = (currentPosition: number[]) => square[currentPosition[0] + 1][currentPosition[1] - 1] !== '0' ? [currentPosition[0] + 1, currentPosition[1] - 1] : []

    if (/11./.test(field) && ri + 1 <= 7) {
        let nextSteps: number[][] = []
        if (checkIfPawnIsInital(ri)) {
            nextSteps.push(checkIfFigureIsAhead([ri + 1, fi]), checkIfFigureIsAhead([ri + 2, fi]))
            nextSteps.push(checkIfPawnCanBeat([ri, fi]))
        } else {
            nextSteps.push(checkIfFigureIsAhead([ri + 1, fi]))
            nextSteps.push(checkIfPawnCanBeat([ri, fi]))
        }
        return nextSteps

    } else if (/21./.test(field) && ri - 1 >= 0) {
        let nextSteps: number[][] = []
        if (checkIfPawnIsInital(ri)) {
            nextSteps.push(checkIfFigureIsAhead([ri - 1, fi]), checkIfFigureIsAhead([ri - 2, fi]))
        } else {
            nextSteps.push(checkIfFigureIsAhead([ri - 1, fi]))
        }
        return nextSteps

    } else {
        return []
    }



}



export { calculateNextSteps }