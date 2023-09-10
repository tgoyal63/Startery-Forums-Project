
import './App.css';
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import ForumPg from './components/ForumPg';
import Landing from './components/Landing';



function App() {
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={ <Landing/> } />
     <Route path="ForumPg" element={<ForumPg/>}/>
   
     
     
     </Routes>
    
    </div>
  );
}

export default App;
