import React, { useState, useEffect } from "react";
import axios from 'axios';


import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from 'components/Appointment/index';
import {getAppointmentsForDay} from '../helpers/selectors'


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days')
        .then(response => response.data)
        .catch(function(error) {
          console.log(error);
        }),
      axios.get('/api/appointments')
        .then(response => response.data)
        .catch(function(error) {
          console.log(error);
        })
    ])
      .then(all => {
        setState(prev => ({ ...prev, "days": all[0], "appointments": all[1] }))
      });
  }, [])
  
    const appointments = getAppointmentsForDay(state, state.day)
    const appoint = (appointments).map((appointment) => {
      return (
        <Appointment
          id={appointment.id}
          time={appointment.time}
          interview={appointment.interview} />
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
