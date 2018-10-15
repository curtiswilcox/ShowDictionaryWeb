export function strip(showname) {
  showname = showname.toString().toLowerCase().split(" ").join("");
  showname = showname.split(":").join("");
  showname = showname.split("'").join("");
  return showname;
}