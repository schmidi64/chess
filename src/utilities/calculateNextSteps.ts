function calculateNextSteps(square: string[][], field: string, ri: number, fi: number): number[][] | undefined {

    const checkIfPawnIsInital = (ri: number, nextStep: number[]) => ri === 1 && /11./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] - 1][nextStep[1]] === '0'  ? nextStep : ri === 6 && /21./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] + 1][nextStep[1]] === '0'  ? nextStep : []
    const checkIfFigureIsAhead = (nextStep: number[]) => square[nextStep[0]][nextStep[1]] !== '0' ? [] : nextStep
    const checkIfPawnCanBeat = (colour: string, nextStep: number[]) => colour === 'white' && /2./.test(square[nextStep[0]][nextStep[1]]) ? nextStep : colour === 'black' && /1./.test(square[nextStep[0]][nextStep[1]]) ? nextStep : []

    if (/11./.test(field) && ri + 1 <= 7) {             
        return new Array(checkIfPawnIsInital(ri, [ri + 2, fi]) ,checkIfFigureIsAhead([ri + 1, fi]), checkIfPawnCanBeat('white', [ri + 1, fi + 1]), checkIfPawnCanBeat('white', [ri + 1, fi - 1]))
    } else if (/21./.test(field) && ri - 1 >= 0) {  
        return new Array(checkIfPawnIsInital(ri, [ri - 2, fi]), checkIfFigureIsAhead([ri - 1, fi]), checkIfPawnCanBeat('black', [ri - 1, fi + 1]), checkIfPawnCanBeat('black', [ri - 1, fi - 1]))
    }
}

export { calculateNextSteps }