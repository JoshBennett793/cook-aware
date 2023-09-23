import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useRecipes } from '../../context/ContextProvider'
import { useEffect } from 'react'

function RecipeDetail() {
  const { isDataAvailable, fetchRecipes, data } = useRecipes()
  const { uri } = useParams()
  const encodedUri = encodeURIComponent(uri)

  useEffect(() => {
    fetchRecipes(undefined, encodedUri)
  }, [encodedUri])

  const recipe = data?.hits?.[0]?.recipe

  const labelAndImg = (
    <>
      <h2 className='recipe-detail-label'>{recipe.label}</h2>
      <div>
        <img
          className='recipe-detail-img'
          src={recipe.images.THUMBNAIL.url}
          alt={recipe.label}
        />
        <p className='full-recipe-link'>
          See full recipe on: <br></br>
          <a className='recipe-link' href={recipe.url}>
            {recipe.source}
          </a>
        </p>
      </div>
    </>
  )

  const ingredients = (
    <>
      <h3>{recipe.ingredientLines.length} Ingredients</h3>
      <hr></hr>
      <ol className='ingredients-list'>
        {recipe.ingredientLines.map(ing => {
          return (
            <li key={ing}>
              <input type='checkbox' name={ing} id={ing} />
              <label htmlFor={ing}>{ing}</label>
              <br></br>
            </li>
          )
        })}
      </ol>
    </>
  )

  const nutrition = (
    <>
      <h3>Nutrition</h3>
      <hr></hr>

      <div className='calories-container'>
        <div className='calories'>
          {(recipe.calories / recipe.yield).toFixed(0)}
          <br></br>
          <span>CAL/SERV</span>
        </div>

        <div className='calories-daily-value'>
          {recipe.totalDaily.ENERC_KCAL.quantity.toFixed(0)} %<br></br>
          <span>DAILY VALUE</span>
        </div>
      </div>

      <hr></hr>
      <br></br>
      <p className='recipe-detail-health-labels'>
        {recipe.healthLabels.join(', ')}
      </p>
    </>
  )

  const fatMacros = () => {
    const fats = Object.keys(recipe.totalNutrients).reduce((acc, key) => {
      if (key.includes('FA')) {
        const nutrient = recipe.totalNutrients[key]
        const dailyValue = recipe.totalDaily[key]
        acc.push({
          label: nutrient.label,
          quantity: `${nutrient.quantity.toFixed(0)}${nutrient.unit}`,
          dv: dailyValue?.quantity.toFixed(0)
        })
        return acc
      }
      return acc
    }, [])

    return (
      <article className='fat-macros'>
        {fats.map(fat => {
          return (
            <div className='macro-item' key={fat.label}>
              <div className='macro-grid'>
                <span className='first-span'>{fat.label}</span>
                <span className='second-span'>{fat.quantity}</span>
                <span className='third-span'>{fat.dv ? `${fat.dv}%` : ''}</span>
              </div>
              <hr />
            </div>
          )
        })}
        <br />
      </article>
    )
  }

  const carbMacros = () => {
    const nutrientValues = [
      'CHOCDF',
      'CHOCDF.net',
      'FIBTG',
      'SUGAR',
      'SUGAR.added'
    ]

    const carbs = Object.keys(recipe.totalNutrients).reduce((acc, key) => {
      if (nutrientValues.includes(key)) {
        const nutrient = recipe.totalNutrients[key]
        const dailyValue = recipe.totalDaily[key]
        acc.push({
          label: nutrient.label,
          quantity: `${nutrient.quantity.toFixed(0)}${nutrient.unit}`,
          dv: dailyValue?.quantity.toFixed(0)
        })
        return acc
      }
      return acc
    }, [])

    return (
      <article className='carb-macros'>
        {carbs.map(carb => {
          return (
            <div className='macro-item' key={carb.label}>
              <div className='macro-grid'>
                <span className='first-span'>{carb.label}</span>
                <span className='second-span'>{carb.quantity}</span>
                <span className='third-span'>
                  {carb.dv ? `${carb.dv}%` : ''}
                </span>
              </div>
              <hr />
            </div>
          )
        })}
        <br />
      </article>
    )
  }

  const remainingMacros = () => {
    const wrongKeys = [
      'ENERC_KCAL',
      'FAT',
      'FASAT',
      'FATRN',
      'FAMS',
      'FAPU',
      'CHOCDF',
      'CHOCDF.net',
      'FIBTG',
      'SUGAR',
      'SUGAR.added'
    ]

    const macros = Object.keys(recipe.totalNutrients).reduce((acc, key) => {
      if (!wrongKeys.includes(key)) {
        const nutrient = recipe.totalNutrients[key]
        const dailyValue = recipe.totalDaily[key]
        acc.push({
          label: nutrient.label,
          quantity: `${nutrient.quantity.toFixed(0)}${nutrient.unit}`,
          dv: dailyValue?.quantity.toFixed(0)
        })
        return acc
      }
      return acc
    }, [])

    return (
      <article className='remaining-macros'>
        {macros.map(macro => {
          return (
            <div className='macro-item' key={macro.label}>
              <div className='macro-grid'>
                <span className='first-span'>{macro.label}</span>
                <span className='second-span'>{macro.quantity}</span>
                <span className='third-span'>
                  {macro.dv ? `${macro.dv}%` : ''}
                </span>
              </div>
              <hr />
            </div>
          )
        })}
        <br />
      </article>
    )
  }

  const allMacros = (
    <>
      {fatMacros()}
      {carbMacros()}
      {remainingMacros()}
    </>
  )

  return (
    <>
      {isDataAvailable ? (
        <>
          <section className='recipe-detail-label-and-img recipe-detail-section'>
            {labelAndImg}
          </section>

          <section className='recipe-detail-ingredients recipe-detail-section'>
            {ingredients}
          </section>

          <section className='recipe-detail-nutrition recipe-detail-section'>
            {nutrition}
          </section>

          <section className='recipe-detail-macros recipe-detail-section'>
            <div className='column-titles'>
              <span>Macro</span>
              <span>Amount</span>
              <span>D/V</span>
            </div>
            {allMacros}
          </section>
        </>
      ) : (
        <p>Loading details...</p>
      )}
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
          calories: PropTypes.number.isRequired,
          totalNutrients: PropTypes.objectOf(
            PropTypes.shape({
              label: PropTypes.string.isRequired,
              quantity: PropTypes.number.isRequired,
              unit: PropTypes.string.isRequired
            })
          ).isRequired,
          totalDaily: PropTypes.objectOf(
            PropTypes.shape({
              label: PropTypes.string.isRequired,
              quantity: PropTypes.number.isRequired,
              unit: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired
      })
    )
  }).isRequired
}

export default RecipeDetail
