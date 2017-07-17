import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, withHandlers } from 'recompose'
import Select from 'react-select'
import { coalesce, validations } from 'utils'
import Card from 'components/Card'

const EditableEventDetail = ({
  recipe, amountPeople, note, isValid, recipes, searchRecipes, onChange, onSave, onCancel,
  handleKeyDown,
}) => (
  <Card
    hiddenActions={false}
    leftAction={{ icon: 'check', callback: onSave, disabled: !isValid }}
    rightAction={{ icon: 'ban', callback: onCancel }}
  >
    <div className="field">
      <label className="label">
        Receta
      </label>
      <div className="control">
        <Select
          value={recipe}
          options={recipes}
          labelKey="ingredient"
          valueKey="_id"
          onInputChange={searchRecipes}
          onChange={(recipe) => onChange({ recipe: recipe._id })}
          clearable={false}
        />
      </div>
    </div>

    <div className="field">
      <label className="label">
        Nota
      </label>
      <div className="control">
        <input
          type="text"
          className="input"
          value={coalesce(note, '')}
          onKeyDown={handleKeyDown}
          onChange={(event) => (
            validations.str((value) => onChange({ note: value }))(event.target.value)
          )}
        />
      </div>
    </div>

    <div className="field">
      <label className="label">
        Cantidad de personas
      </label>
      <div className="control">
        <input
          type="text"
          className="input"
          value={amountPeople}
          onKeyDown={handleKeyDown}
          onChange={(event) => (
            validations.int((value) => onChange({ amountPeople: value }))(
              event.target.value, amountPeople, 1,
            )
          )}
        />
      </div>
    </div>
  </Card>
)

EditableEventDetail.propTypes = {
  recipe: PropTypes.string,
  amountPeople: PropTypes.number,
  note: PropTypes.string,
  isValid: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.required,
    name: PropTypes.string.required,
  })),
  searchRecipes: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  handleKeyDown: PropTypes.func.isRequired,
}

const enhancer = compose(
  withProps(({ recipe, amountPeople }) => ({
    isValid: recipe != null && amountPeople > 0,
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
  }),
)

export default enhancer(EditableEventDetail)
