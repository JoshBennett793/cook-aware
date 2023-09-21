import { useRecipes } from '../../context/ContextProvider'
import ResultCard from '../ResultCard/ResultCard'
import PropTypes from 'prop-types'

function Results() {
  const { recipeData } = useRecipes()
  const recipes = recipeData.hits
  const results = recipes?.map(({ recipe }) => {
    return <ResultCard recipe={recipe} key={recipe.uri} />
  })

  return (
    <>
      <h2 className='recipe-heading'>Recipes</h2>
      <section className='results-container'>{results}</section>
    </>
  )
}

useRecipes.propTypes = {
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
