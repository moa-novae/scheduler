export const SET_DAY = 'SET_DAY'
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA'
export const SET_INTERVIEW = 'SET_INTERVIEW'

export default function reducer (state, action) {
    const { type, input } = action;
    const SET_SPOTS_LEFT = function(update) {
      let days = update.days
      let tally = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
      for (let id in update.appointments) {
        if (!update.appointments[id].interview) {
          for(let day of days){
            if(day.appointments.includes(parseInt(id))){
              tally[days.indexOf(day)]++;
            }
          }
        }
      }
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
        }
      } else {
        appointment = {
          ...state.appointments[value.id],
          interview: null
        }}
        let update = {
          ...state,
          appointments: { ...state.appointments, [value.id]: appointment }
        }
        const newState = SET_SPOTS_LEFT(update);
        return (newState)
      
    }
    const cases = {
      SET_DAY,
      SET_APPLICATION_DATA,
      SET_INTERVIEW,
      SET_SPOTS_LEFT
    }
    return (cases[type] || (() => { throw new Error('tried to reduce with unsupported action type') }))(input);
  }






