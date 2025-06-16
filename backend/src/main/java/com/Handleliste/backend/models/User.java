package com.Handleliste.backend.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String username;

    private String firstName;
    private String lastName;
    private Integer age;
    private String email;

    @ElementCollection
    private List<String> following;

    @ElementCollection
    private List<String> favorites;

    // Constructors
    public User() {}

    public User(String username, String firstName, String lastName, Integer age, String email, List<String> following, List<String> favorites) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.following = following;
        this.favorites = favorites;
    }

    // Getters and setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public List<String> getFollowing() { return following; }
    public void setFollowing(List<String> following) { this.following = following; }
    public List<String> getFavorites() { return favorites; }
    public void setFavorites(List<String> favorites) { this.favorites = favorites; }
}
