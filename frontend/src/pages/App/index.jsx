import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'
import classNames from 'classnames'
import { compose, mapProps } from 'recompose'
import { EVENT_GALLERY, EVENT_ADD, RECIPE_GALLERY } from 'data/page/actions'
import EventsGallery from 'pages/EventsGallery'
import EventAdd from 'pages/EventAdd'
import RecipeGallery from 'pages/RecipeGallery'

const App = ({ Page }) => (
  <main>
    <header className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-1">
            Catering Colectivo
          </h1>
        </div>
      </div>
    </header>
    <nav className="nav">
      <div className="container">
        <div className="nav-left">
          <div className="nav-item">
            <Link
              href={{ type: EVENT_GALLERY }}
              className={classNames('is-tab', {
                'is-active': [ EventsGallery, EventAdd ].includes(Page),
              })}
            >
              Eventos
            </Link>
          </div>
          <div className="nav-item">
            <Link
              href={{ type: RECIPE_GALLERY }}
              className={classNames('is-tab', { 'is-active': Page === RecipeGallery })}
            >
              Recetas
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <section className="section">
      <div className="container">
        {Page ? <Page /> : null}
      </div>
    </section>
  </main>
)

App.propTypes = {
  Page: PropTypes.func,
}

const pages = {
  [EVENT_GALLERY]: EventsGallery,
  [EVENT_ADD]: EventAdd,
  [RECIPE_GALLERY]: RecipeGallery,
}

const mapStateToProps = (state) => ({
  page: state.page,
})

const enhancer = compose(
  connect(mapStateToProps),
  mapProps(({ page }) => ({ Page: pages[page] })),
)

export default enhancer(App)
