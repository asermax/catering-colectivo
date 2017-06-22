import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import classNames from 'classnames'
import { getEvents } from 'data/event/selectors'
import { fetchEvents } from 'data/event/actions'
import Event from 'components/Event'
import styles from './styles.scss'

const EventsGallery = ({ events }) => (
  <div className={classNames('columns', styles.eventGallery)}>
    {events.map((event) => (
      <div
        className={classNames('column', styles.eventItem)}
        key={event._id}
      >
        <Event
          organization={event.organization}
          description={event.description}
          amountPeople={event.amountPeople}
          date={event.date}
        />
      </div>
    ))}
  </div>
)

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

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.fetchEvents()
    },
  }),
)

export default enhancer(EventsGallery)
