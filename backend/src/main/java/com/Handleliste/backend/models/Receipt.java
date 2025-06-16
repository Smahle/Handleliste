package com.Handleliste.backend.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "receipts")
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ElementCollection
    private List<String> steps;

    @Enumerated(EnumType.STRING)
    private Time time;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    // Enums for time and difficulty
    public enum Time {
        SHORT, MEDIUM, LONG
    }

    public enum Difficulty {
        EASY, MEDIUM, DIFFICULT
    }

    // Constructors
    public Receipt() {}

    public Receipt(String title, List<String> steps, Time time, Difficulty difficulty) {
        this.title = title;
        this.steps = steps;
        this.time = time;
        this.difficulty = difficulty;
    }

    // Getters and setters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public List<String> getSteps() { return steps; }
    public void setSteps(List<String> steps) { this.steps = steps; }
    public Time getTime() { return time; }
    public void setTime(Time time) { this.time = time; }
    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }
}
