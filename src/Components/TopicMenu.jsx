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
    <div class="navbar">
      <div class="dropdown">
        <button class="dropbtn">
          Topics
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          {topics.map((topic) => {
            return <a>{topic.slug}</a>;
          })}
        </div>
      </div>
    </div>
  );
}
