

CREATE TABLE IF NOT EXISTS tenants (
	tenant_id MEDIUMINT NOT NULL AUTO_INCREMENT, 
/*request form input data*/
	name varchar(20), 
    primary_user VARCHAR (20),
    secondary_user VARCHAR (20),
    ide VARCHAR (20),
    other_services VARCHAR (100),
    description varchar(200), 
/*added by admin */
    ms_group VARCHAR (20),
    github   VARCHAR (128),

/* tracked by the database */
    work_flow int,
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
	key MEDIUMINT NOT NULL AUTO_INCREMENT, 
    user varchar(20), 
    tenant_id INIT, 
    active BOOLEAN,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
);
*/



CREATE TABLE IF NOT EXISTS wf_users (
	user_id MEDIUMINT NOT NULL AUTO_INCREMENT, 
	name varchar(20), 
    password varchar(20),
    admin_user BOOLEAN,
    primary_user BOOLEAN,
    secondary_user BOOLEAN,
    tenant_id INT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY(user_id)
);


/*INSERT INTO tenants VALUES ("6d62d909-f957-430e-8689-b5129c0bb75e", "team1", "primary", "secondary", "ide", "other", "test");*/