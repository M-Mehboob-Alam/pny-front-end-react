import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import { Route, Routes } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import Product from './components/Product';
import AuthPages from './components/AuthPages';
import ViewProduct from './components/ViewProduct';

function App() {
  return (
        <>
          <MainHeader></MainHeader>
          <Routes>
            <Route path='/' element={<Home/>}  / >

              <Route  element={<AuthPages/>}>
                <Route path='/add-product' element={<AddProduct/>} />
              </Route>
              <Route  path='/products' element={<Product/>} />
              <Route path='/products/:id' element={<ViewProduct /> } exact />

              <Route path='/signup' element={<SignupForm/>} />              
            <Route path='*' element={<h1>404 not found</h1>} />
          </Routes>
          <MainFooter/>
        </>
  );
}

export default App;
