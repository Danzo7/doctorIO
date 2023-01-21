import { useCallback, useMemo, useRef } from 'react';
import './style/index.scss';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
} from 'slate-react';
import { withImages } from '@libs/slate_editor/slate-image';
import { withLayout } from '@libs/slate_editor/commons/normilazation/withLayout';
import { withDynamicContent } from '@libs/slate_editor/dynamic_block/withDynamicContent';
import { withTables } from '@libs/slate_editor/slate-tables';
import { withDynamicAttributes } from '@libs/slate_editor/slate-dynamic-attributes/withDynamicAttributes';
import { createEditor } from '@libs/slate_editor/createEditor';
import EditorLeaf from '@libs/slate_editor/components/editor_leaf';
import { useTemplateStore } from '@stores/templateStore';
import { cmToPx } from '@helpers/math.helper';
import EditorElement from '@libs/slate_editor/components/editor_element';
import { mapElements } from '@libs/slate_editor/commons/core';
import { useReactToPrint } from 'react-to-print';
interface PrintPaperProps {}
const paperSize = { width: 14.8, height: 21 };
const margins = { top: 1.27, bottom: 1.27, left: 1.27, right: 1.27 };

export default function PrintPaper({}: PrintPaperProps) {
  const editor = useMemo(
    () =>
      withImages(
        withLayout(
          withDynamicContent(withTables(withDynamicAttributes(createEditor()))),
        ),
      ),
    [],
  );

  const { desendants } = useTemplateStore.getState();

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <EditorLeaf {...props} />,
    [],
  );
  const renderElement = useCallback(
    (props: RenderElementProps) => <EditorElement {...props} />,
    [],
  );
  const componentRef = useRef<HTMLDivElement>();
  const handlePrint = useReactToPrint({
    pageStyle: `@media print {
      @page {
        size: 14.8cm 21cm;
        margin: 0;
      }
    }`,
    content: () => componentRef.current as HTMLDivElement,
  });
  return (
    <div
      className="print-paper"
      ref={(ref) => {
        if (ref) componentRef.current = ref;
        handlePrint();
      }}
    >
      <Slate
        editor={editor}
        value={mapElements(desendants, (node) => {
          if (node.type == 'attribute') {
            const {
              children: [text],
              reference,
            } = node;
            return {
              type: 'span',
              children: [{ ...text, text: reference }],
              inline: true,
              void: false,
            };
          }
          if (node.type == 'dynamic') {
            return {
              ...node,
              type: 'dynamic',
              replace: true,
              children: [
                {
                  type: 'h1',
                  children: [
                    {
                      text: 'Hello',
                      underline: true,
                    },
                  ],
                  align: 'center',
                },
                {
                  type: 'nl',
                  children: [
                    {
                      text: "{name} {dosage} CP /JOUR qsp {qts} JOURS {duration + ' '}{description}",
                    },
                    {
                      text: "{name} {dosage} CP /JOUR qsp {qts} JOURS {duration + ' '}{description}",
                    },
                    {
                      text: "{name} {dosage} CP /JOUR qsp {qts} JOURS {duration + ' '}{description}",
                    },
                  ],
                },
              ],
            };
          }

          return node;
        })}
      >
        <Editable
          readOnly
          css={{
            width: cmToPx(paperSize.width),
            height: cmToPx(paperSize.height),
            maxHeight: cmToPx(paperSize.height),
            padding: `${cmToPx(margins.top)}px ${cmToPx(
              margins.right,
            )}px ${cmToPx(margins.bottom)}px ${cmToPx(margins.left)}px`,
            display: 'flex',
            flexDirection: 'column',
          }}
          placeholder="Write something..."
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
      </Slate>{' '}
      <Slate
        editor={editor}
        value={mapElements(desendants, (node) => {
          if (node.type == 'attribute') {
            const {
              children: [text],
              reference,
            } = node;
            return {
              type: 'span',
              children: [{ ...text, text: reference }],
              inline: true,
              void: false,
            };
          }
          if (node.type == 'dynamic') {
            return {
              ...node,
              type: 'dynamic',
              replace: true,
              children: [
                {
                  type: 'h1',
                  children: [
                    {
                      text: 'Hello',
                      underline: true,
                    },
                  ],
                  align: 'center',
                },
                {
                  type: 'nl',
                  children: [
                    {
                      text: "{name} {dosage} CP /JOUR qsp {qts} JOURS {duration + ' '}{description}",
                    },
                    {
                      text: "{name} {dosage} CP /JOUR qsp {qts} JOURS {duration + ' '}{description}",
                    },
                    {
                      text: "{name} {dosage} CP /JOUR qsp {qts} JOURS {duration + ' '}{description}",
                    },
                  ],
                },
              ],
            };
          }

          return node;
        })}
      >
        <Editable
          readOnly
          css={{
            width: cmToPx(paperSize.width),
            height: cmToPx(paperSize.height),
            maxHeight: cmToPx(paperSize.height),
            padding: `${cmToPx(margins.top)}px ${cmToPx(
              margins.right,
            )}px ${cmToPx(margins.bottom)}px ${cmToPx(margins.left)}px`,
            display: 'flex',
            flexDirection: 'column',
          }}
          placeholder="Write something..."
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
      </Slate>
    </div>
  );
}
/*
  {
                  type: 'table',
                  children: [
                    {
                      type: 'tr',
                      children: [
                        {
                          type: 'td',
                          children: [{ type: 'p', children: [{ text: 'N°' }] }],
                        },
                        {
                          type: 'td',
                          colspan: 5,

                          children: [
                            { type: 'p', children: [{ text: 'Name' }] },
                          ],
                        },
                        {
                          type: 'td',
                          colspan: 3,
                          children: [
                            { type: 'p', children: [{ text: 'Dose' }] },
                          ],
                        },
                        {
                          type: 'td',
                          children: [
                            { type: 'p', children: [{ text: ' Duration' }] },
                          ],
                        },
                        {
                          type: 'td',
                          children: [
                            { type: 'p', children: [{ text: 'Qts' }] },
                          ],
                        },
                        {
                          type: 'td',
                          colspan: 6,
                          children: [
                            {
                              type: 'p',
                              children: [{ text: 'Description' }],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: 'tr',
                      children: [
                        {
                          type: 'td',
                          children: [{ type: 'p', children: [{ text: '1.' }] }],
                        },
                        {
                          type: 'td',
                          colspan: 5,

                          children: [
                            { type: 'p', children: [{ text: 'Totinal 185g' }] },
                          ],
                        },
                        {
                          type: 'td',
                          colspan: 3,
                          children: [
                            { type: 'p', children: [{ text: '18 CP/Jour' }] },
                          ],
                        },
                        {
                          type: 'td',
                          children: [{ type: 'p', children: [{ text: ' 5' }] }],
                        },
                        {
                          type: 'td',
                          children: [{ type: 'p', children: [{ text: '5' }] }],
                        },
                        {
                          type: 'td',
                          colspan: 6,
                          children: [
                            {
                              type: 'p',
                              children: [{ text: '-Eat after tha day ends' }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                }, */