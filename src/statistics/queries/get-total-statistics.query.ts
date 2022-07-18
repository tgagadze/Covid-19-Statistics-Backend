export const GET_TOTAL_STATISTICS_QUERY = `
SELECT SUM(confirmed) AS confirmed, SUM(deaths) AS deaths, SUM(critical) AS critical, SUM(recovered) AS recovered
FROM statistics
    Left JOIN country c ON c.id = statistics."countryId"
`;
