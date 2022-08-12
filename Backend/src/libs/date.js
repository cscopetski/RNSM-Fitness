export function getDate(date = new Date(Date.now())) {
  return (
    date.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1 < 10 ? "0" : "") +
    (date.getUTCMonth() + 1) +
    "-" +
    (date.getUTCDate() + 1 < 10 ? "0" : "") +
    date.getUTCDate()
  );
}

export function getTimestamp(date = new Date(Date.now())) {
  return (
    date.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1 < 10 ? "0" : "") +
    (date.getUTCMonth() + 1) +
    "-" +
    (date.getUTCDate() + 1 < 10 ? "0" : "") +
    date.getUTCDate() +
    " " +
    [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()].join(":")
  );
}
