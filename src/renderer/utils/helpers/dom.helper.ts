export const blurWithin = (
  event: React.FocusEvent<HTMLDivElement, Element>,
  callback: () => void,
) => {
  if (!event.currentTarget?.contains(event.relatedTarget)) {
    if (event.relatedTarget?.className.includes('layer'))
      (event.relatedTarget as HTMLElement).onblur = (e) => {
        if (!(e.target as HTMLElement)?.contains(e.relatedTarget as any)) {
          console.log(e);
          event.target?.focus();
        }
        console.log(e);
      };
    else callback();
  }
};
