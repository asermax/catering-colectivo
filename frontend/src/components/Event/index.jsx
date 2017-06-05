import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Card from 'components/Card'
import styles from './styles.scss'

const Event = (props) => (
  <Card
    onEdit={props.onEdit}
    onDelete={props.onDelete}
    leftAction={{ icon: 'pencil', callback: props.onEdit }}
    rightAction={{ icon: 'trash', callback: props.onDelete }}
  >
    <div className={styles.eventContent}>
      <h1 className="title">
        {props.organization}
      </h1>
      <h2 className="subtitle">
        para {props.amountPeople} personas.
      </h2>
      <div className={`content ${styles.eventDetails}`}>
        <div className={styles.eventDescription}>
          {props.description}
        </div>
        <small>
          {moment(props.date).calendar()}
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
