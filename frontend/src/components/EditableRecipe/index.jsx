import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, withHandlers } from 'recompose'
import ContentEditable from 'react-contenteditable'
import { coalesce, validations } from 'utils'
import Card from 'components/Card'
import VerticalCenteredContent from 'components/VerticalCenteredContent'
import baseStyles from '../Recipe/styles.scss'
import styles from './styles.scss'

const EditableRecipe = ({
  ingredient, description, quantity, unit, proportion, isValid, onChange, onSave, onCancel,
  handleBlur, handleKeyDown, handleKeyUp,
}) => (
  <Card
    hiddenActions={false}
    leftAction={{ icon: 'check', callback: onSave, disabled: !isValid }}
    rightAction={{ icon: 'ban', callback: onCancel }}
  >
    <div className={baseStyles.recipeContent}>
      <h1 className="title">
        <ContentEditable
          className={styles.contentEditable}
          placeholder="Ingrediente"
          html={coalesce(ingredient, '')}
          onChange={(event) => (
            validations.str((value) => onChange({ ingredient: value }))(event.target.value)
          )}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
      </h1>
      <h2 className="subtitle">
        <ContentEditable
          className={styles.contentEditable}
          placeholder="descripción"
          html={coalesce(description, '')}
          onChange={(event) => (
            validations.str((value) => onChange({ description: value }))(event.target.value)
          )}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
      </h2>
      <VerticalCenteredContent className={baseStyles.recipeProportion}>
        <div className="notification has-text-centered">
          <ContentEditable
            tagName="span"
            className={styles.contentEditable}
            html={coalesce(quantity, '').toString()}
            onChange={(event) => (
              validations.int((value) => onChange({ quantity: value }))(
                event.target.value, quantity, 1,
              )
            )}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
          &nbsp;
          <ContentEditable
            tagName="span"
            className={styles.contentEditable}
            html={coalesce(unit, '')}
            onChange={(event) => (
              validations.str((value) => onChange({ unit: value }))(event.target.value)
            )}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
          <span className={baseStyles.perKeyword}>para</span>
          <ContentEditable
            tagName="span"
            className={styles.contentEditable}
            html={coalesce(proportion, '').toString()}
            onChange={(event) => (
              validations.int((value) => onChange({ proportion: value }))(
                event.target.value, proportion, 1,
              )
            )}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
          &nbsp;personas
        </div>
      </VerticalCenteredContent>
    </div>
  </Card>
)

EditableRecipe.propTypes = {
  ingredient: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.number,
  unit: PropTypes.string,
  proportion: PropTypes.number,
  isValid: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  handleKeyDown: PropTypes.func.isRequired,
  handleKeyUp: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
}

const enhancer = compose(
  withProps((props) => ({
    isValid: Object.values(props).every((prop) => prop != null),
  })),
  withHandlers({
    handleKeyDown: ({ isValid, onSave, onCancel }) => (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()

        if (isValid) {
          onSave()
        }
      } else if (event.key === 'Escape') {
        onCancel()
      }
    },
    handleKeyUp: () => (event) => {
      if (event.key === 'Tab') {
        const range = document.createRange()
        range.selectNodeContents(event.target)
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
      }
    },
    handleBlur: () => () => (window.getSelection().removeAllRanges()),
  }),
)

export default enhancer(EditableRecipe)
