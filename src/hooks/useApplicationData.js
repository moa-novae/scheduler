import { useReducer } from "react";

export function useApplicationData() {
  const SET_DAY = 'SET_DAY'
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA'
  const SET_INTERVIEW = 'SET_INTERVIEW'
  const SET_SPOTS_LEFT = 'SET_SPOTS_LEFT'
  const reducer = function(state, action) {
    const { type, input } = action;

    const SET_SPOTS_LEFT = function(update) {
      let tally = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
      for (let id in update.appointments) {
        if (!update.appointments[id].interview) {
          let weekNum = Math.floor((id - 1) / 5)
          tally[weekNum]++;

        }
      }
      let days = update.days
      for (let i = 0; i < days.length; i++) {
        days[i].spots = tally[i];
      }
      
      return { ...update, days}
    }

    const SET_DAY = function(value) {
      return { ...state, day: value }
    }

    const SET_APPLICATION_DATA = function(value) {
      return ({ ...state, "days": value[0], "appointments": value[1], "interviewers": value[2] })
    }

    const SET_INTERVIEW = function(value) {
      let appointment;
      if (value.interview) {
        appointment = {
          ...state.appointments[value.id],
          interview: { ...value.interview }
        }} else {
        appointment = {
          ...state.appointments[value.id],
          interview: null
        }}
        let update = {
          ...state,
          appointments: { ...state.appointments, [value.id]: appointment }
        }
        const output = SET_SPOTS_LEFT(update);
        return (output)
      
    }

    const cases = {
      SET_DAY,
      SET_APPLICATION_DATA,
      SET_INTERVIEW,
      SET_SPOTS_LEFT

    }
    return (cases[type] || (() => { throw new Error() }))(input);
  }



  const initState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  }
  const [state, dispatch] = useReducer(reducer, initState)
  return { state, dispatch, SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW }
}



