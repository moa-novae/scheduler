import { useReducer } from "react";

export function useApplicationData() {
  const SET_DAY = 'SET_DAY'
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA'
  const SET_INTERVIEW = 'SET_INTERVIEW'
  const reducer = function(state, action) {
    const { type, input } = action;

    const SET_DAY = function(value) {
      return { ...state, day: value }
    }

    const SET_APPLICATION_DATA = function(value) {
      return ({ ...state, "days": value[0], "appointments": value[1], "interviewers": value[2] })
    }

    const SET_INTERVIEW = function(value) {
      if (value.interview) {
        const appointment = {
          ...state.appointments[value.id],
          interview: { ...value.interview }
        };
        return ({
          ...state,
          appointments: { ...state.appointments, [value.id]: appointment }
        })

      } else {
        const appointment = {
          ...state.appointments[value.id],
          interview: null
        }
        return ({
          ...state, appointments: { ...state.appointments, [value.id]: appointment }
        })
      }
    }

    const cases = {
      SET_DAY,
      SET_APPLICATION_DATA,
      SET_INTERVIEW,

    }
    return (cases[type] || (() => { throw new Error() }))(input);
  }
  const initState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }
  const [state, dispatch] = useReducer(reducer, initState)
  return { state, dispatch, SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW }
}



