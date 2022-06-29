export const blurWithin = (
  event: React.FocusEvent<HTMLDivElement, Element>,
  callback: () => void,
) => {
  if (!event.currentTarget?.contains(event.relatedTarget)) {
    callback();
  }
};
