import React from 'react'
import PropTypes from 'prop-types'
import Card from 'components/Card'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import styles from './styles.scss'

const Recipe = (props) => (
  <Card
    leftAction={{ icon: 'pencil', callback: props.onEdit }}
    rightAction={{ icon: 'trash', callback: props.onDelete }}
  >
    <div className={styles.recipeContent}>
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
    </div>
  </Card>
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
