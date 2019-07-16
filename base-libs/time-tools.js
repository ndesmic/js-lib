export function getTimezone(){
  const dateText = new Date().toString();
  return dateText.match(/\(([^}]*)\)/)[1];
}