import { useState } from 'react'
import { useRecipes } from '../../context/ContextProvider'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [formData, setFormData] = useState({
    query: ''
  })
  const { error, setError } = useRecipes()
  const navigate = useNavigate()

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
    formData.query
      ? navigate(`/recipes/${formData.query}`)
      : setError('The search query cannot be blank')
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
            placeholder='Search by keyword...'
            onChange={updateFormData}
          />
        </div>
        <div className='button-wrapper'>
          <button type='submit'>Search</button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

useRecipes.propTypes = {
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
}

export default Search
