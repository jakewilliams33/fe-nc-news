import "./App.css";
import Header from "./Components/Header";
import TopicMenu from "./Components/TopicMenu";
import { ArticlesPage } from "./Components/ArticlesPage";

function App() {
  return (
    <>
      <Header />
      <TopicMenu />
      <ArticlesPage />
    </>
  );
}

export default App;
