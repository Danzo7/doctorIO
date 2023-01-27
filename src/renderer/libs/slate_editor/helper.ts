import { Element, Transforms, NodeEntry } from 'slate';
import {
  CustomEditor,
  CustomElement,
  FormattedText,
  TABLE_TYPES,
} from './slate.types';
import { Drug, MedicalCertificate } from '@models/instance.model';

export const elementIsEmpty = (element: CustomElement) => {
  return (
    !TABLE_TYPES.includes(element.type as typeof TABLE_TYPES[number]) &&
    'children' in element &&
    element.children.length === 1 &&
    (element.children[0] as FormattedText).text === ''
  );
};

export const enforceType = (
  editor: CustomEditor,
  [child, childPath]: NodeEntry<CustomElement>,
  type: Pick<CustomElement, 'type'>['type'],
) => {
  if (Element.isElement(child) && child.type !== type) {
    const newProperties: Partial<CustomElement> = { type };
    Transforms.setNodes<CustomElement>(editor, newProperties, {
      at: childPath,
    });
  }
};
export const prescriptionToMedicalCertificate = (
  prescriptions: Drug[],
): MedicalCertificate => {
  return {
    title: 'Prescription list',
    id: '-1',
    description: [
      {
        type: 'nl',
        children: prescriptions.map(
          ({ name, dosage, qts, duration, description }) => ({
            text: `${name} ${dosage} CP /JOUR qsp ${qts} JOURS ${
              duration + ' '
            }${description}`,
          }),
        ),
      },
    ],
  };
};
