import axios from 'axios';
import * as types from './action-types';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {type: types.MOVE_CLOCKWISE} /* no payload shown in redux devtools */
} /* Use a ternary like {if current index == 5 ? set current = 0 : return current index +1} */

export function moveCounterClockwise() {
  return {type: types.MOVE_COUNTERCLOCKWISE} /* no payload shown in redux devtools */
} /* Use a ternary like {if current index == 0 ? set current = 5 : return current index -1} */

export function selectAnswer(answer_id) {
  return {type: types.SET_QUIZ_INTO_STATE, payload: answer_id}
  /* Correct answer info message payload: 'Nice job! That was the correct answer */
  /* Incorrect answer info message payload: 'What a shame! That was the incorrect answer */
}

export function setMessage() {
  console.log('Heres the message being set: ')
  return {type: types.SET_INFO_MESSAGE/* , payload: `Congrats: "${form.newQuestion}" is a great question!` */}
}

export function setQuiz() {
  return {type: types.SET_QUIZ_INTO_STATE} 
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
export function postAnswer({questionId, answerId}) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    // post url = http://localhost:9000/api/quiz/answer
    // post success payload {'quiz_id', 'answer_id'}
    axios.post('http://localhost:9000/api/quiz/answer', {'quiz_id': questionId, 'answer_id': answerId})
      .then(res => console.log('Response from successful answer post: ', res))
      .catch(err => console.error(err))
  }
}

export function postQuiz(form) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    // console.log({form})
    axios.post('http://localhost:9000/api/quiz/new', {"question_text": form.newQuestion, "true_answer_text": form.newTrueAnswer, "false_answer_text": form.newFalseAnswer})
      .then(res => {
        console.log('postQuiz success: ', res)
        const newQuestion = res.data
        // dispatch({type: types.SET_QUIZ_INTO_STATE, payload: newQuestion})
        // console.log('dispatching successful newQuestion post here:', {type: types.SET_INFO_MESSAGE, payload: `Congrats: ${newQuestion.newQuestion} is a great question!`})
        dispatch({type: types.SET_INFO_MESSAGE, payload: `Congrats: "${newQuestion.question}" is a great question!`})
        dispatch({type: types.RESET_FORM})
      })
      .catch(err => console.error(err))
    // post url = http://localhost:9000/api/quiz/new
    // post success payload {'question_text', 'true_answer_text', 'false_answer_text}
    // Data shape : {
    // "question_text": "love js?",
    // "true_answer_text": "yeah!",
    //  "false_answer_text": "nah..."
    // }
  }
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
