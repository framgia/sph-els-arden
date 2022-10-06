import React from "react";
import Register from "./pages/register";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import EditProfile from "./pages/editProfile";
import Follows from "./pages/follows";
import NavBar from "./components/navbar";
import AdminCategories from "./pages/adminCategories";
import { UserContextProvider } from "./utils/userContext";
import EditCategory from "./pages/editCategory";
import AddCategory from "./pages/addCategory";
import UserList from "./pages/usersList";
import Categories from "./pages/categories";
import AdminQuestions from "./pages/adminQuestions";
import LessonQuiz from "./pages/lesson";
import AdminDashboard from "./pages/adminDashboard";

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/follows" element={<Follows />} />
            <Route path="admin/home" element={<AdminDashboard />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/category/:id/edit" element={<EditCategory />} />
            <Route path="/admin/category/add" element={<AddCategory />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/lesson/:id" element={<LessonQuiz />} />
            <Route
              path="/admin/category/:id/questions"
              element={<AdminQuestions />}
            />
          </Routes>
        </Container>
      </UserContextProvider>
    </React.Fragment>
  );
}

export default App;
