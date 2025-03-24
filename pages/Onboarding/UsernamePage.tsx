import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Image} from "expo-image";
import {styles} from "~/pages/Onboarding/styles";
import {ActivityIndicator, View} from "react-native";
import {Text} from "~/components/Text";
import {Input} from "~/components/Input";
import {colors} from "~/theme";
import {Button, PrimaryButton} from "~/components/Button";
import {Pencil} from "lucide-react-native";
import {StepperPage} from "~/components/Stepper/StepperPage";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useAuthenticationStore} from "~/store/player";
import {playerApi} from "~/api/player";
import {router} from "expo-router";
import {useStepperContext} from "~/components/Stepper/Stepper";

export const UsernamePage = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'onboarding' });
    const [name, setName] = useState('');
    const { id, setId, steamName, setSteamName } = useAuthenticationStore();
    const [showNotFoundError, setShowNotFoundError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { nextPage } = useStepperContext();

    const handlePress = async () => {
        setShowNotFoundError(false);
        setIsLoading(true);

        await playerApi.searchForPlayer(
            name,
            (id) => {
                setId(id);
                setSteamName(name);
                setName('');
                setIsLoading(false);
            },
            () => {
                setIsLoading(false);
                setShowNotFoundError(true);
            }
        );
    };

    const handleUsernameInput = (name: string) => {
        setShowNotFoundError(false);
        setName(name);
    };


    const StepperPageButton = () => {
        return <PrimaryButton
            style={{  justifyContent: "center"}}
            onPress={nextPage}>
            <Text style={{fontSize: 18}}>{t(id ? 'connect' : 'search')}</Text>
            {isLoading && <ActivityIndicator size="small" />}
        </PrimaryButton>
    }

    return <StepperPage>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Image
                source={require('assets/images/pubg.png')}
                contentPosition="center"
                style={styles.image}
            />
            <View style={{marginTop: 8,gap: 8}}>
                <Text style={{ fontSize: 22, fontFamily: "Space-Grotesk-Bold"}}>{t('title')}</Text>
                <Text style={{fontSize: 16, marginBottom: 8}}>{t('explaination')}</Text>
                {!id && (
                    <Input placeholder="PUBG Username" onChangeText={handleUsernameInput} value={name} />
                )}
                {id && (
                    <View style={{ borderRadius: 8, padding: 8, backgroundColor: colors.grey6}}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} className="flex-row items-center justify-between">
                            <View>
                                <Text>{t('yourName')}</Text>
                                <Text style={{fontSize: 18}}>{steamName}</Text>
                            </View>
                            <Button
                                onPress={() => {
                                    setName(steamName);
                                    setId('');
                                    setSteamName('');
                                }}>
                                <Pencil color={colors.white} size="20" />
                            </Button>
                        </View>
                    </View>
                )}
                {showNotFoundError && <Text>{t('notFound')}</Text>}
            </View>
        </KeyboardAwareScrollView>
        <StepperPageButton />

    </StepperPage>
}