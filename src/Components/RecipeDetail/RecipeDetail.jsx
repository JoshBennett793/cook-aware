import { useParams } from 'react-router-dom'
import { useRecipes } from '../../context/ContextProvider'
import { useEffect } from 'react'

function RecipeDetail() {
  const { isDataAvailable, fetchRecipes, recipeData } = useRecipes() // type check
  const { uri } = useParams()
  console.log(uri)
  const encodedUri = encodeURIComponent(uri)

  useEffect(() => {
    console.log('refetching?')
    fetchRecipes(undefined, encodedUri)
  }, [])

  const recipe = recipeData?.hits?.[0]?.recipe

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

  const fatMacros = Object.keys(recipe.totalNutrients).reduce((acc, key) => {
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

  const macros = (
    <ul className='fat-macros'>
      {fatMacros.map(macro => {
        return (
          <li key={macro.label}>
            <span>{macro.label}</span>
            <span>{macro.quantity}</span>
            <span>{macro.dv ? `${macro.dv}%` : ''}</span>
            <hr></hr>
          </li>
        )
      })}
    </ul>
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
            {macros}
          </section>
        </>
      ) : (
        <p>Loading details...</p>
      )}
    </>
  )
}

export default RecipeDetail
