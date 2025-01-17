import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { createRoot } from "react-dom/client";
import IAMService from "./IAMService";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//const root = ReactDOM.createRoot(document.getElementById('root'));

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

const renderApp = () => ReactDOM.createRoot(document.getElementById("root")).render(<App />);

//Initiate TideCloak adapter over the notetaker app
IAMService.initIAM(renderApp);


// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
