import { useState, useEffect } from "react";

const BASE_API = "http://localhost:8080/api"; // Change to your backend URL

function useUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_API}/users`);
        if (!res.ok) throw new Error("Failed to fetch users");
        const data: User[] = await res.json();
        setUsers(data);
        setActiveUser(data[0] || null);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // only run once on mount

  const createUser = async (user: User): Promise<boolean> => {
    if (users.some((u) => u.username === user.username)) return false;

    try {
      const res = await fetch(`${BASE_API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Failed to create user");
      const newUser = await res.json();
      setUsers((prev) => [...prev, newUser]);
      return true;
    } catch {
      return false;
    }
  };

  const updateUser = async (updatedUser: User) => {
    try {
      const res = await fetch(`${BASE_API}/users/${updatedUser.username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const updated = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.username === updated.username ? updated : u))
      );
      if (activeUser?.username === updated.username) setActiveUser(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const followUser = (usernameToFollow: string) => {
    if (!activeUser) return;
    if (!users.find((u) => u.username === usernameToFollow)) return;
    if (activeUser.following.includes(usernameToFollow)) return;

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
      following: activeUser.following.filter((u) => u !== usernameToUnfollow),
    };
    updateUser(updatedUser);
    setActiveUser(updatedUser);
  };

  return {
    activeUser,
    setActiveUser,
    users,
    createUser,
    followUser,
    unfollowUser,
    updateUser,
    loading,
    error,
  };
}

export default useUser;
