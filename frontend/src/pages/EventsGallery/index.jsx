import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getEvents } from 'data/event/selectors'
import { fetchEvents } from 'data/event/actions'
import Event from 'components/Event'
import styles from './styles.scss'

class EventsGallery extends Component {
  componentDidMount() {
    this.props.fetchEvents()
  }

  render() {
    return (
      <div className={`columns ${styles.eventGallery}`}>
        {
          this.props.events.map((event) =>
            <div
              className={`column ${styles.eventItem}`}
              key={event._id}
            >
              <Event
                organization={event.organization}
                description={event.description}
                amountPeople={event.amountPeople}
                date={event.date}
              />
            </div>
          )
        }
      </div>
    )
  }
}

EventsGallery.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchEvents: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  events: getEvents(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsGallery)
