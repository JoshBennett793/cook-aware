/* eslint-disable no-undef */
export async function fetchAllRecipes(query) {
  const accessPoint = 'https://api.edamam.com/api/recipes/v2'
  const apiID = import.meta.env.VITE_API_ID
  const apiKey = import.meta.env.VITE_API_KEY

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
  const apiID = process.env.API_ID
  const apiKey = process.env.API_KEY

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
