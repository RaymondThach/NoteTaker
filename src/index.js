import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import IAMService from "./IAMService";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Unprotected route
const RenderOnAnonymous = ({ children }) => (!IAMService.isLoggedIn() ? children : null);

//Protected route
const RenderOnAuthenticated = ({ children }) => (IAMService.isLoggedIn() ? children : null);

//const IsAllowedToViewProfile = () => (IAMService.hasOneRole("default-roles-myrealm") ? "Yes" : "No");

//Redirect to Tide Login form
const GoToTide = () => IAMService.doLogin();

// const App = () => (
//   <div>
//     <RenderOnAnonymous>
//       <div>
//         <h1>Hello!</h1>
//         <p>Please authenticate yourself!</p>
//         <p><button onClick={() => IAMService.doLogin()}>Login</button></p>
//       </div>
//     </RenderOnAnonymous>
//     <RenderOnAuthenticated>
//       <div>
//         <p>Signed in as <b>{IAMService.getName()}</b></p>
//         <p>Has Default Roles? <b>{IsAllowedToViewProfile()}</b></p>
//         <p><button onClick={() => IAMService.doLogout()}>Logout</button></p>
//       </div>
//     </RenderOnAuthenticated>
//   </div>
// );

//Unprotected route to Login form if not authenticated, Protected route to Home if authenticated.
const App = () => (
  <BrowserRouter>
    <RenderOnAnonymous>
      <GoToTide/>
    </RenderOnAnonymous>
    <RenderOnAuthenticated>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </RenderOnAuthenticated>
  </BrowserRouter>
);

//Render the notetaker app into the root element of index.html
const renderApp = () => ReactDOM.createRoot(document.getElementById("root")).render(<App/>);

//Initiate TideCloak adapter over the notetaker app
IAMService.initIAM(renderApp);
