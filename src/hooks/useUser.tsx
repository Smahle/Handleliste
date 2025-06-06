import { useLocalStorage } from "./useLocalStorage";

const defaultUsers: User[] = [
  {
    username: "guest",
    firstName: "Guest",
    lastName: "User",
    age: 0,
    email: "guest@example.com",
    following: [],
    favorites: [],
  },
  {
    username: "mockUser",
    firstName: "Mock",
    lastName: "User",
    age: 25,
    email: "mock@example.com",
    following: [],
    favorites: [],
  },
];

function useUser(): UserState {
  const [users, setUsers] = useLocalStorage<User[]>("users", defaultUsers);
  const [activeUser, setActiveUser] = useLocalStorage<User | null>(
    "activeUser",
    users[0] || defaultUsers[0]
  );

  // TODO: remove when Login is implemented. Ensure the default user exists in localStorage
  if (users.length === 0) {
    setUsers(defaultUsers);
  }

  // returns false if username already taken
  const createUser = (user: User): boolean => {
    if (users.some((u) => u.username === user.username)) {
      return false;
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
    setActiveUser(updatedUser);
  };

  const unfollowUser = (usernameToUnfollow: string) => {
    if (!activeUser) return;
    const updatedUser = {
      ...activeUser,
      following: activeUser.following.filter(
        (username) => username !== usernameToUnfollow
      ),
    };

    updateUser(updatedUser);
    setActiveUser(updatedUser);
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
    updateUser,
  };
}

export default useUser;
