import React from 'react'
import { connect } from 'react-redux'

export function Message(props) {
  // console.log(props)
  // info message comes from the reducer after something is dispatched here
  return <div id="message">{props.infoMessage}</div>
}



export default connect(st => st) (Message)