import "./App.css";
import { useState } from "react";
import Header from "./Components/Header";
import TopicMenu from "./Components/TopicMenu";
import { ArticlesPage } from "./Components/ArticlesPage";
import { SingleArticle } from "./Components/SingleArticle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userContext } from "./contexts/userContext";

function App() {
  const [user, setUser] = useState("jessjelly");
  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <TopicMenu />
          <Header />
          <Routes>
            <Route path="/" element={<ArticlesPage />} />

            <Route path="/:topic" element={<ArticlesPage />} />
            <Route path="/:topic/sort/*" element={<ArticlesPage />} />
            <Route path="/sort/*" element={<ArticlesPage />} />

            <Route path="/articles/:article_id" element={<SingleArticle />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
