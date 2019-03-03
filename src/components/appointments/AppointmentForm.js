import React, { Component } from 'react';
import Nav from '../layout/Nav';

class AppointmentForm extends Component {
  state = {
    purpose: '',
    patient: '',
    date: '',
    location: '',
    notes: '',
    family_member: '',
  };

  _handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.history.push('/appointments');
  }

  render() {
    const { purpose, patient, date, location, notes, family_member } = this.state;

    return (
      <div>
        <Nav />
        <div>
          <form onSubmit={this._handleSubmit}>
            <div className="label-input">
              <label htmlFor="patient">For</label>
              <input
                type="text"
                name="patient"
                value={patient}
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
                value={purpose}
                placeholder="Doctor's Appointment"
                required
                onChange={this._handleInput}
              />
            </div>
            <div className="label-input">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={this._handleInput}
                required
              />
            </div>
            <div className="label-input">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                value={location}
                placeholder="Brisbane"
                onChange={this._handleInput}
                required
              />
            </div>
            <div className="label-input">
              <label htmlFor="notes">Notes</label>
              <input
                type="text-area"
                name="notes"
                value={notes}
                placeholder="Bring scans"
                onChange={this._handleInput}
              />
            </div>
            <div className="label-input">
              <label htmlFor="family_member">Family Member</label>
              <input
                type="text"
                name="family_member"
                value={family_member}
                placeholder="Brisbane"
                onChange={this._handleInput}
              />
            </div>
            <input type="submit" value="Add Appointment" />
          </form>
        </div>
      </div>
    );
  }
}

export default AppointmentForm;
