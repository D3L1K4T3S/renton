package ru.renhack.service;

import ru.renhack.dto.RegisterRequest;
import ru.renhack.entity.MyUser;
import ru.renhack.entity.Role;

import java.util.List;

public interface UserService {

    MyUser createUser(RegisterRequest registerRequest);

    Role saveRole(Role role);

    void addRoleToUser(String userName, String roleName);

    MyUser getUser(String userName);

    List<MyUser> getUsers();

    List<Role> getRoles();

}
