import {useStepperContext} from "~/components/Stepper/Stepper";
import {View} from "react-native";
import {Text} from "~/components/Text";
import {StepperPage} from "~/components/Stepper/StepperPage";
import {Button} from "~/components/Button";

export const SettingsPage = () => {
    const { previousPage } = useStepperContext();

    return <StepperPage>
        <Button onPress={previousPage}><Text>Zurück</Text></Button>
    </StepperPage>
}