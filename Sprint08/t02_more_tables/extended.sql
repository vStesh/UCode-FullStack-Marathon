USE ucode_web;
CREATE TABLE IF NOT EXISTS powers (
    id int NOT NULL AUTO_INCREMENT,
    hero_id int NOT NULL,
    name varchar(50) NOT NULL,
    points int,
    type enum ('attack', 'defense') NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT powers_heroes_fk
    FOREIGN KEY (hero_id)  REFERENCES heroes (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS races (
    id int NOT NULL AUTO_INCREMENT,
    hero_id int NOT NULL,
    name varchar(50) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT races_heroes_fk
    FOREIGN KEY (hero_id)  REFERENCES heroes (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS teams (
    id int NOT NULL AUTO_INCREMENT,
    hero_id int NOT NULL,
    name varchar(50) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT teams_heroes_fk
    FOREIGN KEY (hero_id)  REFERENCES heroes (id) ON DELETE CASCADE
);