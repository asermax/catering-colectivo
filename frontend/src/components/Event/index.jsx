import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import Card from 'components/Card'
import styles from './styles.scss'

const Event = ({ organization, description, date, amountPeople, onEdit, onDelete }) => (
  <Card
    leftAction={{ icon: 'pencil', callback: onEdit }}
    rightAction={{ icon: 'trash', callback: onDelete }}
  >
    <div className={styles.eventContent}>
      <h1 className="title">
        {organization}
      </h1>
      <h2 className="subtitle">
        para {amountPeople} personas.
      </h2>
      <div className={classNames('content', styles.eventDetails)}>
        <div className={styles.eventDescription}>
          {description}
        </div>
        <small>
          {date != null ? moment(date).calendar() : ''}
        </small>
      </div>
    </div>
  </Card>
)

Event.propTypes = {
  organization: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.string,
  amountPeople: PropTypes.number,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Event
