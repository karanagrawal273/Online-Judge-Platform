import { Route, Routes } from "react-router-dom";
import {
  Login,
  Signup,
  Home,
  Problems,
  Problem,
  AddProblem,
  UpdateProblem,
  DeleteProblem,
  AdminLogin,
  AdminSignup,
  UserProfile,
} from "./pages";
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
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
