import { BrowserRouter, Routes, Route } from "react-router-dom";

import NeuronsComponent from "./Components/neurons/neurons";
import PathComponent from "./Components/path/pathComponent";
import ProjectComponent from "./Components/project/project";
import { HashRouter } from 'react-router-dom'
 
function App() {
  return (
    <HashRouter>
          <Routes>
            <Route path="/" exact element={ <NeuronsComponent/> }></Route>
            <Route path="/:id" exact element={ <ProjectComponent/> }></Route>
          </Routes>
    </HashRouter>
  );
}
 
export default App;