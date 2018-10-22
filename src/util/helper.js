export function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function strip(showname) {
  showname = showname.toString().toLowerCase().split(" ").join("");
  showname = showname.split(":").join("");
  showname = showname.split("'").join("");
  return showname;
}

export function toggleVisibility(className, status) {
  try {
    const searchElement = document.getElementsByClassName(className)[0];
    searchElement.style.display = status;
    document.getElementsByClassName('input-text')[0].value = '';
  } catch (error) {
    // class doesn't exist, continue
  }
}