import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'redux-first-router-link'
import { compose, mapProps } from 'recompose'
import {
  EVENT_GALLERY, EVENT_ADD, EVENT_EDIT, RECIPE_GALLERY, EVENT_DETAIL_EDIT,
} from 'data/page/actions'
import EventsGallery from 'pages/EventsGallery'
import EventAdd from 'pages/EventAdd'
import EventEdit from 'pages/EventEdit'
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
            <NavLink
              to={{ type: EVENT_GALLERY }}
              className="is-tab"
              activeClassName="is-active"
              isActive={(_, location) => (
                [ EVENT_GALLERY, EVENT_ADD, EVENT_EDIT, EVENT_DETAIL_EDIT ].includes(location.type)
              )}
            >
              Eventos
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink
              to={{ type: RECIPE_GALLERY }}
              className="is-tab"
              activeClassName="is-active"
            >
              Recetas
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
    {Page ? <Page /> : null}
  </main>
)

App.propTypes = {
  Page: PropTypes.func,
}

const pages = {
  [EVENT_GALLERY]: EventsGallery,
  [EVENT_ADD]: EventAdd,
  [EVENT_EDIT]: EventEdit,
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
