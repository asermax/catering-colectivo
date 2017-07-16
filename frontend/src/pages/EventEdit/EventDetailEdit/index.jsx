import React from 'react'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, mapProps, flattenProp } from 'recompose'
import * as routes from 'data/page/actions'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import EditableEventDetail from 'components/EditableEventDetail'
import { searchRecipes } from 'data/recipe/actions'
import { getRecipes } from 'data/recipe/selectors'
import { changeEditingEventDetail, editEventDetail } from 'data/event/actions'
import { getEditingId, getEditingEventDetailId, getEditingEventDetail } from 'data/event/selectors'

const Placeholder = () => (
  <div className="card">
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

const mapStateToProps = (state) => ({
  editingId: getEditingId(state),
  editingEventDetailId: getEditingEventDetailId(state),
  editingEventDetail: getEditingEventDetail(state),
  recipes: getRecipes(state),
})

const mapDispatchToProps = (dispatch) => ({
  searchRecipes: (searchTerm) => dispatch(searchRecipes(searchTerm)),
  onChange: (changes) => dispatch(changeEditingEventDetail(changes)),
  onSave: (eventId, id, eventDetail) => dispatch(editEventDetail(eventId, id, eventDetail)),
  onCancel: (id) => dispatch(routes.goTo(routes.EVENT_EDIT, { id })),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ editingEventDetail }) => editingEventDetail == null,
    renderComponent(Placeholder),
  ),
  mapProps(({
    onCancel, onSave, editingId, editingEventDetailId, editingEventDetail, ...props
  }) => ({
    eventDetail: editingEventDetail,
    onCancel: () => onCancel(editingId),
    onSave: () => {
      onSave(editingId, editingEventDetailId, editingEventDetail)
      onCancel(editingId)
    },
    ...props,
  })),
  flattenProp('eventDetail'),
)

export default enhance(EditableEventDetail)
