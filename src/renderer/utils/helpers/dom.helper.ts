export const blurWithin = (event: FocusEvent, callback: () => void) => {
  if (
    !(event.currentTarget as HTMLElement)?.contains(
      event.relatedTarget as HTMLElement,
    )
  ) {
    callback();
  } else {
    (event.currentTarget as HTMLElement)?.focus();
  }
};
