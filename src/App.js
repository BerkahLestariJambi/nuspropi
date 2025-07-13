import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import Test from "./pages/Test";
function App() {


  


  return (

 <div className="max-w-lg mx-auto border-x h-screen">

    <ConfigProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produk/:id" element={<PropertyDetail />} />
 <Route path="/test" element={<Test />} /> {/* 👈 ini dia */}
        </Routes>
      </Router>
    </ConfigProvider>
 </div>
  );
}

export default App;
