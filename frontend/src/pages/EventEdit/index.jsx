import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle, branch, renderNothing } from 'recompose'
import { fetchEvent } from 'data/event/actions'
import { getEditingId, getEditingEvent } from 'data/event/selectors'

const EventEdit = ({ event }) => (
  <div>
    {event.description}
    {event.details.map((detail) => (
      <div key={detail._id}>
        {JSON.stringify(detail)}
      </div>
    ))}
  </div>
)

EventEdit.propTypes = {
  event: PropTypes.shape({
    description: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
}

const mapStateToProps = (state) => ({
  editingId: getEditingId(state),
  event: getEditingEvent(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchEvent: (id) => dispatch(fetchEvent(id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.fetchEvent(this.props.editingId)
    },
  }),
  branch(
    ({ event }) => event == null || event.details == null,
    renderNothing,
  ),
)

export default enhancer(EventEdit)
