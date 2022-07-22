export const GET_ALL_LATEST_QUERY = `
SELECT DISTINCT ON
    (s."countryId") *,
      (SELECT row_to_json(t)
        FROM (SELECT *
            FROM country
            WHERE c.id = country.id) t) AS country
FROM statistics s
    LEFT JOIN country c ON c.id = s."countryId"
ORDER BY s."countryId", s.updated_at DESC
`;
