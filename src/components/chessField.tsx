import '../App.css'
import {  whiteRooks, whiteKnights, whiteBishops, whiteKing, whiteQueen, whitePawns,
    blackRooks, blackKnights, blackBishops, blackKing, blackQueen, blackPawns } from '../icons'
    
interface chessFieldProps {
    square: string[][],
    isBlackNext: boolean,
    possibleNextSteps: number[][] | undefined,
    possibleNextEnemySteps: number[][] | undefined,
    checkmate: boolean,
    selectedFigure: string | undefined,
    selecting: boolean,
    handelClick: (field: string, ri: number, fi: number) => void
}

function ChessField(props: chessFieldProps)  {

    return (
        <div className='Square'>
        <h1 className='Heading'>{props.checkmate && props.isBlackNext ? 'White has won!' : props.checkmate && !props.isBlackNext ? 'Black has won!' : 'Chess'}</h1>
        <table className='Table'>
            {props.square.map((rows, ri) =>
            <tr>{rows.map((field, fi) =>
                <td className='TableData' onClick={event =>     !props.checkmate &&
                                                                (props.possibleNextSteps?.some((possibleNextStep) => possibleNextStep[0] === ri && possibleNextStep[1] === fi)  // Check if current field is one of the next possible steps
                                                                || (props.selecting === true && (props.isBlackNext && /2../.test(field) || !props.isBlackNext && /1../.test(field))) // Check if player have to select a figur and check if black or white is next
                                                                || props.selectedFigure === field) // Check if player want to unselect a figure
                                                                ? props.handelClick(field, ri, fi) : undefined}
                    style={props.possibleNextSteps?.some((possibleNextStep) => possibleNextStep[0] === ri && possibleNextStep[1] === fi) ? { background: 'blue' } : // possible next Steps
                    props.selectedFigure === field && field !== '0' ? { background: 'yellow' } : // selected figure
                    props.possibleNextEnemySteps?.some((possibleNextEnemyStep) => possibleNextEnemyStep[0] === ri && possibleNextEnemyStep[1] === fi) ? { background: 'red' } : undefined}>
                    {
                    // white
                    /14./.test(field) ? <img src={whiteRooks} width="80" height="80" /> : 
                    /12./.test(field) ? <img src={whiteKnights} width="80" height="80" /> : 
                    /13./.test(field) ? <img src={whiteBishops} width="80" height="80" /> : 
                    /16./.test(field) ? <img src={whiteKing} width="80" height="80" /> : 
                    /15./.test(field) ? <img src={whiteQueen} width="80" height="80" /> : 
                    /11./.test(field) ? <img src={whitePawns} width="80" height="80" /> : 
                    // black
                    /24./.test(field) ? <img src={blackRooks} width="80" height="80" /> : 
                    /22./.test(field) ? <img src={blackKnights} width="80" height="80" /> : 
                    /23./.test(field) ? <img src={blackBishops} width="80" height="80" /> : 
                    /26./.test(field) ? <img src={blackKing} width="80" height="80" /> : 
                    /25./.test(field) ? <img src={blackQueen} width="80" height="80" /> : 
                    /21./.test(field) ? <img src={blackPawns} width="80" height="80" /> :
                    null
                    } 
                    </td>)}
                </tr>)}
            </table>
        </div>
    )
}

export { ChessField }