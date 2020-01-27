import './styles.scss';
import React, { useEffect } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm"
import useVisualMode from '../../hooks/userVisualMode';
import Form from './Form'
import Status from './Status'


export default function Appointment(props) {



  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    console.log('id',props.id)
    const interview = {
      student: name,
      interviewer
    }

    console.log(props.bookInterview)
    transition(SAVING)
    
    props.bookInterview(props.id, interview)
    .then(transition(SHOW))
    //console.log('props.interview',props.interview)
  }
  
  function remove(id) {
    console.log('id', id)
    props.deleteInterview(id)
    .then(transition(EMPTY))
  }



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={() => save()} />}
      {mode === SAVING && <Status message="Saving" />}

      {mode === CONFIRM && <Confirm message="Are you sure you would like to DELETE?" onCancel={ () => back()} onConfirm={ () => remove(props.id)}/>}

    </article>
  )

}