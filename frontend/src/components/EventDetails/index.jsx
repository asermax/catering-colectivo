import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './styles.scss'

const EditableDetails = ({ details, onEdit }) => (
  <table className="table">
    <thead>
      <tr>
        <th>
          Receta
        </th>
        <th>
          Nota
        </th>
        <th>
          Cantidad de personas
        </th>
        <th>
          <strong>
            Total
          </strong>
        </th>
        <th>
          {/* actions column */}
        </th>
      </tr>
    </thead>
    <tbody>
      {details.map((detail) => (
        <tr key={detail._id} className={styles.detailRow}>
          <td>
            {detail.recipe.ingredient}
          </td>
          <td>
            {detail.note}
          </td>
          <td>
            {detail.amountPeople}
          </td>
          <td>
            {detail.amountPeople / detail.recipe.proportion * detail.recipe.quantity}
            &nbsp;
            {detail.recipe.unit}
          </td>
          <td>
            <button
              className={classNames('button', 'is-white', 'is-paddingless', styles.detailAction)}
              onClick={() => onEdit(detail._id)}
            >
              <span className="icon is-small">
                <i className="fa fa-pencil" />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

EditableDetails.propTypes = {
  details: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    recipe: PropTypes.shape({
      ingredient: PropTypes.string.isRequired,
    }).isRequired,
    amountPeople: PropTypes.number.isRequired,
    note: PropTypes.string,
  })).isRequired,
  onEdit: PropTypes.func,
}

export default EditableDetails
