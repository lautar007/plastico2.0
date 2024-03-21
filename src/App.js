import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Artistico from './components/Artistico';
import Comercial from './components/Comercial';
import Blog from './components/Blog';
import Staff from './components/Staff';
import Administracion from './components/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route exact path='/' element = {<div><Home/></div>}/>
          <Route exact path='/artistico' element = {<div><Artistico/></div>}/>
          <Route exact path='/comercial' element = {<div><Comercial/></div>}/>
          <Route exact path='/blog' element = {<div><Blog/></div>}/>
          <Route exact path='/staff' element = {<div><Staff/></div>}/>
          <Route exact path='/admin' element = {<div><Administracion/></div>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
