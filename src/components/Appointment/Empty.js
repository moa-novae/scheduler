import React from "react";

//Displays plus sign when appointment is not booked
export default function Empty(props) {
  return (
    <main className="appointment__add">
    <img
      className="appointment__add-button"
      src="images/add.png"
      alt="Add"
      onClick={ props.onAdd }
    />
  </main>  
  )
}