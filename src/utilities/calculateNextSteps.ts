function calculateNextSteps(square: string[][], field: string, ri: number, fi: number): number[][] | [] {

    // Anaylse next steps
    const checkIfPawnIsInital = (ri: number, nextStep: number[]) => ri === 1 && /11./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] - 1][nextStep[1]] === '0' ? nextStep : ri === 6 && /21./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] + 1][nextStep[1]] === '0' ? nextStep : []
    const checkIfFigureIsAhead = (nextStep: number[]) => square[nextStep[0]][nextStep[1]] !== '0' ? [] : nextStep
    const checkIfPawnCanBeat = (colour: string, nextStep: number[]) => colour === 'white' && /2./.test(square[nextStep[0]][nextStep[1]]) ? nextStep : colour === 'black' && /1./.test(square[nextStep[0]][nextStep[1]]) ? nextStep : []

    // calculate next steps by figure
    const calculationForWhitePawns = (field: string, ri: number, fi: number) => 
        ri + 1 <= 7 ?
            new Array(checkIfPawnIsInital(ri, [ri + 2, fi]), checkIfFigureIsAhead([ri + 1, fi]), checkIfPawnCanBeat('white', [ri + 1, fi + 1]), checkIfPawnCanBeat('white', [ri + 1, fi - 1])) :
            []

    const calculationForBlackPawns = (field: string, ri: number, fi: number) =>
        ri - 1 >= 0 ?
            new Array(checkIfPawnIsInital(ri, [ri - 2, fi]), checkIfFigureIsAhead([ri - 1, fi]), checkIfPawnCanBeat('black', [ri - 1, fi + 1]), checkIfPawnCanBeat('black', [ri - 1, fi - 1])) :
            [] 

    const calculationForBishops = (field: string, ri: number, fi: number) => {
        
        const calculateLeftUperConer = (ri: number, fi: number) =>
            Array.from({length: 8}, () => [ri, fi]).map((step, i) => (step[0] - i - 1) >= 0 && (step[1] - i - 1) >= 0 ? [step[0] - i - 1, step[1] - i - 1] : [])
        
        const calculateRightUperConer = (ri: number, fi: number) =>
            Array.from({length: 8}, () => [ri, fi]).map((step, i) => (step[0] - i - 1) >= 0 && (step[1] + i + 1) <= 7 ? [step[0] - i - 1, step[1] + i + 1] : [])

        const calculateLeftLowerConer = (ri: number, fi: number) =>
            Array.from({length: 8}, () => [ri, fi]).map((step, i) => (step[0] + i + 1) <= 7 && (step[1] - i - 1) >= 0 ? [step[0] + i + 1, step[1] - i - 1] : [])
            
        const calculateLeftRightConer = (ri: number, fi: number) =>
            Array.from({length: 8}, () => [ri, fi]).map((step, i) => (step[0] + i + 1) <= 7 && (step[1] + i + 1) <= 7 ? [step[0] + i + 1, step[1] + i + 1] : [])
            
        return [...calculateLeftUperConer(ri, fi), ...calculateRightUperConer(ri, fi), ...calculateLeftLowerConer(ri, fi), ...calculateLeftRightConer(ri,fi)]
    }


    return (() => 
        /11./.test(field) ? calculationForWhitePawns(field, ri, fi) :
        /21./.test(field) ? calculationForBlackPawns(field, ri, fi) :
        /.3./.test(field) ? calculationForBishops(field, ri, fi)    :
        []
    )()

}

export { calculateNextSteps }