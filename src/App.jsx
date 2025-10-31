import LoginWebPage from "./pages/LoginPage";
import SigninWebPage from "./pages/SignInPage";
import Page1 from "./components/Page1";
import AlertSystem from "./components/AlertSystem";
import Header from "./components/Header";
import RatingSystem from  "./components/RatingSystem";
import MapComponent from "./components/MapComponent";
import CommunityRoutes from "./components/CommunityRoutes";
import {BrowserRouter as  Router , Route , Routes} from 'react-router-dom';
import HomePage from "./pages/HomePage";


export default function App() {

  return (
    <>
    <Router>
     <Routes>
      <Route path="/signup" element={<SigninWebPage/>}/>
      <Route path="/login" element={<LoginWebPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
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