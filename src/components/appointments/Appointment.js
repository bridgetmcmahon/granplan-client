import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Appointment extends Component {
  constructor() {
    super();
    this.state = {
      showAppointmentInfo: false,
    };

    this._handleShowClick = this._handleShowClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  _handleShowClick = () => {
    this.setState({
      showAppointmentInfo: !this.state.showAppointmentInfo,
    })
  }

  _handleDeleteClick = () => {
    this.props.deleteAppointment();
  }

  render() {
    const { purpose, patient, date, location, notes, family_member } = this.props.appointment;
    const { showAppointmentInfo } = this.state;

    return (
      <div className="appointment-card">
        <span><h3 style={{ display: 'inline' }}>{ purpose }</h3>
        <i onClick={ this._handleShowClick } className="fas fa-sort-down" /></span>
        <Link to={"/appointments/" + this.props.appointmentKey}>
          <i className="fas fa-pen" />
        </Link>
        <i
          className="fas fa-times"
          onClick={ this._handleDeleteClick }
          style={{ cursor: 'pointer', color: 'red', marginLeft: '20px' }}/>
        { showAppointmentInfo ? (
          <div>
          <p>For: { patient }</p>
          <p>Date: { date }</p>
          <p>Location: { location }</p>
          <p>Notes: { notes }</p>
          <p>Family Member: { family_member }</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Appointment;
