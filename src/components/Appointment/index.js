import './styles.scss';
import React, { useEffect } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm"
import useVisualMode from '../../hooks/userVisualMode';
import Form from './Form'
import Status from './Status'
import Error from './Error'



export default function Appointment(props) {



  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const ERROR_SAVE = 'ERROR_SAVE'
  const ERROR_DELETE = 'ERROR_DELETE'


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => { return transition(SHOW) })
      .catch((error) => transition(ERROR_SAVE, true))
    //console.log('props.interview',props.interview)
  }

  function remove(id) {

    transition(DELETING, true)
    props.deleteInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
    
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
          onEdit={() => transition(CREATE)}
          interview={props.interview}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers}
        interview={props.interview || { student: '', interviewer: null }}
        onCancel={() => back()}
        onSave={save} />}
      {mode === SAVING && <Status message="Saving" />}

      {mode === CONFIRM && <Confirm message="Are you sure you would like to DELETE?" onCancel={() => back()} onConfirm={() => remove(props.id)} />}
      {mode === ERROR_SAVE && <Error message="Error when saving" onClose ={() => back()}/>}
      {mode === ERROR_DELETE && <Error message="Error when deleting" onClose ={() => back()} />}
      {mode === DELETING && <Status message="Deleting" />}


    </article>
  )

}