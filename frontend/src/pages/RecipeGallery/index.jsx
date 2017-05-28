import React, { Component } from 'react'
import Recipe from 'components/Recipe'

class RecipeGallery extends Component {
  render() {
    return (
      <div className="columns">
        <div className="column is-one-third">
          <Recipe />
        </div>
      </div>
    )
  }
}

export default RecipeGallery
