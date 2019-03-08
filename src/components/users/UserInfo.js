import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

import Appointment from '../appointments/Appointment';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: null,
      currentUser: null,
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user.displayName,
        });

        this.fetchAppointments();
      } else {
        this.props.history.push('/');
      }
    })
  }

  fetchAppointments() {
    const appointmentsData = firebase.database().ref('appointments').orderByChild('familyMember').equalTo(this.state.currentUser);

    appointmentsData.on('value', (snapshot) => {
      this.setState({
        appointments: snapshot.val(),
      });
    });
  }

  deleteAppointment = (id) => {
    firebase.database().ref('appointments').child(id).remove();
    this.fetchAppointments();
  }

  render() {
    const { appointments } = this.state;

    return (
      <div className="user-info">
        <h1>My Appointments</h1>
        { appointments ? ( Object.keys(appointments).map((key) => (
          <Appointment
            key={ key }
            appointmentKey={ key }
            appointment={ appointments[key] }
            deleteAppointment={ this.deleteAppointment.bind(this, key) }
          />
        )) ) : null }

        <Link className="link" to='/appointments'>Back to All Appointments</Link>
      </div>
    );
  }
}

export default UserInfo;
