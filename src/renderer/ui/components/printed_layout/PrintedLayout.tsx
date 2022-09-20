import color from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import { Drug } from '@models/instance.model';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './style/index.scss';
interface PrintedLayoutProps {
  clinicName: string;
  ClinicAddress: string;
  doctorName: string;
  patientName: string;
  patientAge: number;
  drugList: Drug[];
}
export default function PrintedLayout({
  clinicName,
  ClinicAddress,
  doctorName,
  patientName,
  patientAge,
  drugList,
}: PrintedLayoutProps) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <ModalContainer
      controls={
        <TextButton
          text="Print now"
          fontSize={14}
          fontColor={color.white}
          fontWeight={700}
          backgroundColor={color.good_green}
          padding=" 5px 15px"
          width={'100%'}
          onPress={handlePrint}
        />
      }
    >
      <div css={{ display: 'none' }}>
        <div ref={componentRef} className="printed-layout">
          <div className="printed-layout-header">
            <span>المؤسسة العمومية للصحة</span>
            <span>{clinicName}</span>
          </div>
          <span>ORDONNACE</span>
          <div className="info-container">
            <span>
              {ClinicAddress}, le : {Date.now()}
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
      </div>
      <div className="printed-layout" css={{ height: 500, overflowY: 'auto' }}>
        <div className="printed-layout-header">
          <span>المؤسسة العمومية للصحة</span>
          <span>{clinicName}</span>
        </div>
        <span>ORDONNACE</span>
        <div className="info-container">
          <span>
            {ClinicAddress}, le : {Date.now()}
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
    </ModalContainer>
  );
}
