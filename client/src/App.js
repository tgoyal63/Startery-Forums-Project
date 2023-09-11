
import './App.css';
import { Routes, Route } from "react-router-dom"
import ForumPg from './components/ForumPg';
import Landing from './components/Landing';
import ThreadCard from './components/ThreadCard';



function App() {
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={ <Landing/> } />
     <Route path="ForumPg" element={<ForumPg/>}/>
     <Route path="ThreadCard" element={<ThreadCard/>}/>
   
     
     
     </Routes>
    
    </div>
  );
}

export default App;
