import { createContext, useContext, useState } from 'react'
import fetchFromAPI from '../apiCalls'

const RecipeContext = createContext()

export function RecipeContextProvider({ children }) {
  const [recipeData, setRecipeData] = useState({})

  async function fetchRecipes(query) {
    const data = await fetchFromAPI(query)
    setRecipeData(data)
  }

  const value = {
    recipeData,
    fetchRecipes
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
