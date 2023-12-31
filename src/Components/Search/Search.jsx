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
    const regex = /^[a-zA-Z0-9\s]+$/
    if (!formData.query) {
      setError('The search query cannot be blank')
    } else if (!regex.test(formData.query)) {
      setError('The search keyword may only contain letters and numbers')
    } else {
      setError('')
      navigate(`/recipes/${formData.query}`)
    }
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
        {error && <p className='err-msg'>{error}</p>}
      </form>
    </div>
  )
}

useRecipes.propTypes = {
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
}

export default Search
