import { calculateNextSteps } from './calculateNextSteps'

function getPathWichCauseCheck (square: string[][], positionEnemyKing: number[], positionFigureWichCauseCheck: number[][], figuresWichCauseCheck: string[]) {
    
    return figuresWichCauseCheck.map((figureWichCauseCheck, i) => {
        if(/.3./.test(figureWichCauseCheck) || /.4./.test(figureWichCauseCheck) || /.5./.test(figureWichCauseCheck)) {
            const allMovesFromfigureWichCauseCheck = calculateNextSteps(square, positionFigureWichCauseCheck[i][0], positionFigureWichCauseCheck[i][1], [], false).map(steps => steps.filter(step => step[0] !== undefined && step[1] !== undefined))
            return [...allMovesFromfigureWichCauseCheck.filter(oneDirectionFromfigureWichCauseCheck => oneDirectionFromfigureWichCauseCheck.find(oneStep => oneStep[0] === positionEnemyKing[0] && oneStep[1] === positionEnemyKing[1])).flatMap(obj => obj), [positionFigureWichCauseCheck[0], positionFigureWichCauseCheck[1]]].filter(step => !(step[0] === positionEnemyKing[0] && step[1] === positionEnemyKing[1]))
        } else {
            return [[positionFigureWichCauseCheck[0], positionFigureWichCauseCheck[1]]]
        }
    })    
}

export { getPathWichCauseCheck }