import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, mapProps } from 'recompose'
import * as routes from 'data/page/actions'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import { getEditingId, getEditingEventDetailId, isAddingEventDetail } from 'data/event/selectors'
import EventDetailEdit from 'pages/EventEdit/EventDetailEdit'
import EventDetailAdd from 'pages/EventEdit/EventDetailAdd'

const EventDetailPlaceholder = ({ goAdd }) => (
  <div
    className="card"
    onClick={goAdd}
  >
    <VerticalCenteredContent className="card-content">
      <div className="notification has-text-centered">
        <div>
          <span className="icon is-large">
            <i className="fa fa-plus-circle" />
          </span>
        </div>
        Agregar nuevo item
      </div>
    </VerticalCenteredContent>
  </div>
)

EventDetailPlaceholder.propTypes = {
  goAdd: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isAdding: isAddingEventDetail(state),
  editingEventDetailId: getEditingEventDetailId(state),
  editingId: getEditingId(state),
})

const mapDispatchToProps = (dispatch) => ({
  goAdd: (eventId) => dispatch(routes.goTo(routes.EVENT_DETAIL_ADD, { eventId })),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ isAdding }) => isAdding,
    renderComponent(EventDetailAdd),
  ),
  branch(
    ({ editingEventDetailId }) => editingEventDetailId != null,
    renderComponent(EventDetailEdit),
  ),
  mapProps(({ goAdd, editingId, ...props }) => ({
    ...props,
    goAdd: () => goAdd(editingId),
  })),
)

export default enhance(EventDetailPlaceholder)
