// import './Search.scss'
import mockData from '../../mockData'
import fetchRecipes from '../../apiCalls'
import PropTypes from 'prop-types'
import { useState } from 'react'

function Search({ setRecipeData }) {
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
    <div className="form-wrapper">
      <form className='search-form' onSubmit={submitForm}>
        <div className='search-bar-wrapper'>
          <input
            type='text'
            name='query'
            id='queryInput'
            placeholder='Search by keyword... (optional)'
            onChange={updateFormData}
          />
        </div>
        <div className='button-wrapper'>
          <button type='submit'>Search</button>
        </div>
      </form>
    </div>
  )
}

Search.propTypes = {
  setRecipeData: PropTypes.func.isRequired
}

export default Search
