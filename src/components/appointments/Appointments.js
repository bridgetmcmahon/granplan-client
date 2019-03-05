import React, { Component } from 'react';
import Appointment from './Appointment';
import firebase from '../../Firebase';

import { Link } from 'react-router-dom';

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push('/login');
      }
    })
  };

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments = () => {
    const appointmentsData = firebase.database().ref('appointments').orderByChild('date');

    appointmentsData.on('value', (snapshot) => {
      this.setState({
        appointments: snapshot.val(),
      });
    });
  }

  orderAppointments = () => {
    const appointments = [this.state.appointments];

    appointments.sort((a, b) => {
      return (new Date(a.date) - (new Date(b.date)));
    });

    console.log(appointments);
    // doesn't work yet
  }

  deleteAppointment = (id) => {
    firebase.database().ref('appointments').child(id).remove();
    this.fetchAppointments();
  };

  nominateFamilyMember = (id, user) => {
    const appointmentData = {
      family_member: user,
    }

    let updates = {}
    updates[`/${ id }`] = appointmentData;

    firebase.database().ref('appointments').update(updates);
  }

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
