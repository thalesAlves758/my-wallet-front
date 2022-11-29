function brlStringToNumber(string) {
  return typeof string === 'string' ? Number(string?.replace('.', '')?.replace(',', '.')) : string;
}

export default brlStringToNumber;
