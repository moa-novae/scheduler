import React from "react";
import '../styles/interviewerListItem.scss'

var classNames = require('classnames')
export default function interviewerListItem(props) {
  let interviewClass = classNames('interviewers__item',{
    'interviewers__item--selected': props.selected
  })
  return (
    // on click passes the interview clicked up the componenet 
    <li className={interviewClass} onClick={ () => props.setInterviewer(props.id)}> 
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />

  {props.selected && props.name}
</li>

  )
}

