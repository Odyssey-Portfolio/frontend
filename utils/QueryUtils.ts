export function queryBuilder(queryObject: Record<string, any>) {
  let queryString = `?`;

  const records = Object.entries(queryObject);
  const nonNullRecords = records.filter((record) => {
    const value = record[1];
    return value !== undefined && value !== null;
  });

  nonNullRecords.map((nonNullRecord, index) => {
    const key = nonNullRecord[0];
    const value = nonNullRecord[1];
    queryString += `${key}=${value}`;
    if (index < nonNullRecords.length - 1) {
      queryString += "&";
    }
  });

  return queryString;
}
