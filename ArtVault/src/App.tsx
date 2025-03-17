import './App.css'
import { BrowserRouter as Router,Routes, Route, } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ArtContextProvider from './contexts/ArtContext'
import Artwork from './pages/Artwork'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import UserContextProvider from './contexts/UserContext'
import Gallery from './pages/Gallery'
import Logout from './pages/Logout'
import Landing from './pages/Landing'
import Footer from './components/Footer'


function App() {

  return (
    <>
    <Router>
      <UserContextProvider>
        <Navbar/>
          <ArtContextProvider>
              <Routes>
                <Route index element={<Landing/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/art/:id' element={<Artwork/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/login' element={<LogIn/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/gallery' element={<Gallery/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Routes>
          </ArtContextProvider>
          <Footer/>
      </UserContextProvider>
    </Router>
    </>
  )
}

export default App
