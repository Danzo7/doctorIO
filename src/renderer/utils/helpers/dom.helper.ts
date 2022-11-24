export const blurWithin = (
  event: React.FocusEvent<HTMLDivElement, Element>,
  callback: () => void,
) => {
  if (!event.currentTarget?.contains(event.relatedTarget)) {
    if (event.relatedTarget?.className.includes('layer'))
      (event.relatedTarget as HTMLElement).onblur = () => {
        console.log(event);
        event.target?.focus();
      };
    else callback();
  }
};
