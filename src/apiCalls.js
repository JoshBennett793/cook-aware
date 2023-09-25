/* eslint-disable no-undef */
export async function fetchAllRecipes(query) {
  const accessPoint = 'https://api.edamam.com/api/recipes/v2'
  const apiID = '53e00481'
  const apiKey = '096ce025773d4b55fe49d5b246a952ae'

  try {
    const response = await fetch(
      `${accessPoint}?type=public&q=${query.trim()}&app_id=${apiID}&app_key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error('Something went wrong fetching data')
    }

    const data = await response.json()

    if (!data.count) {
      throw new Error(
        'Your search did not produce any results. Please try a different search'
      )
    }
    return data
  } catch (error) {
    return error
  }
}
export async function fetchSingleRecipe(uri) {
  const accessPoint = 'https://api.edamam.com/api/recipes/v2'
  const apiID = '53e00481'
  const apiKey = '096ce025773d4b55fe49d5b246a952ae'

  try {
    const response = await fetch(
      `${accessPoint}/by-uri?type=public&uri=${uri}&app_id=${apiID}&app_key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error('Something went wrong fetching single recipe data')
    }

    return await response.json()
  } catch (error) {
    return error
  }
}
