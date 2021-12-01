USE ucode_web;
#Самый сильный герой - сумма всех навыков максимальная ДОДЕЛАТЬ
SELECT *, SUM(powers.points) as power
    FROM heroes, powers
    WHERE heroes.id = powers.hero_id
    GROUP BY heroes.id
    ORDER BY power DESC, heroes.id
    LIMIT 1;

#Самый слабый герой - сумма всех навыков минимальна ДОДЕЛАТЬ
SELECT *, SUM(powers.points) as power
    FROM heroes, powers
    WHERE heroes.id = powers.hero_id
        AND powers.type=2
    GROUP BY heroes.id
    ORDER BY power, heroes.id
    LIMIT 1;

#выберите всех Мстителей, кроме двойного агента, и отсортируйте их по общей мощности в порядке убывания


SELECT *, SUM(powers.points) as power FROM heroes, powers,
              (SELECT hero_id, COUNT(hero_id) as count_of_teams  FROM teams  GROUP BY hero_id) AS hero_teams
    WHERE heroes.id = hero_teams.hero_id
        AND heroes.id=powers.hero_id
        AND count_of_teams < 2 GROUP BY heroes.id ORDER BY power DESC;

#получить полную мощь как Мстителей, так и команд Гидры. Самая сильная команда должна быть последней в очереди
SELECT teams.name,
       SUM(powers.points) as power FROM powers
           JOIN heroes ON powers.hero_id=heroes.id
           JOIN teams GROUP BY teams.name
    ORDER BY power ;




SELECT teams.name,
       SUM(powers.point) as sum
FROM teams
         INNER JOIN powers ON teams.hero_id = powers.hero_id
WHERE teams.name = 'Avengers'
GROUP BY teams.name
UNION
SELECT teams.name,
       SUM(powers.point) as sum
FROM teams
         INNER JOIN powers ON teams.hero_id = powers.hero_id
WHERE teams.name = 'Hydra'
GROUP BY teams.name
ORDER BY sum;