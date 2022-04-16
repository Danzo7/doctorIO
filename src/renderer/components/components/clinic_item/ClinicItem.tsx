import React from 'react';
import './style/index.scss';
import Menu from 'toSvg/bigMenu.svg';
import Clinic from 'toSvg/clinic.svg?icon';
import MedicalAssistant from 'toSvg/medicalAssistant.svg';
import Patient from 'toSvg/patient.svg';
import Union from 'toSvg/Union.svg';
import { css } from '@emotion/css';
import colors from '@colors';
interface TimeToClose {
  hour: number;
  min: number;
}
interface ClinicItemProps {
  selected: boolean;
  timeToClose: TimeToClose;
  numOfAssistants: number;
  numOfPatients: number;
}
export default function ClinicItem({
  selected,
  timeToClose,
  numOfAssistants,
  numOfPatients,
}: ClinicItemProps) {
  return (
    <div
      className={`clinic-item ${css`
        background-color: ${selected ? '' : colors.secondary_color};
      `} `}
    >
      <div className="header">
        <span>Default {selected ? '-Selected' : ''}</span>
        <div className="option-menu">
          <Menu />
        </div>
      </div>
      <div className="time-container">
        <Clinic />
        <span>Time to close</span>
        <span>
          {timeToClose.hour == 0 && '00'}
          {timeToClose.hour > 0 && timeToClose.hour < 24
            ? timeToClose.hour
            : ''}
          h:
          {timeToClose.min >= 0 &&
            timeToClose.min < 10 &&
            `0${timeToClose.min}`}
          {timeToClose.min >= 10 && timeToClose.min < 60 ? timeToClose.min : ''}
          m
        </span>
      </div>
      <div className="stats-container">
        <div className="info-container">
          <MedicalAssistant />
          <span>{numOfAssistants}</span>
          <span>Online</span>
        </div>
        <Union />
        <div className="info-container">
          <Patient />
          <span>{numOfPatients}</span>
          <span>In queue</span>
        </div>
      </div>
    </div>
  );
}
