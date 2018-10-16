export function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function strip(showname) {
  showname = showname.toString().toLowerCase().split(" ").join("");
  showname = showname.split(":").join("");
  showname = showname.split("'").join("");
  return showname;
}