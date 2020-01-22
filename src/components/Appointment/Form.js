import React, { useState } from 'react';
import InterviewerList from '../InterviewerListItem';
import Button from '../Button';

export default function Form(props) {
  const [state, setState] = useState({
    name:'',
    interviewer:''
  })
  const setName = name => setState({ ...state, name });
  const setInterviewer = interviewer => setState({ ...state, interviewer})

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            onChange={(e) => setName(e.target.value)}
            className="appointment__create-input text--semi-bold"
            name={state.name}
            type="text"
            placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList 
        interviewers={props.interviewers} 
        value={props.interviewer} 
        onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger>Cancel</Button>
          <Button confirm>Save</Button>
        </section>
      </section>
    </main>

  )
}