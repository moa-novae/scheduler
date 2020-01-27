import React, { useState, useEffect } from "react";
import axios from 'axios';


import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import useVisualMode from '../hooks/userVisualMode';
import { resolvePlugin } from "@babel/core";




export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return new Promise(function(resolve, reject) {
      axios.put(`/api/appointments/${id}`, {
        interview: {
          student: interview.student,
          interviewer: interview.interviewer
        }
      })
        .then(
          setState(state => ({
            ...state,
            appointments: { ...state.appointments, [id]: appointment }

          }))
        )
        .then(resolve('done'));
    })
  }
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    return new Promise(function(resolve, reject) {
      axios.delete(`/api/appointments/${id}`)
      .then(
        setState(state => ({
          ...state,
          appointments: { ...state.appointments, [id]: appointment}
        }))
      )
      .then(resolve('done'));
    })
  }


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
        }),
      axios.get('/api/interviewers')
        .then(response => response.data)
        .catch(function(error) {
          console.log(error);
        })
    ])
      .then(all => {
        setState(prev => ({ ...prev, "days": all[0], "appointments": all[1], "interviewers": all[2] }))
      });
  }, [])

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
        deleteInterview={deleteInterview}
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
