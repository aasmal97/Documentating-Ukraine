import React,{ Suspense } from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import NavWrapper from "./pages/utilityComponents/navWrapper/NavWrapper"
import LoadingIcon from "./pages/utilityComponents/loadingIcon/LoadingIcon"
import {RealmAppProvider} from "./realm/RealmApp"
const LoginPage = React.lazy(()=> import("./pages/loginPage/LoginPage"));
const HomePage = React.lazy(() => import("./pages/homePage/HomePage"))
const AboutPage = React.lazy(() => import("./pages/aboutPage/AboutPage"))
const InviteLinkPage = React.lazy(() => import("./pages/inviteLinkPage/InviteLinkPage"));

const SearchRoutes = React.lazy(() => import("./routes/searchRoutes/SearchRoutes"))
const DashboardRoutes = React.lazy(() => import("./routes/dashboardRoutes/DashboardRoutes"))
const RealmAppId = process.env["REACT_APP_REALM_APP_DEV"];
function App() {
  return (
    <RealmAppProvider appId={RealmAppId}>
      <BrowserRouter>
        <div className="App">
          <Suspense fallback={<LoadingIcon entireViewPort={true} />}>
            <Routes>
              <Route
                path="/"
                element={
                  <NavWrapper>
                    <HomePage />
                  </NavWrapper>
                }
              />
              <Route
                path="/about/*"
                element={
                  <NavWrapper>
                    <AboutPage />
                  </NavWrapper>
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  <NavWrapper>
                    <DashboardRoutes />
                  </NavWrapper>
                }
              />
              <Route
                path="/search/*"
                element={
                  <NavWrapper>
                    <SearchRoutes />
                  </NavWrapper>
                }
              />
              <Route
                path="/invite-links/:id"
                element={
                  <NavWrapper>
                    <InviteLinkPage />
                  </NavWrapper>
                }
              />
              <Route
                path="/login"
                element={
                  <NavWrapper >
                    <LoginPage />
                  </NavWrapper>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </RealmAppProvider>
  );
}

export default App;
