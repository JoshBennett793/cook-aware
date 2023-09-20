import Search from '../Search/Search'
import Results from '../Results/Results'
import { useState } from 'react'

export default function Home() {
  const [recipeData, setRecipeData] = useState({})

  return (
    <>
      <Search setRecipeData={setRecipeData} />
      <main>
        <Results recipeData={recipeData} />
      </main>
    </>
  )
}
