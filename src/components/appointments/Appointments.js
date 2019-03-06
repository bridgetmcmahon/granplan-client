import React, { Component } from 'react';
import Appointment from './Appointment';
import firebase from '../../Firebase';

import { Link } from 'react-router-dom';

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      searchTerm: '',
    };

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push('/login');
      }
    })
  };

  _handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments = () => {
    let appointmentsData;

    // Filter data
    if (this.state.searchTerm === '') {
      appointmentsData = firebase.database().ref('appointments').orderByChild('date');
    } else {
      appointmentsData = firebase.database().ref('appointments').orderByChild('patient').equalTo(this.state.searchTerm)
    }

    appointmentsData.on('value', (snapshot) => {
    //   let snap = snapshot.val();
    //   console.log(snap);
    //   let appointmentsArray = Object.keys(snap).map((key) => {
    //     return snap[key];
    //   });
    //
    //   // Order by date
    //   appointmentsArray.sort((a, b) => {
    //     a = new Date(a.date);
    //     b = new Date(b.date);
    //     return a < b ? -1 : a > b ? 1 : 0;
    //   });
    //
      this.setState({
        appointments: snapshot.val(),
      });
    });
  }

  deleteAppointment = (id) => {
    firebase.database().ref('appointments').child(id).remove();
    this.fetchAppointments();
  };

  nominateFamilyMember = (id, user) => {
    const appointmentData = {
      familyMember: user,
    }

    let updates = {}
    updates[`/${ id }`] = appointmentData;

    firebase.database().ref('appointments').update(updates);
  }

  filterAppointments = (e) => {
    e.preventDefault();
    this.fetchAppointments();
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
          <h1>Upcoming Appointments</h1>
          <form onSubmit={ this.filterAppointments } className="form search">
            <input
              type="search"
              name="searchTerm"
              placeholder="Search by patient..."
              onChange={ this._handleInput }
            />
            <input type="submit" value="Search" />
          </form>
          { appointments ? ( Object.keys(appointments).map((key) => (
            <Appointment
              key={ key }
              appointmentKey={ key }
              appointment={ appointments[key] }
              deleteAppointment={ this.deleteAppointment.bind(this, key) }
            />
          )) ) : (<p>No current appointments</p>)}
        </div>
      </div>
    );
  }
}

export default Appointments;
