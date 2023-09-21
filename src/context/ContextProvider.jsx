import { createContext, useContext, useState } from 'react'
import fetchFromAPI from '../apiCalls'

const RecipeContext = createContext()

export function RecipeContextProvider({ children }) {
  const [recipeData, setRecipeData] = useState({
    isDataAvailable: false,
    recipeData: {}
  })
  const [error, setError] = useState('')

  async function fetchRecipes(query) {
    const data = await fetchFromAPI(query)
    if (data.name === 'Error') {
      setRecipeData({ isDataAvailable: false, data: {}, message: data.message })
    } else {
      setRecipeData({ isDataAvailable: true, recipeData: data })
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
    throw new Error('useRecipes must be used within RecipeProvider')
  }
  return recipes
}
