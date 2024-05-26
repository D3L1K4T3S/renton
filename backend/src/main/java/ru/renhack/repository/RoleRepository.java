package ru.renhack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.renhack.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findAllByName(String name);

}
