import React, { useState } from 'react'
import './App.css'
import { startSquare } from './utilities/startSquare'
import whiteRooks from './icons/White-Rooks.png'
import whiteKnights from './icons/White-Knights.png'
import whiteBishops from './icons/White-Bishops.png'
import whiteKing from './icons/White-King.png'
import whiteQueen from './icons/White-Queen.png'
import whitePawns from './icons/White-Pawns.png'

function App() {

  const [square, setSquare] = useState(startSquare)
  const [selecting, setSelecting] = useState(true)
  const [selectedFigure, setSelectedFigure] = useState<string>('')
  const [previousValue, setPreviousValue] = useState<number[] | undefined>()

  const handelClick = (field: string, ri: number, fi: number) => {
    if (selecting) {
      setSelectedFigure(field)
      setSelecting(false)
      setPreviousValue([ri, fi])
    } else if (!selecting && previousValue !== undefined) {
      setSquare((oldlist) => {
        oldlist[ri][fi] = selectedFigure
        oldlist[previousValue[0]][previousValue[1]] = '0'
        return oldlist
      })
      setSelecting(true)
    }
  }

  return (
    <div className='FlexContainer'>
      <div className='Legende'>
        <h1>Legende</h1>
        <ol className='List'>
          <li>Pawns</li>
          <li>Knights</li>
          <li>Bishops</li>
          <li>Rooks</li>
          <li>Queen</li>
          <li>King</li>
        </ol>
      </div>
      <div className='Square'>
        <h1 className='Heading'>Chess</h1>
        <table className='Table'>
          {square.map((rows, ri) =>
            <tr>{rows.map((field, fi) => 
              <td className='TableData' onClick={event => handelClick(field, ri, fi)}>
                {
                  /14./.test(field) ? <img src={whiteRooks} width="80" height="80" /> : 
                  /12./.test(field) ? <img src={whiteKnights} width="80" height="80" /> : 
                  /13./.test(field) ? <img src={whiteBishops} width="80" height="80" /> : 
                  /16./.test(field) ? <img src={whiteKing} width="80" height="80" /> : 
                  /15./.test(field) ? <img src={whiteQueen} width="80" height="80" /> : 
                  /11./.test(field) ? <img src={whitePawns} width="80" height="80" /> : 
                  null
                } 
              </td>)}
            </tr>)}
        </table>
      </div>
    </div>
  );
}

export { App }