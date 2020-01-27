import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import '../styles/interviewerList.scss'

export default function InterviewList(props) {
  const { interviewers, setInterviewer} = props;
  const outputs = interviewers.map(interviewer => {
  
    return (
          <InterviewerListItem
            id={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar} 
            selected={interviewer.id === props.interviewer}
            setInterviewer={setInterviewer}/>
      )
    })
    return (
      <section className="interviewers">
      <h4 className="interviewers__header text--lght">Interviewer</h4>
      <ul className="interviewers__list">
        {outputs}
      </ul>
      </section>
      
    )
}