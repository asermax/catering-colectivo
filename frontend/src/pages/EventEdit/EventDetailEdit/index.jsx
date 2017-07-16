import React from 'react'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, mapProps, flattenProp } from 'recompose'
import * as routes from 'data/page/actions'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import EditableEventDetail from 'components/EditableEventDetail'
import { searchRecipes } from 'data/recipe/actions'
import { getRecipes } from 'data/recipe/selectors'
import { changeEditingEventDetail } from 'data/event/actions'
import { getEditingId, getEditingEventDetail } from 'data/event/selectors'

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
  editingEventDetail: getEditingEventDetail(state),
  recipes: getRecipes(state),
})

const mapDispatchToProps = (dispatch) => ({
  searchRecipes: (searchTerm) => dispatch(searchRecipes(searchTerm)),
  onChange: (changes) => dispatch(changeEditingEventDetail(changes)),
  onSave: () => console.log('not implemented yet'),
  onCancel: (id) => dispatch(routes.goTo(routes.EVENT_EDIT, { id })),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ editingEventDetail }) => editingEventDetail == null,
    renderComponent(Placeholder),
  ),
  mapProps(({ onCancel, editingId, ...props }) => ({
    onCancel: () => onCancel(editingId),
    ...props,
  })),
  flattenProp('editingEventDetail'),
)

export default enhance(EditableEventDetail)
