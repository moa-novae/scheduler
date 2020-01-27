import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';
import Confirm from './Confirm'

export default function Form(props) {
  const [state, setState] = useState({
    name: '',
    interviewer: props.interviewer
  })
  const [name, setName] = useState(prev => props.interview.student || "");
  const [interviewer, setInterviewer] = useState(prev => props.interview.interviewer.id || null);
  const reset = () => {setName(''); setInterviewer(null)}
  const cancel = () => {reset(); props.onCancel(); }
  console.log('name', name, 'interviewer', interviewer)
  console.log('interview', props.interview)
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"  onSubmit={event => event.preventDefault()}>
          <input
            onChange={(e) => setName(e.target.value) }
            className="appointment__create-input text--semi-bold"
            value={name || ''}
            type="text"
            placeholder="Enter Student name"
  
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer || null}
          setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ ()=> cancel() }>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>

  )
}