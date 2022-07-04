function brlStringToNumber(string) {
  return Number(string?.replace('.', '')?.replace(',', '.'));
}

export default brlStringToNumber;
