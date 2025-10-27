import SignUpPage from "./components/Signup";
import LoginPage from "./components/Login";
import Page1 from "./components/Page1";
import AlertSystem from "./components/AlertSystem";
import Header from "./components/header";
import RatingSystem from  "./components/RatingSystem";
import MapComponent from "./components/MapComponent";
import CommunityRoutes from "./components/CommunityRoutes";
import {BrowserRouter as  Router , Route , Routes} from 'react-router-dom';


export default function App() {

  return (
    <>
    <Router>
     <Routes>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/Page1" element={<Page1/>}/>
      <Route path="/AlertSystem" element={<AlertSystem/>}/>
      <Route path="/Header" element={<Header/>}/>
      <Route path="/RatingSystem" element={<RatingSystem/>}/>
      <Route path="/MapComponent" element={<MapComponent/>}/>
      <Route path="/CommunityRoutes" element={<CommunityRoutes/>}/>
    </Routes>
     </Router>
      </>
  );
}