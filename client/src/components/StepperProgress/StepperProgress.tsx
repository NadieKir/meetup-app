import { useContext } from 'react';

import {
  TabsIndicator,
  Step,
  StepperContext,
  StepperContextType,
  StepDescriptor,
  Scrollable,
} from 'components';

import styles from './StepperProgress.module.scss';

interface StepperProgressProps {
  currentStep: number;
}

export const StepperProgress = ({ currentStep }: StepperProgressProps) => {
  const { stepsDescriptor } = useContext(
    StepperContext,
  ) as StepperContextType<any>;

  return (
    <Scrollable>
      <div className={styles.steps}>
        {stepsDescriptor.map(
          (step: StepDescriptor, i: number): JSX.Element => (
            <Step
              key={step.title}
              variant={step.variant}
              title={step.title}
              stepNumber={i + 1}
            ></Step>
          ),
        )}
      </div>
      <TabsIndicator
        tabsAmount={stepsDescriptor.length}
        currentTab={currentStep}
      />
    </Scrollable>
  );
};
