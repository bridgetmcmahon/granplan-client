import React, { Component } from 'react';
import Appointment from './Appointment';
import firebase from '../../Firebase';

import { Link } from 'react-router-dom';

class Appointments extends Component {
  constructor() {
    super();
    this.state = {
      appointments: [],
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

  deleteAppointment = (id) => {
    firebase.database().ref('appointments').child(id).remove();
    this.fetchAppointments();
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
          { Object.keys(appointments).map((key) => (
            <Appointment
              key={ key }
              appointmentKey={ key }
              appointment={ appointments[key] }
              deleteAppointment={ this.deleteAppointment.bind(this, key) }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Appointments;
