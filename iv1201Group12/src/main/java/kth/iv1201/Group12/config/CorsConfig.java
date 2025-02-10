package kth.iv1201.Group12.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Enable CORS for all paths
                        .allowedOrigins("http://localhost:5173")  // Allow frontend URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allowed HTTP methods
                        .allowedHeaders("*")  // Allow all headers
                        .allowCredentials(true);  // Allow credentials (cookies, etc.)
            }
        };
    }
}
