import React from 'react'
import PropTypes from 'prop-types'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import styles from './styles.scss'

const Recipe = (props) => (
  <div className={`card ${styles.recipe}`}>
    <div className={`card-content ${styles.recipeContent}`}>
      <h1 className="title">
        {props.ingredient}
      </h1>
      <h2 className="subtitle">
        {props.description}
      </h2>
      <VerticalCenteredContent className={styles.recipeProportion}>
        <div className="notification has-text-centered">
          {props.quantity} {props.unit}
          <span className={styles.perKeyword}>para</span>
          {props.proportion} personas
        </div>
      </VerticalCenteredContent>
      <nav className={`level ${styles.actions}`}>
        <div className="level-left">
          <a
            className="level-item"
            onClick={props.onEdit}
          >
            <span className="icon is-small">
              <i className="fa fa-pencil" />
            </span>
          </a>
        </div>
        <div className="level-right" >
          <a
            className="level-item"
            onClick={props.onDelete}
          >
            <span className="icon is-small">
              <i className="fa fa-trash" />
            </span>
          </a>
        </div>
      </nav>
    </div>
  </div>
)

Recipe.propTypes = {
  ingredient: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  proportion: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

export default Recipe
