import { CustomEditor } from '../slate.types';

export const withImages = (editor: CustomEditor) => {
  const { isVoid, isInline, markableVoid } = editor;

  editor.isInline = (element) => {
    return element.inline ?? isInline(element);
  };

  editor.isVoid = (element) => {
    return element.void ?? isVoid(element);
  };

  editor.markableVoid = (element) => {
    return element.inline ?? markableVoid(element);
  };

  // editor.insertData = (data) => {
  //   const text = data.getData('text/plain');
  //   const { files } = data;

  //   if (files && files.length > 0) {
  //     for (const file of files) {
  //       const reader = new FileReader();
  //       const [mime] = file.type.split('/');

  //       if (mime === 'image') {
  //         reader.addEventListener('load', () => {
  //           const url = reader.result;
  //           insertImage(editor, url as any);
  //         });

  //         reader.readAsDataURL(file);
  //       }
  //     }
  //   } else if (text) {
  //     insertImage(editor, text);
  //   } else {
  //     insertData(data);
  //   }
  // };

  return editor;
};
