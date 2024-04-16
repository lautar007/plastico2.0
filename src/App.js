import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Artistico from './components/Artistico';
import Comercial from './components/Comercial';
import Blog from './components/Blog';
import Staff from './components/Staff';
import Administracion from './components/Admin';
import Navbar from './components/partials/Navbar';
import Footer from './components/partials/Footer';
import PostForm from './components/PostForm';
import EditPorts from './components/EditPort';
import EditPosts from './components/Editpost';
import Mensajeria from './components/Mensajeria';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route exact path='/' element = {<div><Navbar/><Home/><Footer/></div>}/>
          <Route exact path='/artistico' element = {<div><Navbar/><Artistico/><Footer/></div>}/>
          <Route exact path='/comercial' element = {<div><Navbar/><Comercial/><Footer/></div>}/>
          <Route exact path='/blog' element = {<div><Blog/></div>}/>
          <Route exact path='/staff' element = {<div><Staff/></div>}/>
          <Route exact path='/admin' element = {<div><Navbar/><Administracion/></div>}/>
          <Route exact path='/postForm' element = {<div><Navbar/><PostForm/></div>}/>
          <Route exact path='/editPorts' element = {<div><Navbar/><EditPorts/></div>}/>
          <Route exact path='/editPosts' element = {<div><Navbar/><EditPosts/></div>}/>
          <Route exact path='/mensajeria' element = {<div><Navbar/><Mensajeria/></div>}/>
          <Route exact path='/work/:id' element = {<div><Navbar/><PostDetail/><Footer/></div>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
