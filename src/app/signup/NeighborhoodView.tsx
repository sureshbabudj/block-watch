import { ExtendedNeighborhood } from "@/types";

const NeighborhoodView = ({
  neighborhood,
}: {
  neighborhood: ExtendedNeighborhood;
}) => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{neighborhood.name}</h1>
      <p className="text-gray-700 mb-2">
        <strong>ID:</strong> {neighborhood.id}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Boundaries:</strong> {neighborhood.boundaries}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {neighborhood.description}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Rules:</strong> {neighborhood.rules}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Created At:</strong>{" "}
        {new Date(neighborhood.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Updated At:</strong>{" "}
        {new Date(neighborhood.updatedAt).toLocaleString()}
      </p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        {neighborhood.users.length > 0 ? (
          <ul className="list-disc list-inside">
            {neighborhood.users.map((user, index) => (
              <li key={index} className="text-gray-700">
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Posts</h2>
        {neighborhood.posts.length > 0 ? (
          <ul className="list-disc list-inside">
            {neighborhood.posts.map((post, index) => (
              <li key={index} className="text-gray-700">
                {post.content}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Events</h2>
        {neighborhood.events.length > 0 ? (
          <ul className="list-disc list-inside">
            {neighborhood.events.map((event, index) => (
              <li key={index} className="text-gray-700">
                {event.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Alerts</h2>
        {neighborhood.Alert.length > 0 ? (
          <ul className="list-disc list-inside">
            {neighborhood.Alert.map((alert, index) => (
              <li key={index} className="text-gray-700">
                {alert.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No alerts found.</p>
        )}
      </div>
    </div>
  );
};

export default NeighborhoodView;
