export default function reduceFormToSubmitObject(formEl) {
  const formIpunts = [...formEl.current.elements].filter(
    (element) => element.type !== 'submit'
  );

  return formIpunts.reduce((acc, input) => {
    return {
      ...acc,
      [input.name]: input.value
    }
  }, {});
}
