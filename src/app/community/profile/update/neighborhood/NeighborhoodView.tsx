import { ExtendedNeighborhood } from "@/types";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const NeighborhoodView = ({
  neighborhood,
}: {
  neighborhood: ExtendedNeighborhood;
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">My Neighborhood</h3>
        <p className="text-sm text-muted-foreground">
          This is where your home/office located. if you have changed your
          place, update the address information to locate the exact community
        </p>
      </div>
      <Separator />
      <div className="">
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

        <Link
          href="/community/profile/update"
          className="rounded-lg my-4 bg-orange-600 text-white px-4 py-2 block font-semibold text-center"
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
};

export default NeighborhoodView;
