import { useParams } from 'react-router-dom'
import { useRecipes } from '../../context/ContextProvider'
import { useEffect } from 'react'

function RecipeDetail() {
  const { isDataAvailable, fetchRecipes, recipeData } = useRecipes()
  const { uri } = useParams()
  console.log('uri from RecipeDetail', uri)
  const encodedUri = encodeURIComponent(uri)
  console.log('encoded uri from RecipeDetail: ', encodedUri)

  useEffect(() => {
    'calling '
    fetchRecipes(undefined, encodedUri) // no query passed to fetch call
  }, [uri])

  const recipe = recipeData.hits[0].recipe

  return (
    <>
      {isDataAvailable ? (
        <>
          <section className='recipe-detail-label-and-img'>
            <p className='recipe-detail-label'>{recipe.label}</p>
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
          </section>
        </>
      ) : (
        <p>Loading details...</p>
      )}
    </>
  )
}

export default RecipeDetail
