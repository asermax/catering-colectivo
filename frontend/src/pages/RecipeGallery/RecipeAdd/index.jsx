import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createRecipe } from 'data/recipe/actions'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import EditableRecipe from 'components/EditableRecipe'
import styles from './styles.scss'

class RecipeAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredient: null,
      description: null,
      quantity: null,
      unit: null,
      proportion: null,
    }
  }

  cleanState() {
    this.setState({
      ingredient: null,
      description: null,
      quantity: null,
      unit: null,
      proportion: null,
    })
  }

  handleCancel() {
    this.cleanState()
    this.props.onDisable()
  }

  handleSave() {
    this.props.createRecipe({
      ...this.state,
    })
    this.handleCancel()
  }

  renderEditableRecipe() {
    return (
      <EditableRecipe
        ingredient={this.state.ingredient}
        description={this.state.description}
        quantity={this.state.quantity}
        unit={this.state.unit}
        proportion={this.state.proportion}
        onChange={(change) => this.setState(change)}
        onSave={() => this.handleSave()}
        onCancel={() => this.handleCancel()}
      />
    )
  }

  renderPlaceholder() {
    return (
      <div
        className={`card ${styles.recipeAdd}`}
        onClick={this.props.onEnable}
      >
        <VerticalCenteredContent className={`card-content ${styles.recipeAddContent}`}>
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
  }

  render() {
    return this.props.enabled ? this.renderEditableRecipe() : this.renderPlaceholder()
  }
}

RecipeAdd.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onEnable: PropTypes.func.isRequired,
  onDisable: PropTypes.func.isRequired,
  createRecipe: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  createRecipe: (recipe) => dispatch(createRecipe(recipe)),
})

export default connect(null, mapDispatchToProps)(RecipeAdd)
