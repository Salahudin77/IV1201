package kth.iv1201.Group12.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import java.util.*;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Configuration class for setting up Spring Security.
 * This class defines security rules, authentication providers, and CORS configuration.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    /**
     * Constructor for dependency injection of the CustomUserDetailsService.
     *
     * @param userDetailsService The service responsible for loading user-specific data.
     */
    @Autowired
    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    /**
     * Defines a password encoder bean for secure password storage.
     * Uses BCrypt hashing algorithm for encoding passwords.
     *
     * @return A PasswordEncoder instance.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the DaoAuthenticationProvider to use the custom user details service and password encoder.
     *
     * @return A configured DaoAuthenticationProvider instance.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Defines an AuthenticationManager bean to handle authentication requests.
     *
     * @param authConfig The AuthenticationConfiguration used to create the AuthenticationManager.
     * @return An AuthenticationManager instance.
     * @throws Exception If an error occurs during AuthenticationManager creation.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Configures the security filter chain for HTTP requests.
     * Defines access rules, session management, and logout behavior.
     *
     * @param http The HttpSecurity object to configure.
     * @return A SecurityFilterChain instance.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/api/register", "/api/login", "/css/**", "/js/**").permitAll() // Public endpoints
                                .requestMatchers("/api/availability", "/api/availability/**").hasRole("APPLICANT")
                                .requestMatchers("/api/fetchAllApplications").hasRole("RECRUITER")
                                .requestMatchers("/api/recruiter/**").hasRole("RECRUITER") // Only recruiters can access
                                .requestMatchers("/api/applicant/**").hasRole("APPLICANT") // Only applicants can access
                                .requestMatchers("/api/addCompetence").hasRole("APPLICANT")
                                .anyRequest().authenticated() // Everything else requires authentication
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS) // Always create a session
                )
                .authenticationProvider(authenticationProvider())
                .logout(logout -> logout
                        .logoutUrl("/api/logout")
                        .logoutSuccessHandler((request, response, authentication) -> response.setStatus(HttpServletResponse.SC_OK))
                );

        return http.build();
    }

    /**
     * Configures CORS (Cross-Origin Resource Sharing) settings for the application.
     * Allows requests from specified origins, methods, and headers.
     *
     * @return A CorsConfigurationSource instance.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:5173"));  // Allow your frontend URL
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));  // Allowed HTTP methods
        corsConfig.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));  // Allowed headers
        corsConfig.setAllowCredentials(true);  // Allow cookies to be sent with the request

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }
}
