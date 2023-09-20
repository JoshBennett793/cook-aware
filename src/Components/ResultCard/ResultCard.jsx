import PropTypes from 'prop-types'

function ResultCard({ recipe }) {
  const { label, source, calories, yield: servings, images } = recipe
  const imageUrl = images.SMALL.url
  const formattedLabel = label.replace(' recipes', '')
  const formattedCalories = (calories / servings).toFixed(0)

  return (
    <article>
      <img
        src={imageUrl}
        alt='Thumbnail of cooked dish that pertains to recipe'
      />
      <p>{formattedLabel}</p>
      <p>Source: {source}</p>
      <p>{formattedCalories} Calories</p>
    </article>
  )
}

ResultCard.propTypes = {
  recipe: PropTypes.shape({
    label: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    yield: PropTypes.number.isRequired,
    images: PropTypes.shape({
      SMALL: PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    }).isRequired
  }).isRequired
}

export default ResultCard
