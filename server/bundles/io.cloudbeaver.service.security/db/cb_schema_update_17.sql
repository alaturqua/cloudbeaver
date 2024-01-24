CREATE TABLE {table_prefix}CB_CREDENTIALS_PROFILE
(
    PROFILE_ID          VARCHAR(128) NOT NULL,
    PROFILE_NAME        VARCHAR(100) NOT NULL,
    PROFILE_DESCRIPTION VARCHAR(255) NOT NULL,
    PARENT_PROFILE_ID VARCHAR(255) NULL,

    CREATE_TIME      TIMESTAMP    NOT NULL,

    PRIMARY KEY (PROFILE_ID),
    FOREIGN KEY (PROFILE_ID) REFERENCES {table_prefix}CB_AUTH_SUBJECT (SUBJECT_ID) ON DELETE CASCADE,
    FOREIGN KEY (PARENT_PROFILE_ID) REFERENCES {table_prefix}CB_CREDENTIALS_PROFILE(PROFILE_ID) ON DELETE NO ACTION
);

ALTER TABLE {table_prefix}CB_USER ADD COLUMN CREDENTIALS_PROFILE_ID VARCHAR(128) NULL;
ALTER TABLE {table_prefix}CB_USER ADD FOREIGN KEY(CREDENTIALS_PROFILE_ID) REFERENCES {table_prefix}CB_CREDENTIALS_PROFILE(PROFILE_ID) ON DELETE NO ACTION;
