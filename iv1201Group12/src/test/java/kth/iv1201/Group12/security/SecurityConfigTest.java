package kth.iv1201.Group12.security;

import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import java.lang.reflect.Field;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SecurityConfigTest {

    @Mock
    private CustomUserDetailsService userDetailsService;

    @Mock
    private AuthenticationConfiguration authConfig;

    @InjectMocks
    private SecurityConfig securityConfig;

    private HttpSecurity httpSecurity;

    @BeforeEach
    void setUp() {
        httpSecurity = mock(HttpSecurity.class);
    }

    @Test
    void testPasswordEncoder() {
        PasswordEncoder encoder = securityConfig.passwordEncoder();
        assertNotNull(encoder);
        assertTrue(encoder instanceof BCryptPasswordEncoder);

        String rawPassword = "testPassword";
        String encodedPassword = encoder.encode(rawPassword);
        assertNotEquals(rawPassword, encodedPassword);
        assertTrue(encoder.matches(rawPassword, encodedPassword));
    }



    @Test
    void testAuthenticationProvider() throws Exception {
        DaoAuthenticationProvider authProvider = securityConfig.authenticationProvider();
        assertNotNull(authProvider);

        // ✅ Use reflection to access the protected field `passwordEncoder`
        Field passwordEncoderField = DaoAuthenticationProvider.class.getDeclaredField("passwordEncoder");
        passwordEncoderField.setAccessible(true);

        PasswordEncoder encoder = (PasswordEncoder) passwordEncoderField.get(authProvider);
        assertNotNull(encoder);
        assertTrue(encoder instanceof BCryptPasswordEncoder);
    }


    @Test
    void testAuthenticationManager() throws Exception {
        when(authConfig.getAuthenticationManager()).thenReturn(mock(AuthenticationManager.class));
        AuthenticationManager authenticationManager = securityConfig.authenticationManager(authConfig);
        assertNotNull(authenticationManager);
    }

    @Test
    void testCorsConfigurationSource() {
        CorsConfigurationSource corsSource = securityConfig.corsConfigurationSource();
        assertNotNull(corsSource);

        CorsConfiguration corsConfig = ((UrlBasedCorsConfigurationSource) corsSource).getCorsConfigurations().get("/**");
        assertNotNull(corsConfig);
        assertTrue(corsConfig.getAllowedOrigins().contains("http://localhost:5173"));
        assertTrue(corsConfig.getAllowedMethods().containsAll(Arrays.asList("GET", "POST", "PUT", "DELETE")));
        assertTrue(corsConfig.getAllowedHeaders().containsAll(Arrays.asList("Authorization", "Content-Type")));
        assertTrue(corsConfig.getAllowCredentials());
    }

    @Test
    void testSecurityFilterChain() throws Exception {
        HttpSecurity mockHttpSecurity = mock(HttpSecurity.class);

        SecurityFilterChain filterChain = securityConfig.securityFilterChain(mockHttpSecurity);
        assertNotNull(filterChain);
    }

    @Test
    void testAuthorizationRules() throws Exception {
        HttpSecurity mockHttpSecurity = mock(HttpSecurity.class);

        securityConfig.securityFilterChain(mockHttpSecurity);

        verify(mockHttpSecurity, times(1)).authorizeHttpRequests(any());
    }

    @Test
    void testLogoutConfiguration() throws Exception {
        HttpSecurity mockHttpSecurity = mock(HttpSecurity.class);

        securityConfig.securityFilterChain(mockHttpSecurity);

        verify(mockHttpSecurity, times(1)).logout(any());
    }
}
