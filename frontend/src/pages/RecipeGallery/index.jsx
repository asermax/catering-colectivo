import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRecipes } from 'data/recipe/selectors'
import { fetchRecipes } from 'data/recipe/actions'
import Recipe from 'components/Recipe'

class RecipeGallery extends Component {
  componentDidMount() {
    this.props.fetchRecipes()
  }

  render() {
    return (
      <div className="columns">
        {
          this.props.recipes.map((recipe) =>
            <div
              className="column is-one-third"
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
}

const mapStateToProps = (state) => ({
  recipes: getRecipes(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGallery)
