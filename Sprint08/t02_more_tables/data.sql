USE ucode_web;
INSERT INTO powers
(hero_id, name, points, type)
VALUES
(1, 'First power', 100, 'attack'),
(2, 'Second power', 220, 'defense'),
(2, 'Second power', 110, 'attack'),
(3, 'Third power', 30, 'attack'),
(4, 'Second power', 120, 'attack'),
(5, 'First power', 75, 'defense'),
(5, 'First power', 75, 'attack'),
(5, 'Second power', 75, 'defense'),
(5, 'Second power', 105, 'attack'),
(6, 'First power', 75, 'defense'),
(6, 'First power', 75, 'attack'),
(7, 'First power', 120, 'defense'),
(7, 'First power', 90, 'attack'),
(8, 'First power', 75, 'defense'),
(9, 'First power', 75, 'defense'),
(10, 'First power', 75, 'defense'),
(10, 'Second power', 130, 'defense'),
(10, 'Second power', 160, 'attack'),
(11, 'First power', 75, 'attack'),
(11, 'First power', 180, 'defense'),
(11, 'Third power', 122, 'defense');


INSERT INTO races
(hero_id, name)
VALUES
(1, 'Cyborg'),
(2, 'Android'),
(3, 'Atlantean'),
(4, 'Human'),
(5, 'Human'),
(6, 'Human'),
(7, 'Human'),
(8, 'Human'),
(9, 'Human'),
(10, 'Human'),
(11, 'Human');

INSERT INTO teams
(hero_id, name)
VALUES
(1, 'First team'),
(2, 'Second team'),
(1, 'Third team'),
(3, 'First team'),
(3, 'Second team'),
(5, 'First team'),
(6, 'Second team'),
(7, 'First team'),
(6, 'Third team'),
(4, 'First team'),
(4, 'Third team'),
(8, 'First team'),
(9, 'First team'),
(10, 'Second team'),
(11, 'First team');
