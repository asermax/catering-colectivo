import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withProps, branch, flattenProp, renderComponent } from 'recompose'
import * as routes from 'data/page/actions'
import { getRecipe, getEditingId, getEditingRecipe } from 'data/recipe/selectors'
import { deleteRecipe, changeEditingRecipe, editRecipe } from 'data/recipe/actions'
import Recipe from 'components/Recipe'
import EditableRecipe from 'components/EditableRecipe'

const mapStateToProps = (state, ownProps) => ({
  recipe: getRecipe(state, ownProps.recipeId),
  editingId: getEditingId(state),
  editingRecipe: getEditingRecipe(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => dispatch(deleteRecipe(ownProps.recipeId)),
  onEdit: () => dispatch(routes.goTo(routes.RECIPE_EDIT, { id: ownProps.recipeId })),
  onSave: (id, recipe) => dispatch(editRecipe(id, recipe)),
  onChange: (changes) => dispatch(changeEditingRecipe(changes)),
  onCancel: () => dispatch(routes.goTo(routes.RECIPE_GALLERY)),
})

const RecipeEdit = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ recipeId, recipe, editingId, editingRecipe, onSave, onCancel }) => ({
    recipe: recipeId === editingId ? editingRecipe : recipe,
    onSave: () => {
      onSave(editingId, editingRecipe)
      onCancel()
    },
  })),
  flattenProp('recipe'),
  branch(
    ({ recipeId, editingId }) => recipeId !== editingId,
    renderComponent(Recipe),
  ),
)(EditableRecipe)

RecipeEdit.propTypes = {
  recipeId: PropTypes.string.isRequired,
}

export default RecipeEdit
