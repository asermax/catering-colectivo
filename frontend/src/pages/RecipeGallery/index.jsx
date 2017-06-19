import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as routes from 'pages/routes'
import { getDateOrderedRecipes, getEditingRecipe } from 'data/recipe/selectors'
import { fetchRecipes, deleteRecipe } from 'data/recipe/actions'
import Recipe from 'components/Recipe'
import RecipeAdd from './RecipeAdd'
import RecipeEdit from './RecipeEdit'
import styles from './styles.scss'

class RecipeGallery extends Component {
  componentDidMount() {
    this.props.fetchRecipes()
  }

  renderRecipe(recipe) {
    if (recipe._id === this.props.editing) {
      return (
        <RecipeEdit
          recipeId={recipe._id}
          onFinish={this.props.backEditRecipe}
        />
      )
    } else {
      return (
        <Recipe
          ingredient={recipe.ingredient}
          description={recipe.description}
          quantity={recipe.quantity}
          unit={recipe.unit}
          proportion={recipe.proportion}
          onDelete={() => this.props.deleteRecipe(recipe._id)}
          onEdit={() => this.props.goEditRecipe(recipe._id)}
        />
      )
    }
  }

  render() {
    return (
      <div className={`columns ${styles.recipeGallery}`}>
        <div className={`column ${styles.recipeItem}`}>
          <RecipeAdd />
        </div>
        {
          this.props.recipes.map((recipe) => (
            <div
              className={`column ${styles.recipeItem}`}
              key={recipe._id}
            >
              {this.renderRecipe(recipe)}
            </div>
          ))
        }
      </div>
    )
  }
}

RecipeGallery.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  editing: PropTypes.string,
  fetchRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  goEditRecipe: PropTypes.func.isRequired,
  backEditRecipe: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  recipes: getDateOrderedRecipes(state),
  editing: getEditingRecipe(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
  deleteRecipe: (id) => dispatch(deleteRecipe(id)),
  goEditRecipe: (id) => dispatch(routes.goTo(routes.RECIPE_EDIT, { id })),
  backEditRecipe: () => dispatch(routes.goTo(routes.RECIPE_GALLERY)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGallery)
