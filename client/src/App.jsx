import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home, Problems, Problem, AddProblem, UpdateProblem, DeleteProblem} from "./pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problem/:id" element={<Problem />} />
        <Route path="/addProblem" element={<AddProblem />} />
        <Route path="/updateProblem/:id" element={<UpdateProblem />} /> 
        <Route path="/deleteProblem" element={<DeleteProblem />} /> 
      </Routes>
    </div>
  );
}

export default App;
