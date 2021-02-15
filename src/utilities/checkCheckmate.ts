import { calculateNextEnemyStepsReturn } from './interfaces'
import { getPossibleNextEnemyStepsFlat } from './getPossibleNextEnemyStepsFlat'
import { calculateNextSteps } from './calculateNextSteps'
import { reducePossibleStepsWhenCheck } from './reducePossibleStepsWhenCheck'

const checkCheckmate = (square: string[][], possibleNextEnemySteps: calculateNextEnemyStepsReturn[], possibleKingSteps: number[][] | undefined, check: boolean, possibleNextStepsAllOwnFigures: calculateNextEnemyStepsReturn[], pathsWichCauseCheck: (number[] | number[][])[][] | undefined, setFiguresWichCanMoveWhenCheck: React.Dispatch<React.SetStateAction<string[] | undefined>>): boolean => {
    const possibleNextEnemyStepsFlat = getPossibleNextEnemyStepsFlat(possibleNextEnemySteps)

    const checkIfKingCanMove = () => possibleKingSteps?.filter(kingStep => !possibleNextEnemyStepsFlat.find(step => kingStep[0] === step[0] && kingStep[1] === step[1])).length === 0
    const figuresWichCanMove = pathsWichCauseCheck?.map(pathWichCauseCheck => (possibleNextStepsAllOwnFigures.filter(obj => obj.possibleSteps.find(possibleNextStep => pathWichCauseCheck?.find(oneStepofPath => oneStepofPath[0] === possibleNextStep[0] && oneStepofPath[1] === possibleNextStep[1])))).map(obj => obj.figure)).flatMap(figuresWichCanMoveWhenCheck => figuresWichCanMoveWhenCheck)

    const checkIfFigureCanMove = (figure: string): boolean => {
        const possition = square.flatMap((row, ir) => row.flatMap((chell, ic) => square[ir][ic] === figure ? [ir, ic] : []))

        console.log(calculateNextSteps(square, possition[0], possition[1], possibleNextEnemySteps, false))

        return reducePossibleStepsWhenCheck(pathsWichCauseCheck, calculateNextSteps(square, possition[0], possition[1], possibleNextEnemySteps, false).flatMap(stepsPerPath => stepsPerPath))?.length !== 0
    } 
    
    const figuresWichCanMoveWhenCheck: string[] | undefined = figuresWichCanMove?.filter(figuresWichCanMove => checkIfFigureCanMove(figuresWichCanMove))

    setFiguresWichCanMoveWhenCheck(figuresWichCanMoveWhenCheck)

    if(check && checkIfKingCanMove() && figuresWichCanMoveWhenCheck?.length === 0) {
        return true
    }   
    return false
}

export { checkCheckmate }