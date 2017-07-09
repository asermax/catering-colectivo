import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, flattenProp } from 'recompose'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import EditableEventDetail from 'components/EditableEventDetail'
import { getEditingEventDetail } from 'data/event/selectors'

const Placeholder = () => (
  <div className="box">
    <VerticalCenteredContent>
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

const EventDetailEdit = ({ recipe, note, amountPeople }) => (
  <div className="box">
    <EditableEventDetail
      recipe={recipe}
      note={note}
      amountPeople={amountPeople}
    />
  </div>
)

EventDetailEdit.propTypes = {
  recipe: PropTypes.object,
  note: PropTypes.string,
  amountPeople: PropTypes.number,
}

const mapStateToProps = (state) => ({
  editingEventDetail: getEditingEventDetail(state),
})

const enhance = compose(
  connect(mapStateToProps),
  branch(
    ({ editingEventDetail }) => editingEventDetail == null,
    renderComponent(Placeholder),
  ),
  flattenProp('editingEventDetail'),
)

export default enhance(EventDetailEdit)
