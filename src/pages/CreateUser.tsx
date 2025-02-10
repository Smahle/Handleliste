import { useState } from "react";
import useUser from "../hooks/useUser";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });

  const { setUser } = useUser({
    username: "",
    carts: [],
    firstName: "",
    lastName: "",
    age: undefined,
    email: "",
    following: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const newUser: User = {
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age ? parseInt(formData.age, 10) : undefined,
      email: formData.email,
      carts: [],
      following: [],
    };
  
    // Get existing users from localStorage
    const storedUsers = localStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
  
    // Check if username already exists
    if (users.some((u) => u.username === newUser.username)) {
      alert("Username already taken!");
      return;
    }
  
    // Save updated users list
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  
    // Set the new user as the active user in `useUser`
    setUser(newUser);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <button type="submit">Create</button>
    </form>
  );
}
