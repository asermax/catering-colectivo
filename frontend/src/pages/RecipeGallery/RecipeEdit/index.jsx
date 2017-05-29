import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRecipe } from 'data/recipe/selectors'
import { editRecipe } from 'data/recipe/actions'
import EditableRecipe from 'components/EditableRecipe'

class RecipeEdit extends Component {
  constructor(props) {
    super(props)
    const recipe = props.recipe
    this.state = {
      ingredient: recipe != null ? recipe.ingredient : null,
      description: recipe != null ? recipe.description : null,
      quantity: recipe != null ? recipe.quantity : null,
      unit: recipe != null ? recipe.unit : null,
      proportion: recipe != null ? recipe.proportion : null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recipe !== this.props.recipe) {
      const recipe = nextProps.recipe

      this.setState({
        ingredient: recipe.ingredient,
        description: recipe.description,
        quantity: recipe.quantity,
        unit: recipe.unit,
        proportion: recipe.proportion,
      })
    }
  }

  handleSave() {
    this.props.editRecipe(
      this.props.recipeId,
      {
        ...this.state,
      }
    )
    this.props.onFinish()
  }

  render() {
    return (
      <EditableRecipe
        ingredient={this.state.ingredient}
        description={this.state.description}
        quantity={this.state.quantity}
        unit={this.state.unit}
        proportion={this.state.proportion}
        onChange={(change) => this.setState(change)}
        onSave={() => this.handleSave()}
        onCancel={() => this.props.onFinish()}
      />
    )
  }
}

RecipeEdit.propTypes = {
  recipe: PropTypes.object,
  recipeId: PropTypes.string.isRequired,
  editRecipe: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
}

const mapStateToProps = (state, { recipeId }) => ({
  recipe: getRecipe(state, recipeId),
})

const mapDispatchToProps = (dispatch) => ({
  editRecipe: (id, recipe) => dispatch(editRecipe(id, recipe)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEdit)
