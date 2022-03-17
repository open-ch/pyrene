export const copyStringToClipboard = (copyString) => {
  const textarea = document.createElement('textarea');
  textarea.textContent = copyString;
  textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand('copy'); // Security exception may be thrown by some browsers.
  } catch (ex) {
    console.warn('Copy to clipboard failed.', ex); // eslint-disable-line no-console
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
};
