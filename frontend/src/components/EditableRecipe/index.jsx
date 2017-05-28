import React from 'react'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'
import { coalesce } from 'utils'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import styles from '../Recipe/styles.scss'

const Recipe = (props) => (
  <div className={`card ${styles.recipe}`}>
    <div className={`card-content ${styles.recipeContent}`}>
      <h1 className="title">
        <ContentEditable
          html={coalesce(props.ingredient, 'Ingrediente')}
          onChange={(event) => props.onChange({ ingredient: event.target.value })}
        />
      </h1>
      <h2 className="subtitle">
        <ContentEditable
          html={coalesce(props.description, 'Descripción')}
          onChange={(event) => props.onChange({ description: event.target.value })}
        />
      </h2>
      <VerticalCenteredContent className={styles.recipeProportion}>
        <div className="notification has-text-centered">
          <ContentEditable
            tagName="span"
            html={coalesce(props.quantity, 'Cantidad')}
            onChange={(event) => props.onChange({ quantity: event.target.value })}
          />&nbsp;
          <ContentEditable
            tagName="span"
            html={coalesce(props.unit, 'Unidad')}
            onChange={(event) => props.onChange({ unit: event.target.value })}
          />
          <span className={styles.perKeyword}>para</span>
          <ContentEditable
            tagName="span"
            html={coalesce(props.proportion, 'Proporción')}
            onChange={(event) => props.onChange({ proportion: event.target.value })}
          />&nbsp;
          personas
        </div>
      </VerticalCenteredContent>
      <nav className="level">
        <div className="level-left">
          <a
            className="level-item"
            onClick={props.onSave}
          >
            <span className="icon is-small">
              <i className="fa fa-check" />
            </span>
          </a>
        </div>
        <div className="level-right" >
          <a
            className="level-item"
            onClick={props.onCancel}
          >
            <span className="icon is-small">
              <i className="fa fa-ban" />
            </span>
          </a>
        </div>
      </nav>
    </div>
  </div>
)

Recipe.propTypes = {
  ingredient: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.number,
  unit: PropTypes.string,
  proportion: PropTypes.number,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Recipe
