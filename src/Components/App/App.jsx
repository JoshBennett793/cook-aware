import { Route, Routes } from 'react-router-dom'
import Search from '../Search/Search'
import Results from '../Results/Results'
import RecipeDetail from '../RecipeDetail/RecipeDetail'

function App() {
  return (
    <>
      <header>
        <h1 className='app-name-heading'>Cook Aware</h1>
      </header>
      <Search />
      <main>
        <Routes>
          <Route path='/' element={<Results />}></Route>
          <Route path='/recipes/:query' element={<Results />}></Route>
          <Route path='/recipe/:uri' element={<RecipeDetail />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
