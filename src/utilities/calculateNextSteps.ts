import { calculateNextEnemyStepsReturn } from './interfaces'
import { getPossibleNextEnemyStepsFlat } from './getPossibleNextEnemyStepsFlat'

function calculateNextSteps(square: string[][], ri: number, fi: number, possibleNextEnemySteps: calculateNextEnemyStepsReturn[], calculationForEnemy: boolean): number[][][] {
    const field = square[ri][fi]
    const possibleNextEnemyStepsFlat = getPossibleNextEnemyStepsFlat(possibleNextEnemySteps)

    // Anaylse next steps
    const checkIfPawnIsInital = (ri: number, nextStep: number[]) => ri === 1 && /11./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] - 1][nextStep[1]] === '0' ? nextStep : ri === 6 && /21./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] + 1][nextStep[1]] === '0' ? nextStep : []
    const checkIfFigureIsAhead = (nextStep: number[]) => square[nextStep[0]][nextStep[1]] !== '0' ? true : false
    const checkIfFigureCanBeat = (field: string, nextStep: number[]) => calculationForEnemy ? nextStep : /1../.test(field) && /2../.test(square[nextStep[0]][nextStep[1]]) ? nextStep : /2../.test(field) && /1../.test(square[nextStep[0]][nextStep[1]]) ? nextStep : []
    
    const checkNextCompletxStep = (nextStep: number[], figureInTheWay: boolean, field: string): [number[], boolean] => {
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

    const checkNextSimpleStep = (possibleSteps: number[][]) => {
        return possibleSteps.map((step) => {
            if (step[0] >= 0 && step[1] >= 0 && step[1] <= 7 && step[0] <= 7) {
                if(checkIfFigureIsAhead(step)) {
                    return checkIfFigureCanBeat(field, step)
                } else {
                    return step
                }
            } else {
                return []
            }
        })
    }

    // Calculate next steps
    const calculationForWhitePawns = (field: string, ri: number, fi: number) =>
        ri + 1 <= 7 ?
            calculationForEnemy ? new Array([ri + 1, fi + 1], [ri + 1, fi - 1]) :
            new Array(checkIfPawnIsInital(ri, [ri + 2, fi]), checkIfFigureIsAhead([ri + 1, fi]) ? [] : [ri + 1, fi], checkIfFigureCanBeat(field, [ri + 1, fi + 1]), checkIfFigureCanBeat(field, [ri + 1, fi - 1])) :
            []

    const calculationForBlackPawns = (field: string, ri: number, fi: number) =>
        ri - 1 >= 0 ?
            calculationForEnemy ? new Array([ri - 1, fi + 1], [ri - 1, fi - 1]) :
            new Array(checkIfPawnIsInital(ri, [ri - 2, fi]), checkIfFigureIsAhead([ri - 1, fi]) ? [] : [ri - 1, fi], checkIfFigureCanBeat(field, [ri - 1, fi + 1]), checkIfFigureCanBeat(field, [ri - 1, fi - 1])) :
            []

    const calculationForDiagonally = (field: string, ri: number, fi: number) => {

        const calculateLeftUperConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] - i - 1, step[1] - i - 1]
                const result = checkNextCompletxStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }
   
        const calculateRightUperConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] - i - 1, step[1] + i + 1]
                const result = checkNextCompletxStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }
    
        const calculateLeftLowerConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] + i + 1, step[1] - i - 1]
                const result = checkNextCompletxStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }
    
        const calculateRightLowerConer = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] + i + 1, step[1] + i + 1]
                const result = checkNextCompletxStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }

        return [calculateLeftUperConer(field, ri, fi), calculateRightUperConer(field, ri, fi), calculateLeftLowerConer(field, ri, fi), calculateRightLowerConer(field, ri, fi)]
    }

    const calculationForStraight = (field: string, ri: number, fi: number) => {

        const calculateHorizontallyLeft = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0], step[1] + i + 1]
                const result = checkNextCompletxStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }
    
        const calculateHorizontallyRight = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0], step[1] - i - 1]
                const result = checkNextCompletxStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }
    
        const calculateVerticallyLeft = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] + i + 1, step[1]]
                const result = checkNextCompletxStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }
    
        const calculateVerticallyRight = (field: string, ri: number, fi: number) => {
            let figureInTheWay = false
            return Array.from({ length: 8 }, () => [ri, fi]).map((step, i) => {
                const nextStep = [step[0] - i - 1, step[1]]
                const result = checkNextCompletxStep(nextStep, figureInTheWay, field)
                figureInTheWay = result[1]
                return result[0]
            })
        }

        return [calculateHorizontallyLeft(field, ri, fi), calculateHorizontallyRight(field, ri, fi), calculateVerticallyLeft(field, ri, fi), calculateVerticallyRight(field, ri, fi)]
    }

    const calculationForKnights = (field: string, ri: number, fi: number) => {
        const possibleSteps = [[ri - 1, fi - 2], [ri - 2, fi - 1], [ri - 2, fi + 1], [ri - 1, fi + 2], 
                               [ri + 1, fi + 2], [ri + 2, fi + 1], [ri + 2, fi - 1], [ri + 1, fi - 2]]
         
        return checkNextSimpleStep(possibleSteps)
    }

    const calculationForKing = (field: string, ri: number, fi: number) => {
        const possibleSteps = [ [ri, fi - 1], [ri - 1, fi - 1], [ri - 1, fi], [ri - 1, fi + 1], 
                                [ri, fi + 1], [ri + 1, fi + 1], [ri + 1, fi], [ri + 1, fi - 1]]

        const checkedPossibleSteps = checkNextSimpleStep(possibleSteps)

        return checkedPossibleSteps?.filter(kingStep => !possibleNextEnemyStepsFlat.find(step => kingStep[0] === step[0] && kingStep[1] === step[1]))
    }

    return (() =>
        /11./.test(field) ? [calculationForWhitePawns(field, ri, fi)] :
        /21./.test(field) ? [calculationForBlackPawns(field, ri, fi)] :
        /.2./.test(field) ? [calculationForKnights(field, ri, fi)] :
        /.3./.test(field) ? calculationForDiagonally(field, ri, fi) :
        /.4./.test(field) ? calculationForStraight(field, ri, fi)   :
        /.5./.test(field) ? [...calculationForDiagonally(field, ri, fi), ...calculationForStraight(field, ri, fi)] :
        /.6./.test(field) ? [calculationForKing(field, ri, fi)] :
        [])()
}

export { calculateNextSteps }