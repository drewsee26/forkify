import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'
/** Global state of the app
    Search object
    Current recipe object
    Shopping list object
    Liked recipes
**/
const state = {}

/** Search Controller **/
const controlSearch = async () => {
    // Get query from view
    const query = searchView.getInput()
    if (query) {
        // New search object and add to state
        state.search = new Search(query)
        // Prepare UI for results
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchRes)

        try {
          // Search for recipes
          await state.search.getResults()

          // Render results on UI
          clearLoader()
          searchView.renderResults(state.search.result)

        } catch (error) {
          alert('Something wrong with the search')
          clearLoader()
        }
    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10)
        searchView.clearResults()
        searchView.renderResults(state.search.result, goToPage)
    }
})

/** Recipe Controller **/
const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace('#', '')
  console.log(id)

  if (id) {
    // Prepare UI for changes

    // Create new recipe object
    state.recipe = new Recipe(id)

    try {
      // Get recipe data
      await state.recipe.getRecipe()
      // Calculate servings and time
      state.recipe.calcServings()
      state.recipe.calcTime()
      // Render recipe
      console.log(state.recipe)

    } catch(error) {
      alert('Error processing recipe')
    }
  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))
