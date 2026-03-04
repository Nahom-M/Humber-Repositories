package com.example.assignment1.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
public class SecurityConfig {

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public InMemoryUserDetailsManager inMemoryUserDetailsManager(PasswordEncoder passwordEncoder) {
                UserDetails admin = User.withUsername("admin")
                                .password(passwordEncoder.encode("admin123"))
                                .roles("ADMIN")
                                .build();

                UserDetails employee = User.withUsername("emp")
                                .password(passwordEncoder.encode("emp123"))
                                .roles("EMPLOYEE")
                                .build();

                UserDetails user = User.withUsername("user")
                                .password(passwordEncoder.encode("user123"))
                                .roles("USER")
                                .build();

                return new InMemoryUserDetailsManager(admin, employee, user);
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/", "/list", "/register").permitAll()
                                                .requestMatchers("/new_item").hasAnyRole("ADMIN", "EMPLOYEE")
                                                .requestMatchers("/admin/**").hasRole("ADMIN") // Only admins can access
                                                                                               // admin routes
                                                .anyRequest().authenticated())
                                .formLogin(form -> form
                                                .loginPage("/login")
                                                .loginProcessingUrl("/login")
                                                .defaultSuccessUrl("/", true)
                                                .permitAll())
                                .logout(logout -> logout
                                                .logoutUrl("/logout")
                                                .logoutSuccessUrl("/login?logout")
                                                .permitAll());

                return http.build();
        }

}
