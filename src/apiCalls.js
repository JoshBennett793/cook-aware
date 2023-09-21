/* eslint-disable no-undef */
export default async function fetchFromAPI(query) {
  const accessPoint = 'https://api.edamam.com/api/recipes/v2'
  const apiID = process.env.API_ID
  const apiKey = process.env.API_KEY

  try {
    const response = await fetch(
      `${accessPoint}?type=public&q=${query.trim()}&app_id=${apiID}&app_key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error('Something went wrong fetching data')
    }

    return await response.json()
  } catch (error) {
    return error
  }
}
