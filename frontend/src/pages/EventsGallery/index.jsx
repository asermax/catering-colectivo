import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import classNames from 'classnames'
import * as routes from 'data/page/actions'
import { getEvents } from 'data/event/selectors'
import { fetchEvents, deleteEvent } from 'data/event/actions'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import Event from 'components/Event'
import styles from './styles.scss'

const EventsGallery = ({ events, goAdd, goEdit, deleteEvent }) => (
  <div className="columns is-multiline">
    <div className={classNames('column', 'is-one-quarter', styles.eventItem)}>
      <div
          className={classNames('card', styles.eventAdd)}
          onClick={goAdd}
      >
        <VerticalCenteredContent className={classNames('card-content', styles.eventAddContent)}>
          <div className="notification has-text-centered">
            <div>
              <span className="icon is-large">
                <i className="fa fa-plus-circle" />
              </span>
            </div>
            Agregar nuevo evento
          </div>
        </VerticalCenteredContent>
      </div>
    </div>
    {events.map((event) => (
      <div
        className={classNames('column', 'is-one-quarter', styles.eventItem)}
        key={event._id}
      >
        <Event
          organization={event.organization}
          description={event.description}
          amountPeople={event.amountPeople}
          date={event.date}
          onEdit={() => goEdit(event._id)}
          onDelete={() => deleteEvent(event._id)}
        />
      </div>
    ))}
  </div>
)

EventsGallery.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchEvents: PropTypes.func.isRequired,
  goAdd: PropTypes.func.isRequired,
  goEdit: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  events: getEvents(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  goAdd: () => dispatch(routes.goTo(routes.EVENT_ADD)),
  goEdit: (id) => dispatch(routes.goTo(routes.EVENT_EDIT, { id })),
  deleteEvent: (id) => dispatch(deleteEvent(id)),
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
