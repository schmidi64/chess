import '../App.css'
import {  whiteRooks, whiteKnights, whiteBishops, whiteKing, whiteQueen, whitePawns,
    blackRooks, blackKnights, blackBishops, blackKing, blackQueen, blackPawns } from '../icons'
    
interface chessFieldProps {
    square: string[][],
    isBlackNext: boolean,
    possibleNextSteps: number[][] | undefined,
    checkmate: boolean,
    check: boolean,
    selectedFigure: string | undefined,
    selecting: boolean,
    figuresWichCanMoveWhenCheck: string[] | undefined
    handelClick: (field: string, ri: number, fi: number) => void
}

function ChessField(props: chessFieldProps)  {

    return (
        <div className='Square'>
        <h1 className='Heading'>{!props.checkmate && props.check && props.isBlackNext ? 'Black is in check!' : !props.checkmate && props.check && !props.isBlackNext ? 'White is in check!' : props.checkmate && props.isBlackNext ? 'White has won!' : props.checkmate && !props.isBlackNext ? 'Black has won!' : 'Chess'}</h1>
        <table className='Table'>
            {props.square.map((rows, ri) =>
            <tr>{rows.map((field, fi) =>
                <td className='TableData' onClick={event =>     !props.checkmate &&
                                                                (props.check && props.figuresWichCanMoveWhenCheck?.find(figure => figure === field) // check if check === true and if a figure can beat the cause of check
                                                                || props.possibleNextSteps?.some((possibleNextStep) => possibleNextStep[0] === ri && possibleNextStep[1] === fi)  // Check if current field is one of the next possible steps
                                                                || (!props.check && props.selecting === true && (props.isBlackNext && /2../.test(field) || !props.isBlackNext && /1../.test(field))) // Check if player have to select a figur and check if black or white is next
                                                                || props.selectedFigure === field) // Check if player want to unselect a figure
                                                                ? props.handelClick(field, ri, fi) : undefined}
                    style={props.possibleNextSteps?.some((possibleNextStep) => possibleNextStep[0] === ri && possibleNextStep[1] === fi) ? { background: 'blue' } : // possible next Steps
                    props.selectedFigure === field && field !== '0' ? { background: 'yellow' } : undefined // selected figure
                    }> 
                    {
                    // white
                    /14./.test(field) ? <img src={whiteRooks} alt="W4" width="80" height="80" /> : 
                    /12./.test(field) ? <img src={whiteKnights} alt="W2" width="80" height="80" /> : 
                    /13./.test(field) ? <img src={whiteBishops} alt="W3" width="80" height="80" /> : 
                    /16./.test(field) ? <img src={whiteKing} alt="W6" width="80" height="80" /> : 
                    /15./.test(field) ? <img src={whiteQueen} alt="W5" width="80" height="80" /> : 
                    /11./.test(field) ? <img src={whitePawns} alt="W1" width="80" height="80" /> : 
                    // black
                    /24./.test(field) ? <img src={blackRooks} alt="W4" width="80" height="80" /> : 
                    /22./.test(field) ? <img src={blackKnights} alt="B2" width="80" height="80" /> : 
                    /23./.test(field) ? <img src={blackBishops} alt="B3" width="80" height="80" /> : 
                    /26./.test(field) ? <img src={blackKing} alt="B6" width="80" height="80" /> : 
                    /25./.test(field) ? <img src={blackQueen} alt="B5" width="80" height="80" /> : 
                    /21./.test(field) && <img src={blackPawns} alt="B1" width="80" height="80" /> 
                    } 
                    </td>)}
                </tr>)}
            </table>
        </div>
    )
}

export { ChessField }