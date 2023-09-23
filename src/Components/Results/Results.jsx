import { useEffect, useState } from 'react'
import { useRecipes } from '../../context/ContextProvider'
import ResultCard from '../ResultCard/ResultCard'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

function Results() {
  const { isDataAvailable, fetchRecipes, errorOccurred, errMsg, data } =
    useRecipes()
  const [result, setResult] = useState(undefined)
  const { query } = useParams()

  useEffect(() => {
    if (query) {
      setResult(<p className='loading-state'>Loading {query} recipes...</p>)
      fetchRecipes(query)
    } else {
      setResult(<p>Your recipes will appear here...</p>)
    }
  }, [query])

  useEffect(() => {
    if (errorOccurred) {
      setResult(<p className='err-msg'>{errMsg}</p>)
    }
  }, [errorOccurred, errMsg])

  return (
    <>
      <h2 className='recipe-heading'>Recipes</h2>
      <section className='results-container'>
        {isDataAvailable
          ? data.hits.map(({ recipe }) => (
              <ResultCard recipe={recipe} key={recipe.uri} />
            ))
          : result}
      </section>
    </>
  )
}

useRecipes.propTypes = {
  isDataAvailable: PropTypes.bool.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  errorOccurred: PropTypes.bool.isRequired,
  errMsg: PropTypes.string.isRequired,
  data: PropTypes.shape({
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
