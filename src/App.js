import './App.css';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Timeline } from './components/Timeline'; 
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { Todo } from './components/Todo/Todo';
import { MyContextProvider } from './contexts/MyContext';
import { Background } from './components/Background';
import { Info } from './components/Info';

function App() {
  return (
    <div className="App">
      <Background>
      <MyContextProvider>
        <BrowserRouter>
          <Header />
    
          <Routes>
            <Route path='/' exact element={<Home />}/>
            <Route path='home' element={<Home />}/> 
            <Route path='timeline' element={<Timeline />}/> 
            <Route path='todos' element={<Todo />}/> 
            <Route path='login' element={<Login />}/>
            <Route path='info' element={<Info />}/>
          </Routes>
        </BrowserRouter>
      </MyContextProvider>
      </Background>
    </div>
  );
}

export default App;
