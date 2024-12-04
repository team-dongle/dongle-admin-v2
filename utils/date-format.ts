export function formatDate(date: Date | string) {
  const dateObject = new Date(date);
  return `${dateObject.getFullYear()}/${dateObject.getMonth() + 1}/${dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate()}`;
}
