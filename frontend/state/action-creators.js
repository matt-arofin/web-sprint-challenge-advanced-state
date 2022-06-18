import axios from 'axios';
import { 
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from './action-types'
// import * as actions from './action-types'; /* Actions types as variables assigned to strings */

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {type: MOVE_CLOCKWISE}
 } /* Use a ternary like {if current index == 5 ? set current = 0 : return current index +1} */

export function moveCounterClockwise() {
  return {type: MOVE_COUNTERCLOCKWISE}
} /* Use a ternary like {if current index == 0 ? set current = 5 : return current index -1} */

export function selectAnswer() {
  return {type: SET_QUIZ_INTO_STATE}
}

export function setMessage() {
  return {type: SET_INFO_MESSAGE}
}

export function setQuiz() {
  // return {type: SET_QUIZ_INTO_STATE, payload: action.payload} ??
}

export function inputChange() {
  return {type: INPUT_CHANGE, payload: {/* inputId, value */}} /* payload contains: inputID (evt.target.id) + value (evt.target.value) */
}

export function resetForm() {
  return {type: RESET_FORM}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        console.log('Fetch quiz action: ', res)
        dispatch({type: SET_QUIZ_INTO_STATE, payload: res.data.result})
      })
      .catch(err => console.error({err}))
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
