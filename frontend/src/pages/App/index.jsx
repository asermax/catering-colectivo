import React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import routes from 'pages/routes'
import EventsGallery from 'pages/EventsGallery'
import RecipeGallery from 'pages/RecipeGallery'

const App = () => (
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
              to={routes.EVENTS_GALLERY} exact
              className="is-tab"
              activeClassName="is-active"
            >
              Eventos
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink
              to={routes.RECIPE_GALLERY}
              className="is-tab"
              activeClassName="is-active"
            >
              Recetas
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
    <section className="section">
      <div className="container">
        <Switch>
          <Route path={routes.RECIPE_GALLERY} component={RecipeGallery} />
          <Route path={routes.EVENTS_GALLERY} component={EventsGallery} />
        </Switch>
      </div>
    </section>
  </main>
)

export default App
