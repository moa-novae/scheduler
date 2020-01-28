import React from "react";
import DayListItem from "DayListItem";

export default function DayList(props) {
  const { days } = props;
  let outputs;
  if (days) {
    outputs = days.map(element => {
      return (
        <ul>
          <DayListItem
            name={element.name}
            spots={element.spots}
            selected={element.name === props.day}
            setDay={props.setDay} />
        </ul>
      );
    })
  }
  return outputs;

}
