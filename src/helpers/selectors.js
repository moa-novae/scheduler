

//outputs array containing appointment objects
export function getAppointmentsForDay (state, day) {
  let filteredDay = state.days.filter(entry => entry.name === day)
  let appointmentList = filteredDay[0] ? filteredDay[0].appointments : null;
  let output = [];
  if (appointmentList) {
    for (let appointment in state.appointments) {

      if (appointmentList.some((day) => day === state.appointments[appointment].id)) {
        output.push(state.appointments[appointment]);
      }
    }
  }

  return output;
}

export function getInterview (state, app) {
  if (app){
    const interviewerId = app.interviewer
    let profile = state.interviewers[interviewerId]
    return { ...app, interviewer: profile };
  } else {
    return null;
  }
}


export function getInterviewersForDay (state, day) {
  let filteredDay = state.days.filter(entry => entry.name === day)
  let interviewersList = filteredDay[0] ? filteredDay[0].interviewers : null;
  let output = [];
  if (interviewersList) {
    for (let interviewer in state.interviewers) {
      const int = parseInt(interviewer)
      if (interviewersList.some((id) => id === int)) {
        output.push(state.interviewers[interviewer]);
      }
    }
  }

  return output;
}