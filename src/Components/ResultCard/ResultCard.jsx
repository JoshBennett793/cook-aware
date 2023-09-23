import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ResultCard({ recipe }) {
  const {
    uri,
    label,
    calories,
    yield: servings,
    images,
    ingredientLines
  } = recipe
  const encodedUri = encodeURIComponent(uri)
  const imageUrl = images.SMALL.url
  const regex = /recip(?:e|es)/gi
  const formattedLabel = label.replace(regex, '').trim()
  const formattedCalories = (calories / servings).toFixed(0)
  const numOfIngredients = ingredientLines.length

  return (
    <article className='recipe-card'>
      <Link to={`/recipe/${encodedUri}`} className='recipe-link'>
        <img src={imageUrl} alt={label} className='recipe-img' />
        <p className='recipe-label'>{formattedLabel}</p>
        <div className='recipe-text-wrapper'>
          <p className='recipe-calories'>
            <span className='recipe-card-num'>{formattedCalories}</span>{' '}
            Calories
          </p>
          <div className='divider'>|</div>
          <p className='recipe-ingredients-num'>
            <span>{numOfIngredients}</span> Ingredients
          </p>
        </div>
      </Link>
    </article>
  )
}

ResultCard.propTypes = {
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
}

export default ResultCard
