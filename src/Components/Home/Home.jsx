import Search from '../Search/Search'
import Results from '../Results/Results'
import { useState } from 'react'

export default function Home() {
  const [recipeData, setRecipeData] = useState({})

  return (
    <>
      <Search setRecipeData={setRecipeData}/>
      <main>
        <h2>Recipes</h2>
        <Results recipeData={recipeData} />
      </main>
    </>
  )
}
