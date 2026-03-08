export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(dateString));
}

export function formatDateSimple(dateString: string) {
  const [year, month, day] = dateString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}
