import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/loginScreen/loginScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/CreateNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";



function App() {
  const [search ,setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <main>
        <Routes>
          <Route path="/" Component={LandingPage} exact />
          <Route path="/login" Component={LoginScreen} exact />
          <Route path="/profile" Component={ProfileScreen}/>
          <Route path="/register" Component={RegisterScreen} exact />
          <Route path="/createnote" Component={CreateNote} exact />
          <Route path="/note/:id" Component={SingleNote}/>
          <Route path="/mynotes" Component={()=><MyNotes search={search}/>}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
