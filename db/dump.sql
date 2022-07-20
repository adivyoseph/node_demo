

CREATE TABLE IF NOT EXISTS tenants (
	tenant_id INT NOT NULL AUTO_INCREMENT, 
/*request form input data*/
	name varchar(20), 
    primary_user VARCHAR (20),
    secondary_user VARCHAR (20),
    ide VARCHAR (20),
    other_services VARCHAR (100),
    db VARCHAR (20),
    description varchar(200), 
/*added by admin */
    ms_group VARCHAR (20),
    github   VARCHAR (128),

/* tracked by the database */
    work_flow int NOT NULL DEFAULT 0,
    work_flow_text VARCHAR (20) DEFAULT 'request pending' NOT NULL,
/* workflow time stamps 
#    requested datetime DEFAULT CURRENT_TIMESTAMP,
#    ack_sent datetime,
#    admin_approved datetime,
#    db_approved datetime,
#    next_notice
#    google auth setup
#    MS auth setup
# gihub auth aetup
*/
	PRIMARY KEY(tenant_id)
);

/*
CREATE TABLE IF NOT EXISTS wf_messages (
	key INT NOT NULL AUTO_INCREMENT, 
    user varchar(20), 
    tenant_id INIT, 
    active BOOLEAN,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
);
*/



CREATE TABLE IF NOT EXISTS wf_users (
	user_id INT NOT NULL AUTO_INCREMENT, 
	name varchar(20), 
    password varchar(20),
    admin_user BOOLEAN NOT NULL DEFAULT FALSE,
    primary_user BOOLEAN NOT NULL DEFAULT FALSE,
    secondary_user BOOLEAN NOT NULL DEFAULT FALSE,
    tenant_id INT NOT NULL DEFAULT 0,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY(user_id)
);


/*INSERT INTO tenants VALUES ("6d62d909-f957-430e-8689-b5129c0bb75e", "team1", "primary", "secondary", "ide", "other", "test");*/
