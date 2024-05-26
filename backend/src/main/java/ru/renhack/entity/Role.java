package ru.renhack.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ROLE")
public class Role extends AbstractEntity {

    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQ_REN_AUTH_ROLE")
    @SequenceGenerator(name = "SEQ_REN_AUTH_ROLE", sequenceName = "SEQ_REN_AUTH_ROLE", allocationSize = 1)
    private Long id;

    @Column(name = "NAME", nullable = false)
    private String name;
}
