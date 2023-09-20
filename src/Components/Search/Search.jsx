import { useState } from 'react'
import './Search.scss'
import fetchRecipes from '../../apiCalls'
import mockData from '../../mockData'

export default function Search({ setRecipeData }) {
  const [formData, setFormData] = useState({
    query: ''
  })

  const updateFormData = e => {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const submitForm = async e => {
    e.preventDefault()
    // const data = await fetchRecipes(formData.query)
    // setRecipeData(data)
    setRecipeData(mockData)
  }

  return (
    <form onSubmit={submitForm}>
      <input
        type='text'
        name='query'
        id='queryInput'
        placeholder='Search by keyword... (optional)'
        onChange={updateFormData}
      />
      <button type='submit'>Search</button>
    </form>
  )
}
