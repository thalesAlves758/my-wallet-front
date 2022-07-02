function toBrl(value) {
  const realFormatter = Intl.NumberFormat('pr-br');

  return `R$ ${realFormatter.format(value)}`;
}

export default toBrl;
