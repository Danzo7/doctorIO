import ModalContainer from '@components/modal_container';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './style/index.scss';
import { useState } from 'react';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import PdfPageSwitcher from '@components/pdf_page_switcher';
import LoadingSpinner from '@components/loading_spinner';

interface PdfViewerModalProps {
  file: Blob;
  fileName: string;
}

export default function PdfViewerModal({
  file,
  fileName,
}: PdfViewerModalProps) {
  const [numPage, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const objectUrl = window.URL.createObjectURL(file);

  return (
    <ModalContainer
      className="pdf-viewer-modal"
      css={{ flexGrow: 1 }}
      controls={
        <div className="pdf-viewer-modal-controls">
          <PdfPageSwitcher
            text={`Page ${pageNumber} of ${numPage}`}
            onLeftPress={
              pageNumber > 1
                ? () => {
                    if (pageNumber > 1) setPageNumber(pageNumber - 1);
                  }
                : undefined
            }
            onRightPress={
              pageNumber < numPage
                ? () => {
                    if (pageNumber < numPage) setPageNumber(pageNumber + 1);
                  }
                : undefined
            }
          />
          <div css={{ position: 'absolute', right: 20 }}>
            <TextButton
              onPress={() => {
                const url = window.URL.createObjectURL(file);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              }}
              backgroundColor={color.good_green}
              text="Download"
              alignSelf="flex-end"
            />
          </div>
        </div>
      }
    >
      <div className="pdf-viewer-modal-content">
        <Document
          onLoadError={() => {}}
          error={<div>Error</div>}
          loading={<LoadingSpinner width={700} height={300} />}
          file={objectUrl}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
          }}
        >
          <Page
            error={<div>Error</div>}
            onLoadError={() => {}}
            pageNumber={pageNumber}
            width={700}
            loading={<LoadingSpinner width={700} height={'100%'} />}
          />
        </Document>
      </div>
    </ModalContainer>
  );
}
