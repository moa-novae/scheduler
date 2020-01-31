import { useReducer } from "react";
import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from '../reducers/application'
export function useApplicationData() {

  const initState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  }
  const [state, dispatch] = useReducer(reducer, initState)
  
  return { state, dispatch, SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW }
}



