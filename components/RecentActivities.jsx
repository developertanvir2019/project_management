const RecentActivities = ({ activities }) => {
  return (
    <div className="mb-8">
      <h2 className="font-bold text-xl mb-4">Recent Activities</h2>
      <ul className="space-y-2">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center">
            <span className="mr-2 text-gray-500">{activity.timestamp}</span>
            <span>{activity.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
