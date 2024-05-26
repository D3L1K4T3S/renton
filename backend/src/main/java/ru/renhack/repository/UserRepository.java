package ru.renhack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.renhack.entity.MyUser;

public interface UserRepository extends JpaRepository<MyUser, Long> {

    MyUser findByUsername(String username);

    MyUser findByTgName(String tgName);

}
