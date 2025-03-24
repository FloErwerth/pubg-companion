import {Stepper} from "~/components/Stepper/Stepper";
import {UsernamePage} from "~/pages/Onboarding/UsernamePage";
import {SettingsPage} from "~/pages/Onboarding/SettingsPage";

export const Onboarding = () => {
    return <Stepper pages={[<UsernamePage />, <SettingsPage />]} />
}