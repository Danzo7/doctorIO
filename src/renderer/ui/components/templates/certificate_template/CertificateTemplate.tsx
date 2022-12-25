import { useReactToPrint } from 'react-to-print';
import './style/index.scss';
import { useRef } from 'react';
import { useGetClinicQuery } from '@redux/clinic/clinicApi';
import LoadingSpinner from '@components/loading_spinner';
interface CertificateTemplateProps {
  doctorName: string;
  patientName: string;
  patientAge: number;
  description: string;
}
export default function CertificateTemplate({
  doctorName,
  patientName,
  patientAge,
  description,
}: CertificateTemplateProps) {
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
          className="certificate-template"
        >
          <div className="text-header">
            <div className="doctor-info-div">
              <span className="doctor-name-ar">الحكيم عبد العزيز مختاري</span>
              <span className="doctor-name-en">Dr: {doctorName}</span>
              <span className="clinic-name-ar">
                عيادة متخصصة في امراض و جراحة الاذن و الانف و الحنجرة و امراض
                الحساسية
              </span>
              <span className="clinic-name-en">{data.description}</span>
            </div>
            <div className="day-place-info">
              <span>Blida,</span>
              <span>Le: {Date.now()}</span>
            </div>
          </div>
          <span className="content-title">MEDICAL CERTIFICATE</span>
          <div className="content">
            <span>I the undersigned Dr {doctorName} </span>
            <span>
              Certifies that,Mr/Ms {patientName} age of {patientAge} old is
              followed at our consultation for: {description}
            </span>
          </div>
          <div className="text-footer">
            <span>Address: {data.address}.</span>
            <span>Mob: {data.phone}</span>
          </div>
        </div>
      ) : (
        <div>error</div>
      )}
    </div>
  );
}
