import React, { Component } from 'react';
import Appointment from './Appointment';
import firebase from '../../Firebase';

import { Link } from 'react-router-dom';

class Appointments extends Component {
  constructor() {
    super();
    this.state = {
      appointments: [
        // {
        //   id: 1,
        //   patient: 'Aileen',
        //   purpose: "Doctor's appointment",
        //   date: "23rd March 2019",
        //   location: "Brisbane",
        //   notes: '',
        //   family_member: 'Anne',
        // },
        // {
        //   id: 2,
        //   patient: 'Aileen',
        //   purpose: "Doctor's appointment",
        //   date: "5th April 2019",
        //   location: "Brisbane",
        //   notes: '',
        //   family_member: 'Donna',
        // },
        // {
        //   id: 3,
        //   patient: 'Aileen',
        //   purpose: "Social",
        //   date: "6th April 2019",
        //   location: "Brisbane",
        //   notes: '',
        //   family_member: 'Donna',
        // },
      ]
    };
  };

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments = () => {
    const appointmentsData = firebase.database().ref().child('appointments');
    appointmentsData.on('value', (snapshot) => {
      this.setState({
        appointments: snapshot.val(),
      });
    });
  }

  // deleteAppointment = (id) => {
  //   const { appointments } = this.state;
  //
  //   const newAppointments = appointments.filter(appointment => appointment.id !== id);
  //
  //   this.setState({
  //     appointments: newAppointments,
  //   });
  // };

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
          { Object.keys(appointments).map((key) => (
            <Appointment
              key={ key }
              appointment={ appointments[key] }
              // deleteClickHandler={ this.deleteAppointment.bind(this, appointment.id) }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Appointments;
