USE ucode_web;

SELECT *, COUNT(*) AS count FROM heroes h
# герой одновременно находится в двух или более командах
    JOIN teams t ON h.id=t.hero_id
# hero is not human
    JOIN races r ON h.id=r.hero_id

    AND      r.name!='Human'
# hero's name contains the letter 'a' (lowercase)
    AND LOCATE('a', h.name) > 0
#hero can be tank or healer
    AND h.class_role!=3

# if there is more than one hero - select the one with the lowest id

    GROUP BY t.name
    ORDER BY count DESC, h.id
LIMIT 1
;



SELECT heroes.name, teams.hero_id,
       COUNT(*) as cnt
from heroes
         INNER JOIN teams on heroes.id = teams.hero_id
WHERE heroes.race != 'human' and heroes.name REGEXP 'a'
  AND (heroes.class_role = 'tankman' OR  heroes.class_role = 'healer')
GROUP BY heroes.name
HAVING cnt > 1
LIMIT 1;