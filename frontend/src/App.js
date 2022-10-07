import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./utils/userContext";
import { LessonContextProvider } from "./utils/lessonContext";
import Container from "react-bootstrap/Container";
import NavBar from "./components/navbar";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/user/dashboard";
import Profile from "./pages/user/profile";
import EditProfile from "./pages/user/editProfile";
import Follows from "./pages/user/follows";
import Categories from "./pages/user/categories";
import LessonQuiz from "./pages/user/lesson";
import Result from "./pages/user/result";
import UserList from "./pages/usersList";
import AdminCategories from "./pages/admin/categories";
import EditCategory from "./pages/admin/editCategory";
import AddCategory from "./pages/admin/addCategory";
import AdminQuestions from "./pages/admin/questions";
import AdminDashboard from "./pages/admin/dashboard";
import AdminAddWord from "./pages/admin/addWord";

function App() {
  return (
    <React.Fragment>
      <UserContextProvider>
        <NavBar />
        <Container className="container mt-5 pt-5 mb-5">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/follows" element={<Follows />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/lesson/:id/results" element={<Result />} />
            <Route
              path="/lesson/:id"
              element={
                <LessonContextProvider>
                  <LessonQuiz />
                </LessonContextProvider>
              }
            />
            <Route path="/users" element={<UserList />} />
            <Route path="admin/home" element={<AdminDashboard />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/category/:id/edit" element={<EditCategory />} />
            <Route path="/admin/category/add" element={<AddCategory />} />
            <Route
              path="/lesson/:id"
              element={
                <LessonContextProvider>
                  <LessonQuiz />
                </LessonContextProvider>
              }
            />
            <Route
              path="/admin/category/:id/questions"
              element={<AdminQuestions />}
            />
            <Route
              path="/admin/category/:id/question/add"
              element={<AdminAddWord />}
            />
          </Routes>
        </Container>
      </UserContextProvider>
    </React.Fragment>
  );
}

export default App;
