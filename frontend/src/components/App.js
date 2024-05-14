// import "../styles/App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// /** import components */
// import Main from "./Main";
// import Quiz from "./Quiz";
// import Result from "./Result";
// import { CheckUserExist } from "../helper/helper";
// import AdminLoginForm from "../pages/admin/login";
// import AdminDashboard from "../pages/admin/dashboard";
// import "@fortawesome/fontawesome-free/css/all.css";
// import UserLoginForm from "../pages/user/login";

// /** react routes */
// // const router = createBrowserRouter([
// //   {
// //     path : '/',
// //     element : <Main></Main>
// //   },
// //   {
// //     path : '/quiz',
// //     element : <CheckUserExist><Quiz /></CheckUserExist>
// //   },
// //   {
// //     path : '/result',
// //     element : <CheckUserExist><Result /></CheckUserExist>
// //   },
// // ])

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<UserLoginForm />} />
//         <Route path="/admin" element={<AdminLoginForm />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route
//           path="/quiz"
//           element={
//             <CheckUserExist>
//               <Quiz />
//             </CheckUserExist>
//           }
//         />
//         <Route
//           path="/result"
//           element={
//             <CheckUserExist>
//               <Result />
//             </CheckUserExist>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import "@fortawesome/fontawesome-free/css/all.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../styles/App.css";

import AdminCreateQuiz from "../pages/admin/create-quiz";
import AdminDashboard from "../pages/admin/dashboard";
import UserDashboard from "../pages/user/dashboard";
import UserLoginForm from "../pages/user/login";
import UserRegisterForm from "../pages/user/regsiter";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import Quiz from "./Quiz";
import Result from "./Result";
import ProfilePage from "../pages/admin/profile";
import AdminPage from "../pages/admin/adminUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserDashboard />

            </ProtectedRoute>
          }
        />

        <Route path="/profile"  element={
            <ProtectedRoute>
              <ProfilePage />

            </ProtectedRoute>
          } />

        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/register" element={<UserRegisterForm />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-quiz" element={<AdminCreateQuiz />} />
        <Route path="/admin/users" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
