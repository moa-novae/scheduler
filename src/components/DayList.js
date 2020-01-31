import React from "react";
import DayListItem from "DayListItem";

export default function DayList(props) {
  const { days } = props;
  let outputs;
  //console.log('daylist', props.state) broken before daylist
  if (days) {
    outputs = days.map(element => {
      return (
        <ul key={element.name}>
          <DayListItem
            name={element.name}
            spots={element.spots}
            selected={element.name === props.day}
            setDay={props.setDay} 
            state={props.state}
            />
        </ul>
      );
    })
  }
  return outputs;

}
