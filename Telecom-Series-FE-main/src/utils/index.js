/**
 * Si el elemento de entrada existe, concéntrese en él.
 */
export const inputFocus = () => {
  const input = document.querySelector("#inputSeries");

  input && input.focus();
};
