import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Emoji from 'a11y-react-emoji';

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
        <div className="appointment-header">
          <span>
            <h3>{ purpose }</h3>
            <p>{ date }</p>
            <i onClick={ this._handleShowClick } className="fas fa-sort-down" />
          </span>

          <i
            className="fas fa-times"
            onClick={ this._handleDeleteClick }
            style={{ cursor: 'pointer', color: 'red', marginLeft: '20px' }}/>
        </div>

        { showAppointmentInfo ? (
          <div className="appointment-info">
            <p>For: { patient }</p>
            <p>Location: { location }</p>
            <p>Notes: { notes }</p>
            <p>Family Member: { family_member }</p>

            <span className="controls">
              <button className="nominate-button"><Emoji symbol="🙋🏻" label="hand" />I'll take { patient } to this one!</button>
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
