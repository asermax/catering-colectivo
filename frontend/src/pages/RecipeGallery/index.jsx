import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { getRecipes } from 'data/recipe/selectors'
import { fetchRecipes, deleteRecipe } from 'data/recipe/actions'
import Recipe from 'components/Recipe'
import RecipeAdd from './RecipeAdd'
import RecipeEdit from './RecipeEdit'
import routes from 'pages/routes'
import styles from './styles.scss'

class RecipeGallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: null,
    }
  }

  componentDidMount() {
    this.props.fetchRecipes()
  }

  handleEdit(id) {
    this.setState({ editing: id })
    this.props.goEditRecipe(id)
  }

  renderRecipe(recipe, match) {
    if (match != null) {
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
          onEdit={() => this.handleEdit(recipe._id)}
        />
      )
    }
  }

  render() {
    return (
      <div className={`columns ${styles.recipeGallery}`}>
        <div className={`column ${styles.recipeItem}`}>
          <Route
            path={routes.ADD_RECIPE}
            children={({ match }) => (
              <RecipeAdd
                enabled={match != null}
                onEnable={this.props.goAddRecipe}
                onDisable={this.props.backAddRecipe}
              />
            )}
          />
        </div>
        {
          this.props.recipes.map((recipe) =>
            <div
              className={`column ${styles.recipeItem}`}
              key={recipe._id}
            >
              <Route
                path={routes.EDIT_RECIPE.replace(':id', recipe._id)}
                children={({ match }) => this.renderRecipe(recipe, match)}
              />
            </div>
          )
        }
      </div>
    )
  }
}

RecipeGallery.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  goAddRecipe: PropTypes.func.isRequired,
  backAddRecipe: PropTypes.func.isRequired,
  goEditRecipe: PropTypes.func.isRequired,
  backEditRecipe: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  recipes: getRecipes(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
  deleteRecipe: (id) => dispatch(deleteRecipe(id)),
  goAddRecipe: () => dispatch(push(routes.ADD_RECIPE)),
  backAddRecipe: () => dispatch(push(routes.RECIPE_GALLERY)),
  goEditRecipe: (id) => dispatch(push(routes.EDIT_RECIPE.replace(':id', id))),
  backEditRecipe: () => dispatch(push(routes.RECIPE_GALLERY)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGallery)
