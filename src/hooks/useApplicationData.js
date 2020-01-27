import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
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


  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return axios.put(`/api/appointments/${id}`, {
      interview: {
        student: interview.student,
        interviewer: interview.interviewer
      }
    })
      .then(res => {
        setState(state => ({
          ...state,
          appointments: { ...state.appointments, [id]: appointment }
        }))
      }
      )
  }
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {

        setState(state =>
          ({
            ...state,
            appointments: { ...state.appointments, [id]: appointment }
          })
        )
      }
      )
  }


  return ({
    state,
    setDay,
    bookInterview,
    cancelInterview
  })
}