
import './App.css';
import { Routes, Route } from "react-router-dom"
import ForumPg from './components/ForumPg';
import Landing from './components/Landing';
import ThreadCard from './components/ThreadCard';

import ThreadModal from './components/ThreadModal';



function App() {
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={ <Landing/> } />
     <Route path="/forumPg" element={<ForumPg/>}/>
     <Route path="ThreadCard" element={<ThreadCard/>}/>
     <Route path="/thread" element={<ThreadModal/>}/>
     

   
     
     
     </Routes>
    
    </div>
  );
}

export default App;
