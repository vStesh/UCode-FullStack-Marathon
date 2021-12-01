USE ucode_web;
CREATE TABLE IF NOT EXISTS heroes (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) UNIQUE NOT NULL,
    description varchar(255) NOT NULL,
    race varchar(255) NOT NULL DEFAULT 'human',
    class_role enum ('tankman', 'healer', 'dps') NOT NULL,
    PRIMARY KEY (id)
);