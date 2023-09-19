import { useState } from 'react'
import './Search.scss'
import fetchRecipes from '../../apiCalls'

export default function Search() {
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

  const submitForm = e => {
    e.preventDefault()
    fetchRecipes(formData.query)
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
