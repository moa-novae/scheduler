import React, { useEffect, useCallback } from "react";
import axios from 'axios';


import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import {useApplicationData} from '../hooks/useApplicationData';




export default function Application(props) {
  const {state, dispatch, SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAY} = useApplicationData();
  const getWeeklyAppointments = useCallback((input) => {
    dispatch({ type: SET_APPLICATION_DATA, input })
  }, [SET_APPLICATION_DATA, dispatch])

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
      .then(all => getWeeklyAppointments(all))
  },[getWeeklyAppointments])

  const appointments = getAppointmentsForDay(state, state.day)
  const interviewersList = getInterviewersForDay(state, state.day)

  const setDay = function(input) {
    dispatch({ type: SET_DAY, input })
  }

  const deleteInterview = function(id) {
    const input = {id}
    return axios.delete(`/api/appointments/${input.id}`)
    .then (dispatch({ type: SET_INTERVIEW, input }))

  }

  const bookInterview = function(id, interview) {
    const input = { id, interview }
    return axios.put(`/api/appointments/${input.id}`, {
      interview: {
        student: input.interview.student,
        interviewer: input.interview.interviewer
      }
    })
      .then(dispatch({ type: SET_INTERVIEW, input }))
  
  }




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
