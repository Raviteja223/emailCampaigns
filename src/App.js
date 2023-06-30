import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./pages/create_campaign";
import ViewCampaign from "./pages/view_campaign";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" element={<Create />} />
          <Route path="/view" element={<ViewCampaign />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
