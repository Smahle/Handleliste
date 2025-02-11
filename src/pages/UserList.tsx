import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const { activeUser, followUser, unfollowUser } = useUser();

  const navigate = useNavigate();

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
    if (activeUser?.following.includes(username)) {
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
              {/* Clickable username to navigate to profile */}
              <button 
                onClick={() => navigate(`/profile/${u.username}`)} 
                style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
              >
                {u.username}
              </button> 
              ({u.firstName} {u.lastName})
              {u.username !== activeUser?.username && (
                <button onClick={() => handleFollow(u.username)}>
                  {activeUser?.following?.includes(u.username) ? "Unfollow" : "Follow"}
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
