import React from 'react'
import PropTypes from 'prop-types'
import { coalesce } from 'utils'
import styles from './styles.scss'

const VerticalCenteredContent = (props) => (
  <div className={`${styles.container} ${coalesce(props.className, '')}`}>
    <div className={styles.shim} />
    <div className={styles.content}>
      {props.children}
    </div>
    <div className={styles.shim} />
  </div>
)

VerticalCenteredContent.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
}

export default VerticalCenteredContent
