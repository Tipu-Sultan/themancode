import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Forgot from "./auth/Forgot";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./auth/Profile";
import Activation from "./auth/Activation";

import Upload from "./admin/Upload";
import MyVideos from "./admin/MyVideos";
import AddProjects from "./admin/AddProjects";
import MyAssets from "./admin/MyAssets";

import Videos from "./videos/Videos";

import CodeBlock from "./codeblocks/CodeBlock";
import Editor from "./codeblocks/Editor";
import SourceCode from "./codeblocks/SourceCode";

import Coins from "./coin/Coins";
import Exchanges from "./coin/Exchanges";
import CoinDetails from "./coin/CoinDetails";

import PageNotFound from "./miscellaneous/PageNotFound";
import Newswala from "./miscellaneous/Newswala";
import Certificates from "./miscellaneous/Certificates";


const App = () => {
  const isLogin = localStorage.getItem("isLogin");
  const isUser = isLogin ? JSON.parse(isLogin) : null;
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Videos />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<Forgot />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/activation/:token" element={<Activation />} />

        {
        isUser&&
        <>
        <Route path="/upload" element={<Upload />} />
        <Route path="/addproject" element={<AddProjects />} />
        <Route path="/addproject/:id" element={<AddProjects />} />
        <Route path="/myvideos" element={<MyVideos />} />
        <Route path="/myassets" element={<MyAssets />} />
        </>
        }
        
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coin/:id" element={<CoinDetails />} />

        <Route path="/news" element={<Newswala />} />
        <Route path="/my-certificates" element={<Certificates />} />

        <Route path="/codeblock" element={<CodeBlock />} />
        <Route path="/editor/:cid" element={<Editor />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/codereader/:cid" element={<SourceCode />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;