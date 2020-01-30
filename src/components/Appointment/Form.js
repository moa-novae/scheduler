import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {
  const [name, setName] = useState(prev => props.interview.student || "");
  const [error, setError] = useState(prev => '')
  const [interviewer, setInterviewer] = useState(prev => {
    if (props.interview.interviewer) {
      return props.interview.interviewer.id
    } else { return null }
  });
  const reset = () => { setName(''); setInterviewer(null) }
  const cancel = () => { reset(); props.onCancel(); }
  
  //console.log('name', name, 'interviewer', interviewer)
  //console.log('interview', props.interview)
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            onChange={(e) => setName(e.target.value)}
            className="appointment__create-input text--semi-bold"
            value={name || ''}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer || null}
          setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => {setError(''); cancel()}}>Cancel</Button>
          <Button confirm onClick={() => { if (!name) { setError('Student name cannot be blank') } else { props.onSave(name, interviewer); setError('') } }}>Save</Button>
        </section>
      </section>
    </main>

  )
}