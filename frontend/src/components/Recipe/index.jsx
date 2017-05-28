import React from 'react'
import styles from './styles.scss'

const Recipe = () => (
  <div className={`card ${styles.fullHeightCard}`}>
    <div className="card-content">
      <h1 className="title">
        Ingrediente
      </h1>
      <h2 className="subtitle">
        Descripción del ingrediente
      </h2>
      <div className="notification has-text-centered">
        Cantidad
        <span className={styles.perKeyword}>por</span>
        Proporción personas
      </div>
      <nav className="level">
        <div className="level-left">
          <a className="level-item">
            <span className="icon is-small">
              <i className="fa fa-pencil" />
            </span>
          </a>
        </div>
        <div className="level-right" >
          <a className="level-item">
            <span className="icon is-small">
              <i className="fa fa-trash" />
            </span>
          </a>
        </div>
      </nav>
    </div>
  </div>
)

export default Recipe
