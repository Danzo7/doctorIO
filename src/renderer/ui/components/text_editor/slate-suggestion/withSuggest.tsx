import Tooltip from '@components/poppers/tooltip';
import { Overlay_u, modal } from '@stores/overlayStore';
import { Editor, Element, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

export const withSuggestion = (
  editor: Editor,
  { suggestions, keyword }: { suggestions: string[]; keyword: string },
) => {
  const { isInline, isVoid, markableVoid, onChange } = editor;
  const EDITOR_SUGGEST_TOOLTIP = 'EDITOR_SUGGEST_TOOLTIP';
  editor.isInline = (element) => {
    return element.inline ?? isInline(element);
  };

  editor.isVoid = (element) => {
    return element.void ?? isVoid(element);
  };

  editor.markableVoid = (element) => {
    return element.inline ?? markableVoid(element);
  };
  editor.onChange = () => {
    onChange();
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: 'word' });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);
      if (!beforeText) return;
      const beforeMatch =
        beforeText && beforeText.match(new RegExp(`^${keyword}(\\w+)$`));
      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeMatch && afterMatch) {
        const actionList = suggestions
          .filter((c) =>
            c.toLowerCase().startsWith(beforeMatch[1].toLowerCase()),
          )
          .slice(0, 3)
          .map((char) => ({
            text: char,
            onPress: () => {
              Transforms.select(editor, beforeRange);
              //get element before
              const prev = Editor.leaf(editor, beforeRange)[0];
              const element: Element = {
                type: 'autofill',
                behavior: 'attribute',
                children: [{ ...prev, text: char }],
                inline: true,
                void: true,
              };

              Transforms.insertNodes(editor, [element], {
                voids: true,
              });
              ReactEditor.focus(editor);
            },
          }));
        if (actionList.length === 0) {
          Overlay_u.close(EDITOR_SUGGEST_TOOLTIP);
          return;
        }
        const domRange = ReactEditor.toDOMRange(editor, beforeRange);
        const rect = domRange.getBoundingClientRect();
        Transforms.move(editor, { unit: 'word', distance: 1 });
        ReactEditor.focus(editor);

        modal(
          <Tooltip
            actionList={actionList}
            closeOnSelect={() => Overlay_u.close(EDITOR_SUGGEST_TOOLTIP)}
          />,
          {
            position: {
              top: rect.top + window.pageYOffset + 24,
              left: rect.left + window.pageXOffset + 24,
            },
            clickThrough: true,
            closeOnClickOutside: true,
            closeOnBlur: true,
            backdropColor: false,
            autoFocus: false,
          },
          EDITOR_SUGGEST_TOOLTIP,
        ).open({ force: true });
        return;
      } else {
        // Overlay_u.close(EDITOR_SUGEST_TOOLTIP);14.8 x 21
      }
    }
  };
  return editor;
};
