import LoadingSpinner from '@components/loading_spinner';
import { Drug } from '@models/instance.model';
import { useGetClinicQuery } from '@redux/clinic/clinicApi';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './style/index.scss';
interface PrintedLayoutProps {
  doctorName: string;
  patientName: string;
  patientAge: number;
  drugList: Drug[];
}
export default function PrintedLayout({
  doctorName,
  patientName,
  patientAge,
  drugList,
}: PrintedLayoutProps) {
  const { isSuccess, isLoading, data } = useGetClinicQuery();
  const componentRef = useRef<HTMLDivElement | null>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current as HTMLDivElement,
  });
  return (
    <div css={{ display: 'none' }}>
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        <div
          ref={(e) => {
            if (componentRef) componentRef.current = e;
            handlePrint();
          }}
          className="printed-layout"
        >
          <div className="printed-layout-header">
            <span>المؤسسة العمومية للصحة</span>
            <span>{data.name}</span>
          </div>
          <span>ORDONNACE</span>
          <div className="info-container">
            <span>
              {data.address}, le : {Date.now()}
            </span>
            <span>Delivre par le Docteur : {doctorName}</span>
            <div className="patient-info">
              <span>a M. {patientName}</span>
              <span>Age : {patientAge}</span>
            </div>
          </div>

          <div className="drug-list">
            {drugList.map(
              ({ name, dosage, qts, duration, description }, index) => (
                <span key={index}>
                  {name} {dosage} CP /JOUR qsp {qts} JOURS {duration + ' '}
                  {description}
                </span>
              ),
            )}
          </div>
          <div className="bottom-info">
            <span>بالقليل من الدم الذي تتبرعون به تنقذون حياة انسان</span>
          </div>
        </div>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
}
