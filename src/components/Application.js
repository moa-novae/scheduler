import React, { useState, useEffect } from "react";
import axios from 'axios';


import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import useApplicationData from '../hooks/useApplicationData';





export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewersList = getInterviewersForDay(state, state.day)


  const appoint = (appointments).map((appointment) => {
    const interviewerProfile = getInterview(state, appointment.interview)

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interviewerProfile}
        interviewers={interviewersList}
        bookInterview={bookInterview}
        deleteInterview={cancelInterview}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu" >
          <DayList
            days={state.days}
            day={state.day}
            appointments={state.appointments}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appoint}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
