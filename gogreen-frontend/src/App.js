import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ActiveStepProvider } from "./utils/ActiveStepContext.jsx";
import { LoginStateProvider } from "./utils/LoginStateContext.jsx";
import { ScrollProvider } from "./utils/ScrollContext.jsx";
import HeaderLayout from "./components/Header.jsx";
import FooterLayout from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home/index.jsx";
// import Pathways from "./pages/Pathways/index.jsx";
import Events from "./pages/Events/index.jsx";
import CustomizePathway from "./pages/CustomizePathway/index.jsx";
import './fonts/OpenSauceSans-Regular.ttf'
import "./theme.scss";

const AppContent = () => {
  return (
    <>
      <HeaderLayout />
      <Routes>
        <Route path={process.env.REACT_APP_HOME_PAGE_ROUTE} element={<Home />} />
        {/* <Route path={process.env.REACT_APP_PATHWAYS_PAGE_ROUTE} element={<Pathways />} /> */}
        <Route path={process.env.REACT_APP_EVENTS_PAGE_ROUTE} element={<Events />} />
        {/* <Route path={process.env.REACT_APP_EVENT_SPEC_PAGE_ROUTE} element={<EventDetails/>}></Route> */}
        <Route path={process.env.REACT_APP_CALCULATE_PAGE_ROUTE} element={<CustomizePathway />} />
        {/* <Route path={process.env.REACT_APP_PATH_COMP_PAGE_ROUTE} element={<FindPathway />} /> */}

      </Routes>
      <FooterLayout />
    </>
  );
};
function App() {

  return (
    <Router>
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
    </Router>
  );
}

export default App;