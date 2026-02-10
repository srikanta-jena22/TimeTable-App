import { useState } from "react";
import api from "../api/api";

export default function StudyForm({ refresh }) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [hours, setHours] = useState(2);

  const submitHandler = async () => {
    if (!topic) return alert("Enter topic");

    await api.post("/topics", {
      topic,
      difficulty,
      hours,
    });

    setTopic("");
    refresh();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <input
        className="border p-2 w-full mb-2"
        placeholder="Topic name"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        type="number"
        className="border p-2 w-full mb-2"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />

      <button
        onClick={submitHandler}
        className="bg-blue-600 text-white p-2 w-full rounded"
      >
        Add Topic
      </button>
    </div>
  );
}
