import { Stepper } from '~/components/Stepper/Stepper';
import { SettingsPage } from '~/pages/Onboarding/SettingsPage';
import { UsernamePage } from '~/pages/Onboarding/UsernamePage';

export const Onboarding = () => {
  return (
    <Stepper>
      <SettingsPage />
      <UsernamePage />
    </Stepper>
  );
};
