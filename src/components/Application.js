import React, { useEffect, useCallback } from "react";
import axios from 'axios';


import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import { useApplicationData } from '../hooks/useApplicationData';

export default function Application(props) {
  const { state, dispatch, SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAY } = useApplicationData(); //reducer responsible for updating state 
  const getWeeklyAppointments = useCallback((input) => {
    dispatch({ type: SET_APPLICATION_DATA, input })
  }, [SET_APPLICATION_DATA, dispatch])
  /* state contains three main objects: appointments, days, and day
  Appointmnts: information about individual appointment
  days: interviewers available and appointsments on each day
  day: day displayed 
   */
  //Fetches from api on inital render
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
      .then(all => { getWeeklyAppointments(all) })
  }, [getWeeklyAppointments])

  const appointments = getAppointmentsForDay(state, state.day)
  const interviewersList = getInterviewersForDay(state, state.day)
  //dispatches change state upon successful axios
  const setDay = function(input) {
    dispatch({ type: SET_DAY, input })
  }
  const deleteInterview = function(id) {
    const input = { id };
    debugger;
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, input }))
  }
  const bookInterview = function(id, interview) {
    const input = { id, interview }
    return axios.put(`/api/appointments/${input.id}`, {
      interview: {
        student: input.interview.student,
        interviewer: input.interview.interviewer
      }
    })
      .then(() => dispatch({ type: SET_INTERVIEW, input }))
  }
  const appointment = (appointments).map((appointment) => {
    const interviewerProfile = getInterview(state, appointment.interview)
    return (
      <Appointment
        state={state}
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
            state={state}
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
        {appointment}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
