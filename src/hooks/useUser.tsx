import { useLocalStorage } from "./useLocalStorage";

function useUser() {
  const [activeUser, setActiveUser] = useLocalStorage<User | null>("activeUser", null);
  const [users, setUsers] = useLocalStorage<User[]>("users", []);

  const createUser = (user: User): boolean => {
    if (users.some((u) => u.username === user.username)) {
      return false; // Username already taken
    }

    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    return true;
  };

  const followUser = (usernameToFollow: string) => {
    if (!activeUser) return;

    if (!users.some((u) => u.username === usernameToFollow)) {
      console.error("User to follow not found");
      return;
    }

    if (activeUser.following.includes(usernameToFollow)) {
      console.warn("Already following this user");
      return;
    }

    const updatedUser = {
      ...activeUser,
      following: [...activeUser.following, usernameToFollow],
    };

    updateUser(updatedUser);
  };

  const unfollowUser = (usernameToUnfollow: string) => {
    if (!activeUser) return;

    const updatedUser = {
      ...activeUser,
      following: activeUser.following.filter((username) => username !== usernameToUnfollow),
    };

    updateUser(updatedUser);
  };

  // Update user in the users list
  const updateUser = (updatedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.username === updatedUser.username ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  return {
    activeUser,
    setActiveUser,
    users,
    createUser,
    followUser,
    unfollowUser,
  };
}

export default useUser;
