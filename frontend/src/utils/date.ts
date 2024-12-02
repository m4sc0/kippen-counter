export const relativeTime = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  const ms = date.getTime();
  const nowMs = new Date().getTime();
  const secondsSince = (nowMs - ms) / 1000;

  let value = 0;
  let unit = "";

  if (secondsSince < 60) {
    value = Math.floor(secondsSince);
    unit = "second";
  } else if (secondsSince < 60 * 60) {
    value = Math.floor(secondsSince / 60);
    unit = "minute";
  } else if (secondsSince < 60 * 60 * 24) {
    value = Math.floor(secondsSince / (60 * 60));
    unit = "hour";
  } else if (secondsSince < 60 * 60 * 24 * 7) {
    value = Math.floor(secondsSince / (60 * 60 * 24));
    unit = "day";
  } else if (secondsSince < 60 * 60 * 24 * 30) {
    value = Math.floor(secondsSince / (60 * 60 * 24 * 7));
    unit = "week";
  } else if (secondsSince < 60 * 60 * 24 * 365) {
    value = Math.floor(secondsSince / (60 * 60 * 24 * 30));
    unit = "month";
  } else {
    value = Math.floor(secondsSince / (60 * 60 * 24 * 365));
    unit = "year";
  }

  // Handle pluralization
  const pluralizedUnit = value === 1 ? unit : `${unit}s`;

  return `${value} ${pluralizedUnit} ago`;
};
