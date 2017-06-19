import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'
import classNames from 'classnames'
import { compose, mapProps } from 'recompose'
import { EVENT_GALLERY, RECIPE_GALLERY, RECIPE_EDIT, RECIPE_ADD } from 'pages/routes'
import EventsGallery from 'pages/EventsGallery'
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
              className={classNames('is-tab', { 'is-active': Page === EventsGallery })}
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
  [RECIPE_GALLERY]: RecipeGallery,
  [RECIPE_EDIT]: RecipeGallery,
  [RECIPE_ADD]: RecipeGallery,
}

const mapStateToProps = (state) => ({
  page: state.location.type,
})

const enhancer = compose(
  connect(mapStateToProps),
  mapProps(({ page }) => ({ Page: pages[page] })),
)

export default enhancer(App)
