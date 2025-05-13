import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Button, TextField } from "@mui/material";
import styles from "./CreateUser.module.css";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });
  const { createUser } = useUserContext();

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
      following: [],
      favorites: [],
    };

    if (!createUser(newUser)) {
      alert("Username already taken!");
    } else alert(formData.username + " created.");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.createUserContainer} tertiary`}>
          <h2>Create User</h2>
          <div className={`secondary`}>
            <TextField
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div className={`secondary`}>
            <TextField
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
            />
          </div>
          <div className={`secondary`}>
            <TextField
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>
          <div className={`secondary`}>
            <TextField
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
            />
          </div>
          <div className={`secondary`}>
            <TextField
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className={styles.create}>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
