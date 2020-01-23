

//outputs array containing appointment objects
export function getAppointmentsForDay (state, day) {
  let filteredDay = state.days.filter(entry => entry.name === day)
  let appointmentList = filteredDay[0] ? filteredDay[0].appointments : null;
  //console.log(filteredDay[0].appointments)
  let output = [];
  if (appointmentList) {
    for (let appointment in state.appointments) {

      if (appointmentList.some((day) => day === state.appointments[appointment].id)) {
        output.push(state.appointments[appointment]);
      }
    }
  }
  console.log(output)
  return output;
}

