import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux"
import { ActiveStepProvider } from "./utils/ActiveStepContext.jsx";
import { LoginStateProvider } from "./utils/LoginStateContext.jsx";
import { ScrollProvider } from "./utils/ScrollContext.jsx";
import store from "./utils/store.js";
import HeaderLayout from "./components/Header.jsx";
import FooterLayout from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home/index.jsx";
import Store from "./pages/Store/index.jsx"
import Cart from "./pages/Cart/index.jsx"
import LeaderBoard from "./pages/LeaderBoard/index.jsx"
import Events from "./pages/Events/index.jsx";
import Education from "./pages/Education/index.jsx";
import CustomizePathway from "./pages/CustomizePathway/index.jsx";
import Bicycle from "./pages/Bicycle/index.jsx";
import About from "./pages/About/index.jsx";
import FAQ from "./pages/FAQ/index.jsx"
import './fonts/OpenSauceSans-Regular.ttf'
import "./theme.scss";

const AppContent = () => {
  return (
    <>
      <HeaderLayout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/events" element={<Events />} />
        <Route path="/education" element={<Education />} />
        {/* <Route path={process.env.REACT_APP_EVENT_SPEC_PAGE_ROUTE} element={<EventDetails/>}></Route> */}
        <Route path="/calculate" element={<CustomizePathway />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/bicycle" element={<Bicycle />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />

      </Routes>
      <FooterLayout />
    </>
  );
};
function App() {

  return (
    <Router>
      <Provider store={store}>

    <ScrollToTop/>
      <ActiveStepProvider>
        <LoginStateProvider>
          <div className="App">
            <main className="layoutSection">
              <ScrollProvider>
                <ScrollToTop />
                <AppContent />
              </ScrollProvider>
            </main>
          </div>
        </LoginStateProvider>
      </ActiveStepProvider>
      </Provider>
    </Router>
  );
}

export default App;