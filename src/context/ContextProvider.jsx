import { createContext, useContext, useState } from 'react'
import { fetchAllRecipes, fetchSingleRecipe } from '../apiCalls'

const RecipeContext = createContext()

export function RecipeContextProvider({ children }) {
  const [recipeData, setRecipeData] = useState({
    errorOccurred: false,
    isDataAvailable: false,
    data: null,
    errMsg: ''
  })
  const [error, setError] = useState('')

  async function fetchRecipes(query, uri) {
    let data

    if (uri) {
      data = await fetchSingleRecipe(uri)
    } else {
      data = await fetchAllRecipes(query)
    }

    if (data.name === 'Error') {
      setRecipeData({
        errorOccurred: true,
        data: null,
        errMsg: data.message
      })
    } else {
      setRecipeData({ isDataAvailable: true, data })
    }
  }

  const value = {
    ...recipeData,
    fetchRecipes,
    error,
    setError
  }

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  )
}

export function useRecipes() {
  const recipes = useContext(RecipeContext)
  if (!recipes) {
    console.warn('useRecipes must be used within RecipeProvider')
    throw new Error('useRecipes must be used within RecipeProvider')
  }
  return recipes
}
