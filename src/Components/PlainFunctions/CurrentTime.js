export default function getCurrentTime() {
  const date = new Date();
  const monthCompare = date.getMonth() + 1;
  const minuteCompare = date.getMinutes();
  const hourCompare = date.getHours();
  const secondCompare = date.getSeconds();
  const dayCompare = date.getDate();
  const year = date.getFullYear();
  const month = monthCompare < 10 ? `0${monthCompare}` : monthCompare;
  const day = dayCompare < 10 ? `0${dayCompare}` : dayCompare;
  const hours = hourCompare < 10 ? `0${hourCompare}` : hourCompare;
  const minutes = minuteCompare < 10 ? `0${minuteCompare}` : minuteCompare;
  const seconds = secondCompare < 10 ? `0${secondCompare}` : secondCompare;
  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
}
