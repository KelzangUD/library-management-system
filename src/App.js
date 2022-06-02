import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BooksProvider } from './context/bookContext/BooksContext';
import {UserProvider} from './context/userContext/UserContext';

import Navbar from './layout/Navbar';
import CreateAccount from './pages/CreateAccount';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Admin from './pages/Admin';
import EditBookRequest from './components/EditBookRequest';
import NotFound from './pages/NotFound';
// import Footer from './layout/Footer';



import './App.css';
import Book from './pages/Book';

function App() {
  return (
    <BooksProvider>
      <UserProvider>
        <div>
        <Router>
        <Navbar/>
            <main className="container mx-auto px-3 pd-12">
            <Routes>
                <Route path='/admin' element={<Admin/>} />
                <Route path='/' element={<Home/>} />
                <Route path='/book/:title' element={<Book/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/signup' element={<CreateAccount/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/forgotPassword' element={<ForgotPassword/>} />
                <Route path='/editBookRequest' element={<EditBookRequest/>} />
                <Route path='/notfound' element={<NotFound/>} />
                <Route path='/*' element={<NotFound/>} />
            {/* <Footer /> */}
            </Routes>
            </main>
        </Router>
        </div>
        <ToastContainer />
      </UserProvider>
    </BooksProvider>
  );
}

export default App;
