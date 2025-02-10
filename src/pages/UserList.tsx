import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const { user, followUser, unfollowUser } = useUser({
    username: "",
    carts: [],
    firstName: "",
    lastName: "",
    age: undefined,
    email: "",
    following: [],
  });

  useEffect(() => {
    const loadUsers = () => {
      const storedUsers = localStorage.getItem("users");
      setUsers(storedUsers ? JSON.parse(storedUsers) : []);
    };
  
    loadUsers();
  
    // Listen for localStorage updates (e.g., new user created)
    window.addEventListener("storage", loadUsers);
    return () => window.removeEventListener("storage", loadUsers);
  }, []);

  const handleFollow = (username: string) => {
    if (user.following?.includes(username)) {
      unfollowUser(username);
    } else {
      followUser(username);
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((u) => (
            <li key={u.username}>
              {u.username} ({u.firstName} {u.lastName})
              {u.username !== user.username && (
                <button onClick={() => handleFollow(u.username)}>
                  {user.following?.includes(u.username) ? "Unfollow" : "Follow"}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
