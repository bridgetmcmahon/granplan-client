import React, { Component } from 'react';
import firebase from '../../Firebase';
// import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';

class AppointmentForm extends Component {
  state = {
    purpose: '',
    patient: '',
    date: '',
    location: '',
    notes: '',
    family_member: '',
    errors: [],
    appointmentsRef: firebase.database().ref('appointments'),
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in the required fields' };
      this.setState({
        errors: errors.concat(error),
      });
      return false;
    } else {
      return true;
    }
  }

  isFormEmpty = ({ purpose, patient, date, location }) => {
    return (!purpose.length || !patient.length || !date.length || !location.length);
  }

  _handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();

    if (this.isFormValid()) {
      this.setState({
        errors: [],
      });

      const appointmentData = {
        purpose: this.state.purpose,
        patient: this.state.patient,
        date: this.state.date,
        location: this.state.location,
        notes: this.state.notes,
        family_member: this.state.family_member
      };

      if (this.props.match.params.id) {
        this.editAppointment(appointmentData);
      } else {
        this.addNewAppointment(appointmentData);
      }

      this.props.history.push('/appointments');
    }
  }

  addNewAppointment(appointmentData) {
    const newAppointmentKey = this.state.appointmentsRef.push().key;

    let updates = {};
    updates['/' + newAppointmentKey] = appointmentData;

    this.state.appointmentsRef.update(updates);
  }

  editAppointment(appointmentData) {
    const appointmentKey = this.props.match.params.id;
    let updates = {}
    updates['/' + appointmentKey] = appointmentData;

    this.state.appointmentsRef.update(updates);
  }

  fetchAppointment = (id) => {
    const appointmentData = firebase.database().ref().child('appointments').child(id);
    appointmentData.once('value', (snapshot) => {
      this.setState({
        date: snapshot.val().date,
        family_member: snapshot.val().family_member,
        location: snapshot.val().location,
        notes: snapshot.val().notes,
        patient: snapshot.val().patient,
        purpose: snapshot.val().purpose,
      });
    });
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.fetchAppointment(this.props.match.params.id);
    };
  }

  render() {
    const { purpose, patient, date, location, notes, family_member } = this.state;

    return (
      <div>
        <div className="container form">
          { this.props.match.params.id ? (
            <h2>Edit Appointment:</h2>
          ) : (
            <h2>New Appointment:</h2>
          ) }
          <form onSubmit={ this._handleSubmit }>
            <div className="label-input">
              <label htmlFor="patient">For</label>
              <input
                type="text"
                name="patient"
                value={ patient }
                placeholder="Aileen"
                required
                onChange={this._handleInput}
              />
            </div>
            <div className="label-input">
              <label htmlFor="name">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={ purpose }
                placeholder="Doctor's Appointment"
                required
                onChange={ this._handleInput }
              />
            </div>
            <div className="label-input">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={ date }
                onChange={ this._handleInput }
                required
              />
            </div>
            <div className="label-input">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                value={ location }
                placeholder="Brisbane"
                onChange={ this._handleInput }
                required
              />
            </div>
            <div className="label-input">
              <label htmlFor="notes">Notes</label>
              <textarea
                name="notes"
                value={ notes }
                placeholder="Bring scans"
                onChange={ this._handleInput }
              />
            </div>
            <div className="label-input">
              <label htmlFor="family_member">Family Member</label>
              <input
                type="text"
                name="family_member"
                value={ family_member }
                placeholder="Anne"
                onChange={ this._handleInput }
              />
            </div>
            <input type="submit" value={ this.props.match.params.id ? "Edit Appointment" : "Add Appointment" } />
          </form>
        </div>
      </div>
    );
  }
}

export default AppointmentForm;
