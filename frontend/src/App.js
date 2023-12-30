import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path='/' element={<DashBoard/>}/>  
            <Route path='/login' element={<Login/>}/>  
            <Route path='/register' element={<Register/>}/>  
          </Routes>  
        </div>    
      </Router>
    </>
  );
}

export default App;
