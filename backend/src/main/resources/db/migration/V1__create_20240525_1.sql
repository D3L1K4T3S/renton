create sequence seq_ren_auth_role start with 1 increment by 1;

create table role (
    created_at timestamp(6) with time zone,
    id bigint not null,
    updated_at timestamp(6) with time zone,
    name varchar(255) not null,
    primary key (id)
);