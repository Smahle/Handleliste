import { useState } from "react";

export default function CreateUser({ createUser }: UserState) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
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

    if (!createUser(newUser)) {
      alert("Username already taken!");
    }
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
