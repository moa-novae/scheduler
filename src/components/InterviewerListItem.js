import React from "react";
import '../styles/interviewerListItem.scss'
var classNames = require('classnames')

export default function interviewerListItem(props) {

  let interviewClass = classNames('interviewers__item',{
    'interviewers__item--selected': props.selected
  })
  
  return (
    <li className={interviewClass} onClick={ props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>

  )
}

