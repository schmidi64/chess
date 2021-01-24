function calculateNextSteps(square: string[][], field: string, ri: number, fi: number): number[][] | [] {

    // Anaylse next steps
    const checkIfPawnIsInital = (ri: number, nextStep: number[]) => ri === 1 && /11./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] - 1][nextStep[1]] === '0' ? nextStep : ri === 6 && /21./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] + 1][nextStep[1]] === '0' ? nextStep : []
    const checkIfFigureIsAhead = (nextStep: number[]) => square[nextStep[0]][nextStep[1]] !== '0' ? true : false
    const checkIfFigureCanBeat = (field: string, nextStep: number[]) => /1../.test(field) && /2../.test(square[nextStep[0]][nextStep[1]]) ? nextStep : /2../.test(field) && /1../.test(square[nextStep[0]][nextStep[1]]) ? nextStep : []
    
    const checkNextStep = (nextStep: number[], figureInTheWay: boolean, field: string): [number[], boolean] => {
        if (!figureInTheWay && nextStep[0] >= 0 && nextStep[1] >= 0 && nextStep[1] <= 7 && nextStep[0] <= 7) {
            if (checkIfFigureIsAhead(nextStep)) {
                figureInTheWay = true
                return [checkIfFigureCanBeat(field, nextStep), figureInTheWay]
            } else {
                return [nextStep, figureInTheWay]
            }
        } else {
            return [[], figureInTheWay]
        }
    }

    // Calculate next steps
    const calculationForWhitePawns = (field: string, ri: number, fi: number) =>
        ri + 1 <= 7 ?
            new Array(checkIfPawnIsInital(ri, [ri + 2, fi]), checkIfFigureIsAhead([ri + 1, fi]) ? [] : [ri + 1, fi], checkIfFigureCanBeat(field, [ri + 1, fi + 1]), checkIfFigureCanBeat(field, [ri + 1, fi - 1])) :
            []

    const calculationForBlackPawns = (field: string, ri: number, fi: number) =>
        ri - 1 >= 0 ?
            new Array(checkIfPawnIsInital(ri, [ri - 2, fi]), checkIfFigureIsAhead([ri - 1, fi]) ? [] : [ri - 1, fi], checkIfFigureCanBeat(field, [ri - 1, fi + 1]), checkIfFigureCanBeat(field, [ri - 1, fi - 1])) :
            []

    const calculationForDiagonally = (field: string, ri: number, fi: number) => {

        const calculateLeftUperConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] - i - 1, step[1] - i - 1]
                const result = checkNextStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }

        const calculateRightUperConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] - i - 1, step[1] + i + 1]
                const result = checkNextStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }

        const calculateLeftLowerConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] + i + 1, step[1] - i - 1]
                const result = checkNextStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }

        const calculateLeftRightConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] + i + 1, step[1] + i + 1]
                const result = checkNextStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }

        return [...calculateLeftUperConer(field, ri, fi), ...calculateRightUperConer(field, ri, fi), ...calculateLeftLowerConer(field, ri, fi), ...calculateLeftRightConer(field, ri, fi)]
    }


    return (() =>
        /11./.test(field) ? calculationForWhitePawns(field, ri, fi) :
        /21./.test(field) ? calculationForBlackPawns(field, ri, fi) :
        /.3./.test(field) ? calculationForDiagonally(field, ri, fi) :
        /.5./.test(field) ? calculationForDiagonally(field, ri, fi) :
        []
    )()

}

export { calculateNextSteps }