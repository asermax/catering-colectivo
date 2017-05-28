import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { getRecipes } from 'data/recipe/selectors'
import { fetchRecipes } from 'data/recipe/actions'
import Recipe from 'components/Recipe'
import RecipeAdd from './RecipeAdd'
import styles from './styles.scss'

class RecipeGallery extends Component {
  componentDidMount() {
    this.props.fetchRecipes()
  }

  render() {
    return (
      <div className={`columns ${styles.recipeGallery}`}>
        <div className={`column ${styles.recipeItem}`}>
          <Route
            path='/add'
            children={({ match }) => (
              <RecipeAdd
                enabled={match != null}
                onEnable={this.props.goAddShow}
                onDisable={this.props.backAddShow}
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
              <Recipe
                ingredient={recipe.ingredient}
                description={recipe.description}
                quantity={recipe.quantity}
                unit={recipe.unit}
                proportion={recipe.proportion}
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
  goAddShow: PropTypes.func.isRequired,
  backAddShow: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  recipes: getRecipes(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
  goAddShow: () => dispatch(push('/add')),
  backAddShow: () => dispatch(push('/')),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGallery)
