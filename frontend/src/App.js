import Register from "./components/register";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mt-5">
        <Register />
      </div>
    </div>
  );
}

export default App;
