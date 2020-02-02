import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import '../styles/interviewerList.scss'
import PropTypes from 'prop-types';
//componenet containing list of interviewers available
export default function InterviewerList(props) {
  const { interviewers, setInterviewer} = props;
  const outputs = interviewers.map(interviewer => {
    return (
          <InterviewerListItem
            key={interviewer.id}
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
//not sure why propTypes doesn't work
InterviewerList.propTypes = {
  interviewers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })).isRequired,
  setInterviewer: PropTypes.func.isRequired
};