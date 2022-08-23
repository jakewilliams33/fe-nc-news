import "./App.css";
import Header from "./Components/Header";
import TopicMenu from "./Components/TopicMenu";
import { ArticlesPage } from "./Components/ArticlesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopicMenu />

        <Header />

        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/:topic" element={<ArticlesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
