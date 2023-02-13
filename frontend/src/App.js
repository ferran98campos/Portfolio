import { BrowserRouter, Routes, Route } from "react-router-dom";

import NeuronsComponent from "./Components/neurons/neurons";
import PathComponent from "./Components/path/pathComponent";
 
function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" exact element={ <NeuronsComponent/> }></Route>
          </Routes>
    </BrowserRouter>
  );
}
 
export default App;