import React from 'react'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'
import { coalesce, validations } from 'utils'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import baseStyles from '../Recipe/styles.scss'
import styles from './styles.scss'

const selectAll = (node) => {
  const range = document.createRange()
  range.selectNodeContents(node)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}

const Recipe = (props) => (
  <div className={`card ${baseStyles.recipe}`}>
    <div className={`card-content ${baseStyles.recipeContent}`}>
      <h1 className="title">
        <ContentEditable
          className={styles.contentEditable}
          placeholder="Ingrediente"
          html={coalesce(props.ingredient, '')}
          onChange={(event) => props.onChange({ ingredient: event.target.value })}
          onFocus={(event) => selectAll(event.target)}
        />
      </h1>
      <h2 className="subtitle">
        <ContentEditable
          className={styles.contentEditable}
          placeholder="descripción"
          html={coalesce(props.description, '')}
          onChange={(event) => props.onChange({ description: event.target.value })}
          onFocus={(event) => selectAll(event.target)}
        />
      </h2>
      <VerticalCenteredContent className={baseStyles.recipeProportion}>
        <div className="notification has-text-centered">
          <ContentEditable
            tagName="span"
            className={styles.contentEditable}
            html={coalesce(props.quantity, '').toString()}
            onChange={(event) => (
              validations.int((value) => props.onChange({ quantity: value }))(event.target.value)
            )}
            onFocus={(event) => selectAll(event.target)}
          />&nbsp;
          <ContentEditable
            tagName="span"
            className={styles.contentEditable}
            html={coalesce(props.unit, '')}
            onChange={(event) => props.onChange({ unit: event.target.value })}
            onFocus={(event) => selectAll(event.target)}
          />
          <span className={baseStyles.perKeyword}>para</span>
          <ContentEditable
            tagName="span"
            className={styles.contentEditable}
            html={coalesce(props.proportion, '').toString()}
            onChange={(event) => (
              validations.int((value) => props.onChange({ proportion: value }))(event.target.value)
            )}
            onFocus={(event) => selectAll(event.target)}
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
