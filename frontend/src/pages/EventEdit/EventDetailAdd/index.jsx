import { connect } from 'react-redux'
import { compose, mapProps, flattenProp } from 'recompose'
import * as routes from 'data/page/actions'
import EditableEventDetail from 'components/EditableEventDetail'
import { searchRecipes } from 'data/recipe/actions'
import { getRecipes } from 'data/recipe/selectors'
import { changeNewEventDetail, createEventDetail } from 'data/event/actions'
import { getEditingId, getNewEventDetail } from 'data/event/selectors'

const mapStateToProps = (state) => ({
  editingId: getEditingId(state),
  newEventDetail: getNewEventDetail(state),
  recipes: getRecipes(state),
})

const mapDispatchToProps = (dispatch) => ({
  searchRecipes: (searchTerm) => dispatch(searchRecipes(searchTerm)),
  onChange: (changes) => dispatch(changeNewEventDetail(changes)),
  onSave: (eventId, eventDetail) => dispatch(createEventDetail(eventId, eventDetail)),
  onCancel: (id) => dispatch(routes.goTo(routes.EVENT_EDIT, { id })),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps(({
    onCancel, onSave, editingId, newEventDetail, ...props
  }) => ({
    ...props,
    eventDetail: newEventDetail,
    onCancel: () => onCancel(editingId),
    onSave: () => {
      onSave(editingId, newEventDetail)
      onCancel(editingId)
    },
  })),
  flattenProp('eventDetail'),
)

export default enhance(EditableEventDetail)
