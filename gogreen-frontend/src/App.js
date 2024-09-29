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
        <Route path={process.env.REACT_APP_HOME_PAGE_ROUTE} element={<Home />} />
        <Route path={process.env.REACT_APP_STORE_PAGE_ROUTE} element={<Store />} />
        <Route path={process.env.REACT_APP_CART_PAGE_ROUTE} element={<Cart />} />
        <Route path={process.env.REACT_APP_EVENTS_PAGE_ROUTE} element={<Events />} />
        <Route path={process.env.REACT_APP_EDUCATION_PAGE_ROUTE} element={<Education />} />
        {/* <Route path={process.env.REACT_APP_EVENT_SPEC_PAGE_ROUTE} element={<EventDetails/>}></Route> */}
        <Route path={process.env.REACT_APP_CALCULATE_PAGE_ROUTE} element={<CustomizePathway />} />
        <Route path={process.env.REACT_APP_LEADERBOARD_PAGE_ROUTE} element={<LeaderBoard />} />
        <Route path={process.env.REACT_APP_BICYCLE_PAGE_ROUTE} element={<Bicycle />} />
        <Route path={process.env.REACT_APP_ABOUT_PAGE_ROUTE} element={<About />} />
        <Route path={process.env.REACT_APP_FAQ_PAGE_ROUTE} element={<FAQ />} />

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