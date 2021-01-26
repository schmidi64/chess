import { calculateNextSteps } from './calculateNextSteps'

function calculateNextEnemySteps(square: string[][], isBlackNext: boolean): number[][] | [] {
    
    return (square.flatMap((row, ir) => row.flatMap((chell, ic) => {
        if(!isBlackNext && /2../.test(chell) || isBlackNext && /1../.test(chell)) {
            return calculateNextSteps(square, ir, ic, [])
        } else {
            return []
        }
    })).filter((step) => step !== undefined && step.length !== 0))
}

export { calculateNextEnemySteps }