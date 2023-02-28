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
import { cmToPx } from '@helpers/math.helper';
import EditorElement from '@libs/slate_editor/components/editor_element';
import { mapElements } from '@libs/slate_editor/commons/core';
import { useReactToPrint } from 'react-to-print';
import {
  Appointment,
  MedicalCertificate,
  Patient,
} from '@models/instance.model';
import { useClinicsStore } from '@stores/clinicsStore';
import { format, isDate } from 'date-fns';
import { SETTINGS } from '@stores/appSettingsStore';
import { useGetPrintTemplateQuery } from '@redux/clinic/templates/templatesApi';
import { CommonEditor } from '@libs/slate_editor/commons/CommonEditor';
import LoadingSpinner from '@components/loading_spinner';
import { Member } from '@models/server.models';
import ModalContainer from '@components/modal_container';
import { color } from '@assets/styles/color';
import Print from 'toSvg/print.svg?icon';
import TextButton from '@components/buttons/text_button';
interface PrintPaperProps {
  content: MedicalCertificate;
  patient: Patient;
  member: Pick<Member, 'id' | 'name'>;
  appointment: Pick<Appointment, 'id' | 'date'>;
}
const paperSize = { width: 14.8, height: 21 };
const margins = { top: 1, bottom: 0, left: 1, right: 1 };

export default function PrintPaper({
  content,
  patient,
  member,
  appointment,
}: PrintPaperProps) {
  const editor = useMemo(
    () =>
      withImages(
        withLayout(
          withDynamicContent(withTables(withDynamicAttributes(createEditor()))),
        ),
      ),
    [],
  );

  const { data, isLoading, isSuccess } = useGetPrintTemplateQuery();
  const desendants =
    isSuccess && CommonEditor.isValidDesendants(data.template)
      ? data.template
      : CommonEditor.initElement();
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
      }
    }`,
    content: () => componentRef.current as HTMLDivElement,
  });
  const clinicData = useClinicsStore.getState().getSelectedClinic();

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <ModalContainer
      title="Preview"
      controlsPosition="end"
      controls={
        <TextButton
          Icon={Print}
          text="Print"
          backgroundColor={color.cold_blue}
          radius={7}
          onPress={() => {
            if (componentRef.current != undefined) handlePrint();
          }}
        />
      }
    >
      <div
        css={{
          maxHeight: 400,
          overflowY: 'scroll',
          padding: 50,
          backgroundColor: color.darkersec_color,
          borderRadius: 7,
          paddingTop: 25,
          border: ` 1px solid ${color.border_color} `,
        }}
      >
        <div css={{ boxShadow: '0 0 5px 3px ' + color.darker }}>
          <div
            className="print-paper"
            ref={(ref) => {
              if (ref) componentRef.current = ref;
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
                  let replacementString = '';
                  const [table, attr] = reference.split('.');
                  switch (table) {
                    case 'Patient':
                      replacementString = (patient as any)?.[attr] ?? '';
                      break;
                    case 'Clinic':
                      replacementString = (clinicData as any)?.[attr] ?? '';
                      break;
                    case 'Doctor':
                      replacementString = (member as any)?.[attr] ?? '';
                      break;
                    case 'Appointment':
                      replacementString = (appointment as any)?.[attr] ?? '';
                      break;
                  }
                  replacementString = isDate(replacementString)
                    ? format(replacementString as any, SETTINGS.dateFormat)
                    : replacementString.toString();
                  return {
                    type: 'span',
                    children: [{ ...text, text: replacementString }],
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
                            text: content.title,
                          },
                        ],
                        align: 'center',
                      },
                      ...content.description,
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
        </div>
      </div>
    </ModalContainer>
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
