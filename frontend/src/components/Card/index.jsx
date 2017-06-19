import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  compose, branch, renderComponent, renderNothing, withProps, flattenProp,
} from 'recompose'
import styles from './styles.scss'

const Action = ({ position, disabled, callback, icon }) => (
  <div className={`level-${position}`}>
    <button
      className={`level-item button is-white is-paddingless ${styles.action}`}
      disabled={disabled}
      onClick={callback}
    >
      <span className="icon is-small">
        <i className={`fa fa-${icon}`} />
      </span>
    </button>
  </div>
)

Action.propTypes = {
  position: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  callback: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
}

const LeftAction = compose(
  branch(
    (props) => props.action == null,
    renderComponent(() => <div className="level-left" />),
  ),
  flattenProp('action'),
  withProps({ position: 'left' }),
)(Action)

const RightAction = compose(
  branch(
    (props) => props.action == null,
    renderNothing,
  ),
  flattenProp('action'),
  withProps({ position: 'right' }),
)(Action)


const Actions = ({ hiddenActions, leftAction, rightAction }) => (
  <nav className={classNames('level', styles.actions, { [styles.isHidden]: hiddenActions })}>
    <LeftAction action={leftAction} />
    <RightAction action={rightAction} />
  </nav>
)

Actions.propTypes = {
  hiddenActions: PropTypes.bool,
  leftAction: PropTypes.shape({
    disabled: PropTypes.bool,
    callback: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
  }),
  rightAction: PropTypes.shape({
    disabled: PropTypes.bool,
    callback: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
  }),
}

const Card = ({ children, ...actions }) => (
  <div className={`card ${styles.card}`}>
    <div className={`card-content ${styles.cardContent}`}>
      {children}
      <Actions {...actions} />
    </div>
  </div>
)

Card.propTypes = {
  children: PropTypes.element.isRequired,
  hiddenActions: PropTypes.bool,
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
