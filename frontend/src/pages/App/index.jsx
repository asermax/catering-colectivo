import React from 'react'
import { Route } from 'react-router-dom'
import RecipeGallery from 'pages/RecipeGallery'

const App = () => (
  <main>
    <div className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-1">
            Catering Colectivo
          </h1>
        </div>
      </div>
    </div>
    <section className="section">
      <div className="container">
        <Route path='/' component={RecipeGallery} />
      </div>
    </section>
  </main>
)

export default App
