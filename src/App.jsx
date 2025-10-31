import SignUpPage from "./components/Signup";
import LoginWebPage from "./pages/LoginPage";
import {BrowserRouter as  Router , Route , Routes} from 'react-router-dom';


export default function App() {

  return (
    <>
    <Router>
     <Routes>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginWebPage/>}/>
     </Routes>
     </Router>
      </>
  );
}