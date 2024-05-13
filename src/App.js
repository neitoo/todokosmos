import { useContext } from 'react';
import './styles/index.css';
import { Auth } from './context/Auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import SignIn from './pages/SignIn';

function App() {
  const {isUserLogged} = useContext(Auth);
  return (
    <BrowserRouter>
      <Routes>
        {isUserLogged ? (
          <Route path="/todokosmos/tasks" element={<Main/>}/>
        ) : (
          <>
          <Route path="/todokosmos/sign-in" element={<SignIn/>}/>
          </>
        )}
        <Route path="*" element={<Navigate to={isUserLogged ? "/todokosmos/tasks" : "/todokosmos/sign-in"}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
