function calculateNextSteps(square: string[][], field: string, ri: number, fi: number): number[][] | [] {

    // Anaylse next steps
    const checkIfPawnIsInital = (ri: number, nextStep: number[]) => ri === 1 && /11./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] - 1][nextStep[1]] === '0' ? nextStep : ri === 6 && /21./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] + 1][nextStep[1]] === '0' ? nextStep : []
    const checkIfFigureIsAhead = (nextStep: number[]) => square[nextStep[0]][nextStep[1]] !== '0' ? true : false
    const checkIfFigureCanBeat = (field: string, nextStep: number[]) => /1../.test(field)  && /2../.test(square[nextStep[0]][nextStep[1]]) ? nextStep : /2../.test(field)  && /1../.test(square[nextStep[0]][nextStep[1]]) ? nextStep : []

    const checkNextStepForBishops = (nextStep: number[], figureInTheWay: boolean, field: string): [number[], boolean] => {
        if (checkIfFigureIsAhead([nextStep[0], nextStep[1]])) {
            figureInTheWay = true
            return [checkIfFigureCanBeat(field, [nextStep[0], nextStep[1]]), figureInTheWay]
        } else {
            return [[nextStep[0], nextStep[1]], figureInTheWay]
        }
    }

    // calculate next steps by figure
    const calculationForWhitePawns = (field: string, ri: number, fi: number) => 
        ri + 1 <= 7 ?
            new Array(checkIfPawnIsInital(ri, [ri + 2, fi]), checkIfFigureIsAhead([ri + 1, fi]) ? [] : [ri + 1, fi], checkIfFigureCanBeat(field, [ri + 1, fi + 1]), checkIfFigureCanBeat(field, [ri + 1, fi - 1])) :
            []

    const calculationForBlackPawns = (field: string, ri: number, fi: number) =>
        ri - 1 >= 0 ?
            new Array(checkIfPawnIsInital(ri, [ri - 2, fi]), checkIfFigureIsAhead([ri - 1, fi]) ? [] : [ri - 1, fi], checkIfFigureCanBeat(field, [ri - 1, fi + 1]), checkIfFigureCanBeat(field, [ri - 1, fi - 1])) :
            [] 

    const calculationForBishops = (field: string, ri: number, fi: number) => {
        
        const calculateLeftUperConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] - i - 1, step[1] - i - 1]
                if ((nextStep[0]) >= 0 && (nextStep[1]) >= 0  && !figureInTheWay) {
                    const result = checkNextStepForBishops(nextStep, figureInTheWay, field)
                    figureInTheWay = result[1]
                    return result[0]
                } else {
                    return []
                }
            })
        }

        const calculateRightUperConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] - i - 1, step[1] + i + 1]
                if ((nextStep[0]) >= 0 && (nextStep[1]) <= 7 && !figureInTheWay) {
                    const result = checkNextStepForBishops(nextStep, figureInTheWay, field)
                    figureInTheWay = result[1]
                    return result[0] 
                } else {
                    return []
                }
            })
        }

        const calculateLeftLowerConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] + i + 1, step[1] - i - 1]
                if ((nextStep[0]) <= 7 && (nextStep[1]) >= 0 && !figureInTheWay) {
                    const result = checkNextStepForBishops(nextStep, figureInTheWay, field)
                    figureInTheWay = result[1]
                    return result[0] 
                } else {
                    return []
                }
            })
        }
            
        const calculateLeftRightConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] + i + 1, step[1] + i + 1]
                if ((nextStep[0]) <= 7 && (nextStep[1]) <= 7 && !figureInTheWay) {
                    const result = checkNextStepForBishops(nextStep, figureInTheWay, field)
                    figureInTheWay = result[1]
                    return result[0] 
                } else {
                    return []
                }
            })
        }


            Array.from({length: 8}, () => [ri, fi]).map((step, i) => (step[0] + i + 1) <= 7 && (step[1] + i + 1) <= 7 ? [step[0] + i + 1, step[1] + i + 1] : [])
            
        return [...calculateLeftUperConer(field ,ri, fi), ...calculateRightUperConer(field ,ri, fi), ...calculateLeftLowerConer(field ,ri, fi), ...calculateLeftRightConer(field ,ri, fi)]
    }


    return (() => 
        /11./.test(field) ? calculationForWhitePawns(field, ri, fi) :
        /21./.test(field) ? calculationForBlackPawns(field, ri, fi) :
        /.3./.test(field) ? calculationForBishops(field, ri, fi)    :
        []
    )()

}

export { calculateNextSteps }