import React from "react";
import DayListItem from "DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;
  const outputs = days.map(day => {
    return (
      <ul>
        <DayListItem
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay} />
      </ul>
    );
  })
  return outputs;

}
