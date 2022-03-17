export const copyStringToClipboard = (s: string) => {
  const textarea = document.createElement('textarea');
  textarea.textContent = s;
  // Prevent scrolling to bottom of page in MS Edge.
  textarea.style.position = 'fixed';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    // Security exception may be thrown by some browsers.
    return document.execCommand('copy');
  } catch (ex) {
    console.warn('Copy to clipboard failed.', ex); // eslint-disable-line no-console
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
};
