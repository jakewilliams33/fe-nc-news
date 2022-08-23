import { useState, useEffect } from "react";
import { getTopics } from "../api";

export default function TopicMenu() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicList) => {
      setTopics(topicList.topics);
    });
  }, [setTopics]);

  return (
    <div className="navbar">
      <div className="dropdown">
        <button className="dropbtn">
          Topics
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <a key="all" href="/">
            all
          </a>
          {topics.map((topic) => {
            return (
              <a key={topic.slug} href={`/${topic.slug}`}>
                {topic.slug}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
