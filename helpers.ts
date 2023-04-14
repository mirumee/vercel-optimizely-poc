export const getCurrentDateTime = () => {
  const currentDate = new Date();
  return (
    currentDate.getUTCDate() +
    "/" +
    (currentDate.getUTCMonth() + 1) +
    "/" +
    currentDate.getUTCFullYear() +
    "@" +
    currentDate.getUTCHours() +
    ":" +
    currentDate.getUTCMinutes() +
    ":" +
    currentDate.getUTCSeconds()
  );
};
