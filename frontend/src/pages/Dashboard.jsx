import { useEffect, useState } from "react";
import api from "../api/api";
import StudyForm from "../components/StudyForm";
import TopicList from "../components/TopicList";

export default function Dashboard() {
  const [topics, setTopics] = useState([]);

  const fetchTopics = async () => {
    const res = await api.get("/topics");
    setTopics(res.data);
  };

  const handleMissed = async (id) => {
    const res = await api.post(`/topics/${id}/missed`, {
      missedMinutes: 30,
    });

    alert(
      "Rescheduled into sessions: " + res.data.chunks.join(" + ") + " mins"
    );
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        AI Smart Timetable
      </h1>

      <StudyForm refresh={fetchTopics} />
      <TopicList topics={topics} onMiss={handleMissed} />
    </div>
  );
}
