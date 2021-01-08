import React, { useState } from 'react'
import './App.css'
import { startSquare } from './utilities/startSquare'

function App() {

  const [square, setSquare] = useState(startSquare)
  const [selecting, setSelecting] = useState(true)
  const [selectedFigure, setSelectedFigure] = useState('')

  const handelClick = (field: string, ri: number, fi: number) => {

      if(selecting) {
        setSelectedFigure(field)
        setSelecting(false)
      } else if (!selecting) {
        let newSquare = [...square]
        newSquare[ri][fi] = selectedFigure
        setSquare(newSquare)
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
          <tr>{rows.map((field, fi)=> <td className='TableData' onClick={event => handelClick(field, ri, fi)}>{field}</td>)}</tr>)
          }
        </table>
      </div>
    </div>
  );
}

export { App }