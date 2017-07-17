import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle, branch, renderNothing, mapProps } from 'recompose'
import * as routes from 'data/page/actions'
import { fetchEvent, deleteEventDetail } from 'data/event/actions'
import { getEditingId, getEditingEvent, getEditingEventDetails } from 'data/event/selectors'
import EditableEvent from 'components/EditableEvent'
import EventDetails from 'components/EventDetails'
import EventDetailPlaceholder from './EventDetailPlaceholder'

const EventEdit = ({ event, details, goEdit, deleteEventDetail }) => (
  <div>
    <section className="section">
      <div className="container">
        <EditableEvent
          organization={event.organization}
          amountPeople={event.amountPeople}
          date={event.date}
          description={event.description}
        />
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-two-thirds">
            <EventDetails
              details={details}
              onEdit={goEdit}
              onDelete={deleteEventDetail}
            />
          </div>
          <div className="column is-one-third">
            <EventDetailPlaceholder />
          </div>
        </div>
      </div>
    </section>
  </div>
)

EventEdit.propTypes = {
  event: PropTypes.object.isRequired,
  details: PropTypes.arrayOf(PropTypes.object).isRequired,
  goEdit: PropTypes.func.isRequired,
  deleteEventDetail: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  editingId: getEditingId(state),
  event: getEditingEvent(state),
  details: getEditingEventDetails(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchEvent: (id) => dispatch(fetchEvent(id)),
  goEdit: (eventId, id) => dispatch(routes.goTo(routes.EVENT_DETAIL_EDIT, { eventId, id })),
  deleteEventDetail: (eventId, id) => dispatch(deleteEventDetail(eventId, id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.fetchEvent(this.props.editingId)
    },
  }),
  branch(
    ({ event }) => event == null,
    renderNothing,
  ),
  mapProps(({ goEdit, deleteEventDetail, editingId, ...props }) => ({
    ...props,
    goEdit: (id) => goEdit(editingId, id),
    deleteEventDetail: (id) => deleteEventDetail(editingId, id),
  })),
)

export default enhancer(EventEdit)
