INSERT INTO ROLE (id, name, created_at, updated_at)
VALUES
    (nextval('SEQ_REN_AUTH_ROLE'), 'ROLE_USER', current_timestamp, current_timestamp),
    (nextval('SEQ_REN_AUTH_ROLE'), 'ROLE_ADMIN', current_timestamp, current_timestamp);