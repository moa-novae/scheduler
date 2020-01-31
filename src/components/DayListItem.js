import React from "react";
import 'components/DayListItem.scss'
var classNames = require('classnames');


export default function DayListItem(props) {
  function onChange(spots){
    const num = parseInt(spots);
    if (num === 0) {
      return `no spots remaining`
    }
    else if (num === 1) {
      return `${num} spot remaining`
    }
    else if (num > 1) {
      return `${num} spots remaining`
    }
  }
  //broken before set day is called

  const spotString = onChange(props.spots);
  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0

  })
  return (
    <li className={dayClass} data-testid="day" onClick={() =>{console.log('item', props.state);props.setDay(props.name)}}>  
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotString}</h3>
    </li>
  );

}


