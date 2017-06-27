import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { compose, branch, renderComponent, flattenProp, mapProps } from 'recompose'
import * as routes from 'data/page/actions'
import { createRecipe, changeNewRecipe } from 'data/recipe/actions'
import { isAddingRecipe, getNewRecipe } from 'data/recipe/selectors'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import EditableRecipe from 'components/EditableRecipe'
import styles from './styles.scss'

let Placeholder = ({ goAdd }) => (
  <div
    className={classNames('card', styles.recipeAdd)}
    onClick={goAdd}
  >
    <VerticalCenteredContent className={classNames('card-content', styles.recipeAddContent)}>
      <div className="notification has-text-centered">
        <div>
          <span className="icon is-large">
            <i className="fa fa-plus-circle" />
          </span>
        </div>
        Agregar nueva receta
      </div>
    </VerticalCenteredContent>
  </div>
)

Placeholder.propTypes = {
  goAdd: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isAdding: isAddingRecipe(state),
  newRecipe: getNewRecipe(state),
})

const mapDispatchToProps = (dispatch) => ({
  goAdd: () => dispatch(routes.goTo(routes.RECIPE_ADD)),
  onCancel: () => dispatch(routes.goTo(routes.RECIPE_GALLERY)),
  onChange: (changes) => dispatch(changeNewRecipe(changes)),
  onSave: (recipe) => dispatch(createRecipe(recipe)),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ isAdding }) => !isAdding,
    renderComponent(Placeholder),
  ),
  mapProps(({ onSave, ...props }) => ({
    onSave: () => {
      onSave(props.newRecipe)
      props.onCancel()
    },
    ...props,
  })),
  flattenProp('newRecipe'),
)

export default enhance(EditableRecipe)
