import React from 'react'
import PropTypes from 'prop-types'

const EditableEventDetail = ({ recipe, amountPeople, note }) => (
  <div>
    <div className="field">
      <label className="label">
        Receta
      </label>
      <div className="control">
        <input
          type="text"
          className="input"
          value={recipe.ingredient}
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
          value={note}
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
        />
      </div>
    </div>
  </div>
)

EditableEventDetail.propTypes = {
  recipe: PropTypes.object,
  amountPeople: PropTypes.number,
  note: PropTypes.string,
}

export default EditableEventDetail
