import { Route, Routes } from 'react-router-dom'
import Search from '../Search/Search'
import Results from '../Results/Results'

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
        </Routes>
      </main>
    </>
  )
}

export default App
