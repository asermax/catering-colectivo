import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  compose, branch, renderComponent, renderNothing, withProps, flattenProp,
} from 'recompose'
import Action from 'components/Action'
import styles from './styles.scss'

let CardAction = ({ position, ...props }) => (
  <div className={`level-${position}`}>
    <Action className="level-item" {...props} />
  </div>
)

CardAction.propTypes = {
  position: PropTypes.string.isRequired,
}

CardAction = flattenProp('action')(CardAction)

const LeftAction = compose(
  branch(
    (props) => props.action == null,
    renderComponent(() => <div className="level-left" />),
  ),
  withProps({ position: 'left' }),
)(CardAction)

const RightAction = compose(
  branch(
    (props) => props.action == null,
    renderNothing,
  ),
  withProps({ position: 'right' }),
)(CardAction)


let Actions = ({ hiddenActions = true, leftAction, rightAction }) => (
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

Actions = branch(
  ({ leftAction, rightAction }) => leftAction == null && rightAction == null,
  renderNothing,
)(Actions)


const Card = ({ children, ...actions }) => (
  <div className={`card ${styles.card}`}>
    <div className={`card-content ${styles.cardContent}`}>
      {children}
      <Actions {...actions} />
    </div>
  </div>
)

Card.propTypes = {
  children: PropTypes.node.isRequired,
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

export default Card
