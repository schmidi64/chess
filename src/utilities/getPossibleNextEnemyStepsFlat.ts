import { calculateNextEnemyStepsReturn } from './interfaces'

export const getPossibleNextEnemyStepsFlat = (possibleNextEnemySteps: calculateNextEnemyStepsReturn[]) => possibleNextEnemySteps.flatMap((steps) => steps.possibleSteps)