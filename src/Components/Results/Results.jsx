import { useEffect } from 'react'
import { useRecipes } from '../../context/ContextProvider'
import ResultCard from '../ResultCard/ResultCard'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

function Results() {
  const { isDataAvailable, fetchRecipes, recipeData } = useRecipes()
  const { query } = useParams()

  useEffect(() => {
    if (query) {
      fetchRecipes(query)
    }
  }, [query])

  if (!query) {
    return (
      <>
        <h2 className='recipe-heading'>Recipes</h2>
        <section className='results-container'>
          <p>Your recipes will appear here...</p>
        </section>
      </>
    )
  }

  return (
    <>
      <h2 className='recipe-heading'>Recipes</h2>
      <section className='results-container'>
        {isDataAvailable ? (
          recipeData?.hits.map(({ recipe }) => (
            <ResultCard recipe={recipe} key={recipe.uri} />
          ))
        ) : (
          <p>Loading {query} recipes...</p>
        )}
      </section>
    </>
  )
}

useRecipes.propTypes = {
  isDataAvailable: PropTypes.bool.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  recipeData: PropTypes.shape({
    hits: PropTypes.arrayOf(
      PropTypes.shape({
        recipe: PropTypes.shape({
          uri: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          images: PropTypes.shape({
            SMALL: PropTypes.shape({
              url: PropTypes.string
            })
          }),
          source: PropTypes.string,
          shareAs: PropTypes.string,
          yield: PropTypes.number.isRequired,
          dietLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
          healthLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
          ingredientLines: PropTypes.arrayOf(PropTypes.string).isRequired,
          calories: PropTypes.number.isRequired
        }).isRequired
      })
    )
  }).isRequired
}

export default Results
