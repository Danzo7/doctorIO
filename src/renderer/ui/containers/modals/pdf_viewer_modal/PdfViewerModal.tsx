import ModalContainer from '@components/modal_container';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './style/index.scss';
import { useState } from 'react';
interface PdfViewerModalProps {
  file: Blob;
}

export default function PdfViewerModal({ file }: PdfViewerModalProps) {
  const [numPage, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const objectUrl = window.URL.createObjectURL(file);

  return (
    <ModalContainer
      className="pdf-viewer-modal"
      controls={
        <>
          <p>
            Page {pageNumber} of {numPage}
          </p>
        </>
      }
    >
      <Document
        file={objectUrl}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
        }}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </ModalContainer>
  );
}
