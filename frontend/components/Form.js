import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  // console.log(props.form)

  const onChange = evt => {
    const {id, value} = evt.target;
    const {inputChange} = props;
    inputChange({id, value});
  }

  const onSubmit = evt => {
    const {postQuiz, form} = props;
    evt.preventDefault();
    console.log(form);
    // postQuiz(form)
  }

  const isDisabled = () => {
    const {form} = props;
    if(form.newQuestion.trim().length < 2 || form.newTrueAnswer.trim().length < 2 ||form.newFalseAnswer.trim().length < 2){
      return true
    } else { return false}
  }

  const {form} = props
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={form.newTrueAnswer}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={form.newFalseAnswer}/>
      <button id="submitNewQuizBtn" disabled={isDisabled()}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
