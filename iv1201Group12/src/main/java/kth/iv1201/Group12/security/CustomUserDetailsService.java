package kth.iv1201.Group12.security;

import kth.iv1201.Group12.entity.Person;
import kth.iv1201.Group12.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final PersonRepository personRepository;

    @Autowired
    public CustomUserDetailsService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = personRepository.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        // Ensure role format is correct
        String role = (person.getRoleId() == 1) ? "ROLE_RECRUITER" : "ROLE_APPLICANT";



        return User.withUsername(person.getUserName())
                .password(person.getPassword()) // This is the hashed password from the DB
                .authorities(new SimpleGrantedAuthority(role))
                .build();
    }

}
