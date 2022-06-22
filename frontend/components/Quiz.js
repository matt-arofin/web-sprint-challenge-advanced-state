import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function Quiz(props) {
  
  const {quiz, fetchQuiz } = props
  console.log('Quiz state change: ', quiz, quiz == true)
  console.log(props)
  useEffect(() => fetchQuiz(), [])
  // console.log('quiz set into state', quiz)

  const handleSelected = evt => {
    const {selectAnswer} = props
    console.log(evt.target)
    selectAnswer(evt.target.id)
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    const {postAnswer, quiz_id, selectedAnswer} = props
    console.log(evt.target)
    postAnswer(quiz_id, selectedAnswer)
    fetchQuiz()
  }

  return (
    <div id="wrapper">
      { 
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            {console.log(quiz)}
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                {quiz.answers[0].text}
                <button id={quiz.answers[0].answer_id} onClick={handleSelected}>
                  {props.selectedAnswer == quiz.answers[0].answer_id ? "SELECTED" : "select"}
                </button>
              </div>

              <div className="answer">
              {quiz.answers[1].text}
                <button id={quiz.answers[1].answer_id} onClick={handleSelected}>
                {props.selectedAnswer == quiz.answers[1].answer_id ? "SELECTED" : "select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={handleSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...' 
      }
    </div>
  )
}

export default connect(st => st, actions) (Quiz)
