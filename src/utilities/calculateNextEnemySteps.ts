import { calculateNextSteps } from './calculateNextSteps'
import { calculateNextEnemyStepsReturn } from './interfaces'


function calculateNextEnemySteps(square: string[][], isBlackNext: boolean): calculateNextEnemyStepsReturn[] {
    return (square.flatMap((row, ir) => row.flatMap((chell, ic) => {
        if(!isBlackNext && /2../.test(chell) || isBlackNext && /1../.test(chell)) {
            return {figure: chell, possibleSteps: calculateNextSteps(square, ir, ic, [], true)}
        } else {
            return {figure: "", possibleSteps: []}
        }
    })).filter((step) => step.possibleSteps !== undefined && step.possibleSteps.length !== 0))
}

export { calculateNextEnemySteps }