import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Weather from './page/weather'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path='*'></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
