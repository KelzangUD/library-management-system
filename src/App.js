import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { BooksProvider } from './context/bookContext/BooksContext';
import {UserProvider} from './context/userContext/UserContext';

import Navbar from './layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
// import Footer from './layout/Footer';



import './App.css';

function App() {
  return (
    <BooksProvider>
      <UserProvider>
        <Router>
          <div>
            <Navbar/>
            <main className="container mx-auto px-3 pd-12">
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/auth' element={<Auth/>} />
                <Route path='/admin' element={<Admin/>} />
                <Route path='/notfound' element={<NotFound/>} />
                <Route path='/*' element={<NotFound/>} />
            </Routes>
            </main>
            {/* <Footer /> */}
          </div>
        </Router>
      </UserProvider>
    </BooksProvider>
  );
}

export default App;
