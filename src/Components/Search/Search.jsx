import mockData from '../../mockData'
import { useState } from 'react'
import { useRecipes } from '../../context/ContextProvider'
import PropTypes from 'prop-types'

function Search() {
  const [formData, setFormData] = useState({
    query: ''
  })
  const { fetchRecipes } = useRecipes()

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
    fetchRecipes(formData.query)
  }

  return (
    <div className='form-wrapper'>
      <form className='search-form' onSubmit={submitForm}>
        <div className='search-bar-wrapper'>
          <label
            className='query-input-label'
            htmlFor='queryInput'
            aria-label='Search input'
          ></label>
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

useRecipes.propTypes = {
  fetchRecipes: PropTypes.func.isRequired
}

export default Search
