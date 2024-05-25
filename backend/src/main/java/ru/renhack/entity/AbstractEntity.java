package ru.renhack.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

import java.time.Instant;

@Data
@MappedSuperclass
public abstract class AbstractEntity {

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", insertable = false)
    private Instant updatedAt;

    @PrePersist
    public void toCreate() {
        setCreatedAt(Instant.now());
    }

    @PreUpdate
    public void toUpdate() {
        setUpdatedAt(Instant.now());
    }

}
