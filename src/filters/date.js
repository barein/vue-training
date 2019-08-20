export default value => {
  let date = new Date(value);
  return date.toLocaleString("fr-FR", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
};
