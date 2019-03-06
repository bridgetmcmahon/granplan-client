import React, { Component } from 'react';
import firebase from '../../Firebase';

class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: '',
      patient: '',
      date: '',
      time: '',
      location: '',
      notes: '',
      familyMember: '',
      errors: [],
      appointmentsRef: firebase.database().ref('appointments'),
      currentUser: null,
      editMode: false,
    }
  };

  // Form validations
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

  // Event listeners
  _handleInput = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
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
        familyMember: this.state.familyMember
      };

      if (this.state.editMode) {
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
    updates[`/${newAppointmentKey}`] = appointmentData;

    this.state.appointmentsRef.update(updates);
  }

  editAppointment(appointmentData) {
    const appointmentKey = this.state.editMode;
    let updates = {}
    updates[`/${appointmentKey}`] = appointmentData;

    this.state.appointmentsRef.update(updates);
  }

  fetchAppointment = (id) => {
    const appointmentData = firebase.database().ref().child('appointments').child(id);

    appointmentData.once('value', (snapshot) => {
      this.setState({
        date: snapshot.val().date,
        familyMember: snapshot.val().familyMember,
        location: snapshot.val().location,
        notes: snapshot.val().notes,
        patient: snapshot.val().patient,
        purpose: snapshot.val().purpose,
      });
    });
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.setState({ editMode: true })
    }
  }

  componentDidMount() {
    if (this.state.editMode) {
      this.fetchAppointment(this.props.match.params.id);
    };
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        currentUser: user.displayName,
      });
    });
  }

  render() {
    const { purpose, patient, date, time, location, notes, familyMember, currentUser } = this.state;

    return (
      <div>
        <div className="container form">
          { this.state.editMode ? (
            <h2>Edit Appointment:</h2>
          ) : (
            <h2>New Appointment:</h2>
          ) }
          <form onSubmit={ this._handleSubmit }>
              <label htmlFor="patient">For</label>
              <input
                type="text"
                name="patient"
                value={ patient }
                placeholder="Aileen"
                required
                onChange={this._handleInput}
              />

              <label htmlFor="name">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={ purpose }
                placeholder="Doctor's Appointment"
                required
                onChange={ this._handleInput }
              />

              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={ date }
                onChange={ this._handleInput }
                required
              />

              <label htmlFor="time">Time</label>
              <input
                type="time"
                name="time"
                value={ time }
                onChange={ this._handleInput }
                required
              />

              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                value={ location }
                placeholder="Brisbane"
                onChange={ this._handleInput }
                required
              />

              <label htmlFor="notes">Notes</label>
              <textarea
                name="notes"
                value={ notes }
                placeholder="Bring scans"
                onChange={ this._handleInput }
              />

              { this.state.familyMember ? (
                <div>
                  <p>{ `${ familyMember === currentUser ? 'You are' : `${ familyMember } is` } taking ${ patient } to this appointment`}</p>
                </div>
              ) : null }

              <span style={ this.state.editMode && this.state.familyMember ? { display: 'none' } : { display: "block" } }>
              <label style={{ display: 'block' }} htmlFor="familyMember">{`I can take ${ patient || 'them' } to this appointment`}</label>
              <input
                type="radio"
                name="familyMember"
                value={ currentUser || "" }
                onChange={ this._handleInput }
              />Yes
              <input
                type="radio"
                name="familyMember"
                value=""
                onChange={ this._handleInput }
              />No
              </span>
            <input type="submit" value={ this.state.editMode ? "Edit Appointment" : "Add Appointment" } />
          </form>
        </div>
      </div>
    );
  }
}

export default AppointmentForm;
