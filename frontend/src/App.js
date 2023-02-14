import { BrowserRouter, Routes, Route } from "react-router-dom";

import NeuronsComponent from "./Components/neurons/neurons";
import PathComponent from "./Components/path/pathComponent";
import ProjectComponent from "./Components/project/project";
 
function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" exact element={ <NeuronsComponent/> }></Route>
            <Route path="/:id" exact element={ <ProjectComponent/> }></Route>
          </Routes>
    </BrowserRouter>
  );
}
 
export default App;