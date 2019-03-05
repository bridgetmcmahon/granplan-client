import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

import Emoji from 'a11y-react-emoji';

class Appointment extends Component {
  constructor() {
    super();
    this.state = {
      showAppointmentInfo: false,
    };
  }

  _handleShowClick = () => {
    this.setState({
      showAppointmentInfo: !this.state.showAppointmentInfo,
    })
  }

  _handleDeleteClick = () => {
    this.props.deleteAppointment();
  }

  nominateFamilyMember = () => {
    const { purpose, patient, date, location, notes } = this.props.appointment;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const appointmentData = {
          family_member: user.displayName,
          purpose: purpose,
          patient: patient,
          date: date,
          location: location,
          notes: notes,
        }

        let updates = {}
        updates['/' + this.props.appointmentKey] = appointmentData;

        firebase.database().ref('appointments').update(updates);
      }
    })
  }

  render() {
    const { purpose, patient, date, location, notes, family_member } = this.props.appointment;
    const { showAppointmentInfo } = this.state;

    return (
      <div className="appointment-card">
        <div className="appointment-header">
          <span>
            <i onClick={ this._handleShowClick } className="fas fa-sort-down" />
            <h3>{ purpose }</h3>
            <p>{ date }</p>
          </span>

          <i
            className="fas fa-times"
            onClick={ this._handleDeleteClick }
            style={{ cursor: 'pointer', color: '#F08080', marginLeft: '20px' }}/>
        </div>

        { showAppointmentInfo ? (
          <div className="appointment-info">
            <p><strong>For</strong>: { patient }</p>
            <p><strong>Location</strong>: { location }</p>
            <p><strong>Notes</strong>: { notes }</p>
            <p><strong>Family Member</strong>: { family_member }</p>

            <span className="controls">
              { family_member !== "" ? (
                <button
                  disabled
                  className="nominate-button disabled"
                >
                  <Emoji symbol="✋🏻" label="hand" />I'll take { patient } to this one!
                </button>
              ) : (
                <button
                  className="nominate-button"
                  onClick={ this.nominateFamilyMember }
                >
                  <Emoji symbol="✋🏻" label="hand" />I'll take { patient } to this one!
                </button>
              ) }

              <Link className="edit-link" to={"/appointments/" + this.props.appointmentKey}>
                <i className="fas fa-pen" />
              </Link>
            </span>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Appointment;
