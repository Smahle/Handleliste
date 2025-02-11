import { useNavigate } from "react-router-dom";

export default function UserList({users, activeUser, followUser}: UserState) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>All Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((u) => (
            <li key={u.username}>
              <button 
                onClick={() => navigate(`/profile/${u.username}`)} 
                style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
              >
                {u.username}
              </button> 
              ({u.firstName} {u.lastName})
              {u.username !== activeUser?.username && (
                <button onClick={() => followUser(u.username)}>
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
