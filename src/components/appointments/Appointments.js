import React, { Component } from 'react';
import Appointment from './Appointment';
import firebase from '../../Firebase';

import { Link } from 'react-router-dom';

class Appointments extends Component {
  constructor() {
    super();
    this.state = {
      appointments: [
        {
          id: 1,
          patient: 'Aileen',
          purpose: "Doctor's appointment",
          date: "23rd March 2019",
          location: "Brisbane",
          notes: '',
          family_member: 'Anne',
        },
        {
          id: 2,
          patient: 'Aileen',
          purpose: "Doctor's appointment",
          date: "5th April 2019",
          location: "Brisbane",
          notes: '',
          family_member: 'Donna',
        },
        {
          id: 3,
          patient: 'Aileen',
          purpose: "Social",
          date: "6th April 2019",
          location: "Brisbane",
          notes: '',
          family_member: 'Donna',
        },
      ]
    };
  };

  // componentDidMount() {
  //   let appointments;
  //   const appointmentsData = firebase.database().ref().child('/appointments')
  //   appointmentsData.on('value', function(snapshot) {
  //     appointments = snapshot.val();
  //   });
  //
  //   this.setState({
  //     appointments: [appointments],
  //   });
  //
  //   console.log(this.state.appointments);
  // }

  deleteAppointment = (id) => {
    const { appointments } = this.state;

    const newAppointments = appointments.filter(appointment => appointment.id !== id);

    this.setState({
      appointments: newAppointments,
    });
  };

  render() {
    const { appointments } = this.state;

    return (
      <div>
        <div className="container">
          <div className="new-appointment">
            <Link to="/appointments/new">
              <i className="fas fa-plus"></i>
              <h3>New Appointment</h3>
            </Link>
          </div>
          <h1>All Appointments</h1>
          { appointments.map((appointment) => (
            <Appointment
              key={ appointment.id }
              appointment={ appointment }
              deleteClickHandler={ this.deleteAppointment.bind(this, appointment.id) }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Appointments;
