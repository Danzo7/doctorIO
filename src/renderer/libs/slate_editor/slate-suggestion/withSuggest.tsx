import { Editor, Element, Node, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { FormattedText } from '../slate.types';
import { tooltip } from '@libs/overlay';

export const withSuggestion = (
  editor: Editor,
  props?: {
    suggestions: string[];
    keyword: string;
    insertOnSelect: (selected: string, prev: FormattedText) => Element;
  },
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
  if (!props) return editor;
  const { suggestions, keyword, insertOnSelect } = props;
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

              Transforms.insertNodes(editor, [
                insertOnSelect(char, prev),
                {
                  type: 'span',
                  children: [{ ...prev, text: '' }],
                  inline: true,
                },
              ]);
              ReactEditor.focus(editor);
            },
          }));
        if (actionList.length === 0) {
          tooltip.close(EDITOR_SUGGEST_TOOLTIP);
          return;
        }
        const element = beforeRange
          ? ReactEditor.toDOMNode(editor, Node.get(editor, start.path))
          : undefined;
        if (!element) return tooltip.close(EDITOR_SUGGEST_TOOLTIP);
        Transforms.move(editor, { unit: 'word', distance: 1 });
        ReactEditor.focus(editor);

        tooltip(
          () => actionList,

          element,
          {
            autoClose: true,
            clickThrough: true,
            closeOnClickOutside: true,
            closeOnBlur: true,
            backdropColor: false,
            autoFocus: false,
          },
          EDITOR_SUGGEST_TOOLTIP,
        ).open({ force: true });
      } else {
        return tooltip.close(EDITOR_SUGGEST_TOOLTIP);
      }
    }
  };
  return editor;
};
