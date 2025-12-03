const GlobalStats = ({
  stats,
}: {
  stats: { label: string; value: string }[];
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gray-800 p-4 rounded-xl shadow-lg border-t-2 border-indigo-500"
        >
          <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
          <p className="text-white text-xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default GlobalStats;
