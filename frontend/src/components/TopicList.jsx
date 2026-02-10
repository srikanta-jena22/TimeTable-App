export default function TopicList({ topics, onMiss }) {
  return (
    <div className="mt-4 space-y-3">
      {topics.map((t) => (
        <div
          key={t.id}
          className="border p-3 rounded flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{t.topic}</h3>
            <p>Difficulty: {t.difficulty}</p>
            <p>Retention: {t.retention.toFixed(1)}%</p>
          </div>

          <button
            onClick={() => onMiss(t.id)}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Missed Revision
          </button>
        </div>
      ))}
    </div>
  );
}
