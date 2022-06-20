import React from 'react'
import { connect } from 'react-redux'
// import { wheel } as from '../state/reducer'
import * as actions from '../state/action-creators'

export function Wheel(props) {


  const {moveClockwise, moveCounterClockwise} = props
  console.log("current props", props)

  // write a way to identify all 'cog' elements
  const wheelArray = document.getElementsByClassName('cog');
  console.log(wheelArray)
  // wheelArray.forEach((cog, idx) => {
  //   cog.classList.remove('active');
  //   cog.textContent = ''
  //   if(idx == props.wheel){
  //     cog[idx].textContent = 'B'
  //     cog.classList.add('active')
  //   }
  // })
  // console.log(wheelArray)
  // map over the array created
  
  // map over array/list elements previously identified and first remove active from previous item and append it to the next one

  // if(evt.target.id == 'clockwiseBtn'){
  //   console.log('moveClockwise')
  //   return props.moveClockwise()
  // } else{
  //   return props.moveCounterClockwise()
  // }
  // console.log(evt.target)

  // Display logic to implement
  // {props.wheel == 0 ? 'cog active' : 'cog'}
  // {props.wheel == 0 ? 'B' : ''}

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={props.wheel == 0 ? 'cog active' : 'cog'} style={{ "--i": 0 }}>{props.wheel == 0 ? 'B' : ''}</div>
        <div className={props.wheel == 1 ? 'cog active' : 'cog'} style={{ "--i": 1 }}>{props.wheel == 1 ? 'B' : ''}</div>
        <div className={props.wheel == 2 ? 'cog active' : 'cog'} style={{ "--i": 2 }}>{props.wheel == 2 ? 'B' : ''}</div>
        <div className={props.wheel == 3 ? 'cog active' : 'cog'} style={{ "--i": 3 }}>{props.wheel == 3 ? 'B' : ''}</div>
        <div className={props.wheel == 4 ? 'cog active' : 'cog'} style={{ "--i": 4 }}>{props.wheel == 4 ? 'B' : ''}</div>
        <div className={props.wheel == 5 ? 'cog active' : 'cog'} style={{ "--i": 5 }}>{props.wheel == 5 ? 'B' : ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={moveClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={moveCounterClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st => st, actions) (Wheel)