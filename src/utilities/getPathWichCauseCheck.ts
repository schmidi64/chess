import { calculateNextSteps } from './calculateNextSteps'

function getPathWichCauseCheck (square: string[][], positionEnemyKing: number[], positionFigureWichCauseCheck: number[]) {
    const figureWichCauseCheck = square[positionFigureWichCauseCheck[0]][positionFigureWichCauseCheck[1]]
    const allMovesFromfigureWichCauseCheck = calculateNextSteps(square, positionFigureWichCauseCheck[0], positionFigureWichCauseCheck[1], [], false)

    return [[0,0]]
    
}


export { getPathWichCauseCheck }