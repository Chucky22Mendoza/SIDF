'use client';

import styles from './steps.module.scss';
import Dot from './Dot';
import Line from './Line';
import React from 'react';
import Image from 'next/image';

type StepsProps = {
  title?: string;
  step: number;
  prevLabel?: string;
  nextLabel?: string;
  steps: {
    label: string;
    content: React.ReactElement;
    onClickNext?: (nextStep: number) => void;
    onClickPrev?: (prevStep: number) => void;
  }[];
};

export default function StepsBar({
  step,
  steps,
  title,
  prevLabel = 'Atrás',
  nextLabel = 'Continuar',
}: StepsProps) {
  return (
    <div className="flex flex-1 self-stretch justify-center flex-col gap-4">
      <div className={styles.head}>
        <div>
          <button
            onClick={() => {
              steps[step].onClickPrev?.(step - 1);
            }}
          >
            <Image src="/images/arrow-back.svg" alt="Atrás" width={24} height={24} loading="lazy" />
            <span>{prevLabel}</span>
          </button>
        </div>
        <div>
          {title && <h1>{title}</h1>}
        </div>
        <div>
          <button
            onClick={() => {
              steps[step].onClickNext?.(step + 1);
            }}
          >
            <span>{nextLabel}</span>
            <Image src="/images/arrow-back.svg" alt="Siguiente" width={24} height={24} loading="lazy" />
          </button>
        </div>
      </div>

      <div className={styles.bar}>
        <div className={styles.progress}>
          {steps.map((_, index) => (
            <React.Fragment key={`dot-${index}`}>
              <Dot isActive={step >= index} />
              {index === steps.length - 1 ? null : <Line isActive={step >= index + 1} />}
            </React.Fragment>
          ))}
        </div>
        <div className={styles.spans}>
          {
            steps.map((st, index) => {
              const currentStep = step > steps.length - 1 ? steps.length - 1 : step;
              return (
                <div key={`${st}-${index}`} className={`${step >= index ? styles.active : ''} ${currentStep === index ? styles.current : ''}`}>
                  <span>{`${index + 1}.0`}</span>
                  <span>{st.label}</span>
                </div>
              )
            })}
        </div>
      </div>
      <div className="flex flex-1 self-stretch flex-col">
        {steps[step].content}
      </div>
    </div>
  );
}