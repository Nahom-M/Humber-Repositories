package com.example.assignment1.data;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.assignment1.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
