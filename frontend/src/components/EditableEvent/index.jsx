import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const EditableEvent = ({ organization, amountPeople, date, description, onChange }) => (
  <div>
    <div className="field is-grouped">
      <div className="control is-expanded">
        <label className="label">
          Quien organiza?
        </label>
        <input
          type="text"
          className="input"
          value={organization}
          onChange={(event) => onChange({ organization: event.target.value })}
        />
      </div>
      <div className="control has-icons-right">
        <label className="label">
          Para cuantas personas?
        </label>
        <input
          type="text"
          className="input"
          value={amountPeople}
          onChange={(event) => onChange({ organization: event.target.value })}
        />
      </div>
      <div className="control">
        <label className="label">
          Cuando?
        </label>
        <input
          type="text"
          className="input"
          value={moment(date).calendar()}
          onChange={(event) => onChange({ organization: event.target.value })}
        />
      </div>
    </div>
    <div className="field">
      <div className="control">
        <textarea
          className="textarea"
          value={description}
          onChange={(event) => onChange({ description: event.target.value })}
        />
      </div>
    </div>
  </div>
)

EditableEvent.propTypes = {
  organization: PropTypes.string.isRequired,
  description: PropTypes.string,
  amountPeople: PropTypes.number,
  date: PropTypes.number,
  onChange: PropTypes.func,
}

export default EditableEvent
