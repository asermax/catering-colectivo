import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Action from 'components/Action'
import styles from './styles.scss'

const EditableDetails = ({ details, selectedDetail, onEdit, onDelete }) => (
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
        <tr
          key={detail._id}
          className={classNames(styles.detailRow, {
            'is-selected': detail._id === selectedDetail,
          })}>
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
            <Action
              className={styles.detailAction}
              callback={() => onEdit(detail._id)}
              icon="pencil"
            />
            <Action
              className={styles.detailAction}
              callback={() => onDelete(detail._id)}
              icon="trash"
            />
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
  selectedDetail: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

export default EditableDetails
