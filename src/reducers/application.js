export const SET_DAY = 'SET_DAY'
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA'
export const SET_INTERVIEW = 'SET_INTERVIEW'

//helper function that updates spots left for one day
const spotsForDay = function(state, day) {
  const dayIndex = day - 1;
  const updatedSpots = state.days[dayIndex].appointments.filter(appointmentId => {
    return !state.appointments[appointmentId].interview
  })
  return updatedSpots.length;
}

/*Uses object literal to determine which function to run
For example: 
if action.type = SET_SPOTS_LEFT, then run SET_SPOTS_LEFT(action.input)

*/
export default function reducer(state, action) {
  const { type, input } = action;
  //returns updated state with the correct spots left

  //Update the state with the newly selected day on the homepage
  const SET_DAY = function(input) {
    return { ...state, day: input }
  }
  //Update the state with data from the axios calls
  const SET_APPLICATION_DATA = function(input) {
    return ({ ...state, "days": input[0], "appointments": input[1], "interviewers": input[2] })
  }
  //update the state when an appointment is booked/edited/deleted
  const SET_INTERVIEW = function(input) {
    const appointment = {
      ...state.appointments[input.id],
      interview: input.interview
    }
    const stateWithInaccurateSpots = {
      ...state,
      appointments: { ...state.appointments, [input.id]: appointment }
    }
    //maps over the old state, updating each day with the correct spot
    const newDaysState = stateWithInaccurateSpots.days.map(day => ({ ...day, spots: spotsForDay(stateWithInaccurateSpots, day.id) }));
    return ({ ...stateWithInaccurateSpots, days: newDaysState })
  }
  //object literal used for determining which function to run 
  const reducerAction = {
    SET_DAY,
    SET_APPLICATION_DATA,
    SET_INTERVIEW,
  }
  const nextStateFunction = reducerAction[type]
  if (!nextStateFunction) {
    throw new Error('tried to reduce with unsupported action type')
  }
  return nextStateFunction(input); //throw error if the requested reducer function does not exist
}






