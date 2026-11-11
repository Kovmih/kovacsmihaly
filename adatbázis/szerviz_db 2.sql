CREATE DATABASE IF NOT EXISTS szerviz_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE szerviz_db;

DROP TABLE IF EXISTS szolgaltatasok;
DROP TABLE IF EXISTS kategoriak;

CREATE TABLE kategoriak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE szolgaltatasok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kategoria_id INT NOT NULL,
    megnevezes VARCHAR(100) NOT NULL,
    alapar INT NOT NULL,
    munkaido_perc INT NOT NULL,
    aktiv TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (kategoria_id) REFERENCES kategoriak(id)
);

-- Mintaadatok: kategoriak (3 kategória)
INSERT INTO kategoriak (id, nev) VALUES
(1, 'Futómű és Fék'),
(2, 'Motor és Erőátvitel'),
(3, 'Időszakos Karbantartás');

-- Mintaadatok: szolgaltatasok (10 szolgáltatás)
INSERT INTO szolgaltatasok (id, kategoria_id, megnevezes, alapar, munkaido_perc, aktiv) VALUES
(1, 1, 'Első fékbetét és féktárcsa csere', 24900, 60, 1),
(2, 1, 'Lézeres futómű beállítás', 16500, 45, 1),
(3, 1, 'Kerékcsapágy csere prémium', 32000, 90, 0),
(4, 2, 'Teljes kuplungszett csere', 85000, 240, 1),
(5, 2, 'Vezérműszíj és vízpumpa készlet csere', 72000, 180, 1),
(6, 2, 'Turbófeltöltő diagnosztika és beállítás', 28000, 75, 0),
(7, 3, 'Kis szerviz (olaj és olajszűrő csere)', 14900, 40, 1),
(8, 3, 'Klímatisztítás és ózonos fertőtlenítés', 9900, 30, 1),
(9, 3, 'Műszaki vizsgára felkészítés és átvizsgálás', 19500, 60, 1),
(10, 1, 'Lengéscsillapító és porvédő csere', 29900, 80, 0);