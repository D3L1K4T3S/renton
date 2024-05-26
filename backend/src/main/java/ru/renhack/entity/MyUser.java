package ru.renhack.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "AUTH_USER")
public class MyUser extends AbstractEntity {

    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQ_REN_AUTH_USER")
    @SequenceGenerator(name = "SEQ_REN_AUTH_USER", sequenceName = "SEQ_REN_AUTH_USER", allocationSize = 1)
    private Long id;

    @Column(name = "USERNAME", length = 64, unique = true, nullable = false)
    private String username;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @Column(name = "ROLES")
    private Collection<Role> roles = new ArrayList<>();

    @Column(name = "VERIFY_CODE")
    private String verifyCode;

    @Column(name = "TG_ID")
    private String tgId;

    @Column(name = "TG_NAME")
    private String tgName;

    @Column(name = "ACTIVATED", columnDefinition = "boolean default false")
    private Boolean activated;

}
