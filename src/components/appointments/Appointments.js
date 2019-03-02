import React, { Component } from 'react';
import Appointment from './Appointment';

class Appointments extends Component {
  constructor() {
    super();
    this.state = {
      appointments: [
        {
          id: 1,
          name: "Doctor's appointment",
          date: "23rd March 2019",
          location: "Brisbane",
        },
        {
          id: 2,
          name: "Doctor's appointment",
          date: "5th April 2019",
          location: "Brisbane",
        },
        {
          id: 3,
          name: "Breakfast",
          date: "6th April 2019",
          location: "Brisbane",
        },
      ]
    };
  };

  deleteAppointment = (id) => {
    const { appointments } = this.state;

    const newAppointments = appointments.filter(appointment => appointment.id !== id);

    this.setState({
      appointments: newAppointments,
    })
  };

  render() {
    const { appointments } = this.state;

    return (
      <React.Fragment>
        <h1>All Appointments</h1>
        { appointments.map(appointment => (
          <Appointment
            key={ appointment.id }
            appointment={ appointment }
            deleteClickHandler={ this.deleteAppointment.bind(this, appointment.id) }
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Appointments;
