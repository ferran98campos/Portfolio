import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainComponent from "./Components/main/main";
import NeuronsComponent from "./Components/neurons/neurons";
import ProjectComponent from "./Components/project/project";
import { HashRouter } from 'react-router-dom'
 
function App() {
  return (
    <HashRouter>
          <Routes>
            <Route exact path="/" element={ <MainComponent/> }></Route>
            <Route exact path="/projects" element={ <NeuronsComponent/> }></Route>
            <Route exact path="/projects/:id" element={ <ProjectComponent/> }></Route>
          </Routes>
    </HashRouter>
  );
}
 
export default App;