import SignUpPage from "./components/Signup";
import LoginPage from "./components/Login";
import {BrowserRouter as  Router , Route , Routes} from 'react-router-dom';


export default function App() {

  return (
    <>
    <Router>
     <Routes>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
     </Routes>
     </Router>
      </>
  );
}