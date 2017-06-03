import React from 'react'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'
import { coalesce, validations } from 'utils'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import baseStyles from '../Recipe/styles.scss'
import styles from './styles.scss'

const handleKeyDown = (event, props) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    props.onSave()
  } else if (event.key === 'Escape') {
    props.onCancel()
  }
}

const handleKeyUp = (event) => {
  if (event.key === 'Tab') {
    const range = document.createRange()
    range.selectNodeContents(event.target)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

const handleBlur = () => window.getSelection().removeAllRanges()

const isValid = (props) => Object.values(props).every((prop) => prop != null)

const Recipe = (props) => (
  <div className={`card ${baseStyles.recipe}`}>
    <div className={`card-content ${baseStyles.recipeContent}`}>
      <h1 className="title">
        <ContentEditable
          className={styles.contentEditable}
          placeholder="Ingrediente"
          html={coalesce(props.ingredient, '')}
          onChange={(event) => (
            validations.str((value) => props.onChange({ ingredient: value }))(event.target.value)
          )}
          onKeyDown={(event) => handleKeyDown(event, props)}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
      </h1>
      <h2 className="subtitle">
        <ContentEditable
          className={styles.contentEditable}
          placeholder="descripción"
          html={coalesce(props.description, '')}
          onChange={(event) => (
            validations.str((value) => props.onChange({ description: value }))(event.target.value)
          )}
          onKeyDown={(event) => handleKeyDown(event, props)}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
      </h2>
      <VerticalCenteredContent className={baseStyles.recipeProportion}>
        <div className="notification has-text-centered">
          <ContentEditable
            tagName="span"
            className={styles.contentEditable}
            html={coalesce(props.quantity, '').toString()}
            onChange={(event) => (
              validations.int(
                (value) => props.onChange({ quantity: value })
              )(event.target.value, props.quantity, 1)
            )}
            onKeyDown={(event) => handleKeyDown(event, props)}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />&nbsp;
          <ContentEditable
            tagName="span"
            className={styles.contentEditable}
            html={coalesce(props.unit, '')}
            onChange={(event) => (
              validations.str((value) =>
                props.onChange({ unit: value }))(event.target.value)
            )}
            onKeyDown={(event) => handleKeyDown(event, props)}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
          <span className={baseStyles.perKeyword}>para</span>
          <ContentEditable
            tagName="span"
            className={styles.contentEditable}
            html={coalesce(props.proportion, '').toString()}
            onChange={(event) => (
              validations.int(
                (value) => props.onChange({ proportion: value })
              )(event.target.value, props.proportion, 1)
            )}
            onKeyDown={(event) => handleKeyDown(event, props)}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />&nbsp;
          personas
        </div>
      </VerticalCenteredContent>
      <nav className="level">
        <div className="level-left">
          <button
            className="level-item button is-white is-paddingless"
            disabled={!isValid(props)}
            onClick={props.onSave}
          >
            <span className="icon is-small">
              <i className="fa fa-check" />
            </span>
          </button>
        </div>
        <div className="level-right" >
          <button
            className="level-item button is-white is-paddingless"
            onClick={props.onCancel}
          >
            <span className="icon is-small">
              <i className="fa fa-ban" />
            </span>
          </button>
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
