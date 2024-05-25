package ru.renhack.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.renhack.dto.RegisterRequest;
import ru.renhack.entity.MyUser;
import ru.renhack.entity.Role;
import ru.renhack.repository.RoleRepository;
import ru.renhack.repository.UserRepository;
import ru.renhack.service.UserService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        var user = userRepo.findByUsername(username);

        if (user == null) {
            log.error("User not found in the database");
            return null;
        }

        log.info("User found in the database");

        var authorities = new ArrayList<SimpleGrantedAuthority>();
        for (Role role : user.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }

        return new User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public MyUser createUser(RegisterRequest registerRequest) {
        log.info("my new create " + registerRequest.getUsername() + " " + registerRequest.getPassword());
        MyUser myUser = new MyUser();
        myUser.setUsername(registerRequest.getUsername());
        var encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        myUser.setPassword(encodedPassword);
        Role role = roleRepo.findAllByName("ROLE_USER");
        myUser.getRoles().add(role);
        var userExists = userRepo.findByUsername(myUser.getUsername()) != null;
        if (userExists) {
            log.error("User found in the database");
            throw new IllegalStateException("User already exists");
        }
        log.info("Saving new user {} to the database", myUser.getUsername());
        userRepo.save(myUser);
        return myUser;
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new Role {} to the database", role.getName());
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String userName, String roleName) {
        log.info("Adding role {} to user {} ", roleName, userName);
        MyUser user = userRepo.findByUsername(userName);
        Role role = roleRepo.findAllByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public MyUser getUser(String userName) {
        log.info("Fetching user {}", userName);
        return userRepo.findByUsername(userName);
    }

    @Override
    public List<MyUser> getUsers() {
        log.info("Fetching all users");
        return userRepo.findAll();
    }

    @Override
    public List<Role> getRoles() {
        log.info("Fetching all roles");
        return roleRepo.findAll();
    }

}
