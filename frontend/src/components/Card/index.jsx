import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './styles.scss'

const renderAction = (position, action) => (
  <div className={`level-${position}`}>
    <button
      className={`level-item button is-white is-paddingless ${styles.action}`}
      disabled={action.disabled}
      onClick={action.callback}
    >
      <span className="icon is-small">
        <i className={`fa fa-${action.icon}`} />
      </span>
    </button>
  </div>
)

const renderActions = (props) => {
  let leftAction, rightAction, actions

  if (props.leftAction != null) {
    leftAction = renderAction('left', props.leftAction)
  }

  if (props.rightAction != null) {
    rightAction = renderAction('right', props.rightAction)
  }

  if (leftAction != null || rightAction != null) {
    actions = (
      <nav
        className={classNames('level', styles.actions, { [styles.isHidden]: props.hiddenActions })}
      >
        {leftAction != null ? leftAction : <div className="level-left" />}
        {rightAction}
      </nav>
    )
  }

  return actions
}

const Card = (props) => (
  <div className={`card ${styles.card}`}>
    <div className={`card-content ${styles.cardContent}`}>
      {props.children}
      {renderActions(props)}
    </div>
  </div>
)

Card.propTypes = {
  children: PropTypes.element.isRequired,
  hiddenActions: PropTypes.boolean,
  leftAction: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    disabled: PropTypes.boolean,
  }),
  rightAction: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    disabled: PropTypes.boolean,
  }),

}

Card.defaultProps = {
  hiddenActions: true,
}

export default Card
