import axios from 'axios';
import * as types from './action-types';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {type: types.MOVE_CLOCKWISE} /* no payload shown in redux devtools */
} /* Use a ternary like {if current index == 5 ? set current = 0 : return current index +1} */

export function moveCounterClockwise() {
  return {type: types.MOVE_COUNTERCLOCKWISE} /* no payload shown in redux devtools */
} /* Use a ternary like {if current index == 0 ? set current = 5 : return current index -1} */

export function selectAnswer() {
  return {type: types.SET_QUIZ_INTO_STATE}
}

export function setMessage() {
  return {type: types.SET_INFO_MESSAGE}
}

export function setQuiz() {
  return {type: types.SET_QUIZ_INTO_STATE, payload: {/*  */}} 
}

export function inputChange({id, value}) {
  return {
    type: types.INPUT_CHANGE, payload: {id, value}} /* payload contains: inputID (evt.target.id) + value (evt.target.value) */
}

export function resetForm() {
  return {type: types.RESET_FORM}
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
        dispatch({type: types.SET_QUIZ_INTO_STATE, payload: res.data})
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
    // post url = http://localhost:9000/api/quiz/answer
    // post success payload {'quiz_id', 'answer_id'}
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    // post url = http://localhost:9000/api/quiz/new
    // post success payload {'question_text', 'true_answer_text', 'false_answer_text}
  }
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
