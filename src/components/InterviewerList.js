import React from "react";
import InterviewerListItem from "InterviewerItemList";
import '../styles/interviewerList'

export default function InterviewList(props) {
  const { interviewers, setInterviewer} = props;
  const outputs = interviewers.map(interviewer => {
    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--lght">{interviewer.name}</h4>
        <ul className="interviewers__list">
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.val} 
            selected={interviewer.id === props.interviewer}
            setInterviewer={event => props.onChange(interviewer.id)}/>
        </ul>
      </section>
      )
    })
    return outputs
}