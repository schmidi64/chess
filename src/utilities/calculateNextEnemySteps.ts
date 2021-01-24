import { calculateNextSteps } from './calculateNextSteps'

function calculateNextEnemySteps(square: string[][], ri: number, fi: number): number[][] | [] {
    const field = square[ri][fi]
    
    return (square.flatMap((row, ir) => row.flatMap((chell, ic) => {
        if(/1../.test(field) && /2../.test(chell) || /2../.test(field) && /1../.test(chell)) {
            return calculateNextSteps(square, ir, ic)
        } else {
            return []
        }
    })).filter((step) => step !== undefined && step.length !== 0))
}

export { calculateNextEnemySteps }