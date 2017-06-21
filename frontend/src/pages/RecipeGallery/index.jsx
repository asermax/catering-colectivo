import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { getDateOrderedRecipes } from 'data/recipe/selectors'
import { fetchRecipes } from 'data/recipe/actions'
import RecipeAdd from './RecipeAdd'
import RecipeEdit from './RecipeEdit'
import styles from './styles.scss'

class RecipeGallery extends Component {
  componentDidMount() {
    this.props.fetchRecipes()
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
              className={classNames('column', styles.recipeItem)}
              key={recipe._id}
            >
              <RecipeEdit recipeId={recipe._id} />
            </div>
          ))
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
  recipes: getDateOrderedRecipes(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGallery)
