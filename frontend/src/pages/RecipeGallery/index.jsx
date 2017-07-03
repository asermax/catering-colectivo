import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { compose, lifecycle } from 'recompose'
import { getDateOrderedRecipes } from 'data/recipe/selectors'
import { fetchRecipes } from 'data/recipe/actions'
import RecipeAdd from './RecipeAdd'
import RecipeEdit from './RecipeEdit'
import styles from './styles.scss'

const RecipeGallery = ({ recipes }) => (
  <div className="columns is-multiline">
    <div className={classNames('column', 'is-one-quarter', styles.recipeItem)}>
      <RecipeAdd />
    </div>
    {recipes.map((recipe) => (
      <div
        className={classNames('column', 'is-one-quarter', styles.recipeItem)}
        key={recipe._id}
      >
        <RecipeEdit recipeId={recipe._id} />
      </div>
    ))}
  </div>
)

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

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.fetchRecipes()
    },
  }),
)

export default enhancer(RecipeGallery)
