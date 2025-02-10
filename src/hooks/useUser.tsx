import { useState, useEffect } from "react";

export default function useUser(initialUser: User) {
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : initialUser;
  });
  const [activeUser, setActiveUser] = useState<User>({
    username: "Stian",
    carts: [],
    firstName: "",
    lastName: "",
    age: undefined,
    email: "",
    following: [],
  });
  

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const followUser = (userId: string) => {
    setUser((prev) => ({
      ...prev,
      following: [...(prev.following || []), userId],
    }));
  };

  const unfollowUser = (userId: string) => {
    setUser((prev) => ({
      ...prev,
      following: prev.following?.filter((id) => id !== userId) || [],
    }));
  };

  return { user, setUser, followUser, unfollowUser, activeUser };
}
