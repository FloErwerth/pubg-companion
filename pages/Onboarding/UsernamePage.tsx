import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '~/pages/Onboarding/styles';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '~/components/Text';
import { Input } from '~/components/Input';
import { colors } from '~/theme';
import { Button, PrimaryButton } from '~/components/Button';
import { LockKeyholeIcon, Pencil } from 'lucide-react-native';
import { StepperPage } from '~/components/Stepper/StepperPage';
import { Trans, useTranslation } from 'react-i18next';
import { useState } from 'react';
import { usePlayerStore } from '~/store/player';
import { playerApi } from '~/api/player';
import { useStepperContext } from '~/components/Stepper/Stepper';

export const UsernamePage = () => {
  const { t } = useTranslation('translation');
  const [name, setName] = useState('');
  const { id, setId, steamName, setSteamName } = usePlayerStore();
  const [showNotFoundError, setShowNotFoundError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { previousPage } = useStepperContext();

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
    return (
      <PrimaryButton style={styles.nextPageButton} onPress={handlePress}>
        <Text style={styles.nextPageButtonText}>
          {t(id ? 'onboarding.connect' : 'onboarding.search')}
        </Text>
        {isLoading && <ActivityIndicator size="small" />}
      </PrimaryButton>
    );
  };

  const ChangeName = () => {
    return (
      <View style={{ borderRadius: 8, padding: 8, backgroundColor: colors.grey6 }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          className="flex-row items-center justify-between">
          <View>
            <Text>{t('onboarding.yourName')}</Text>
            <Text style={{ fontSize: 18 }}>{steamName}</Text>
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
    );
  };

  return (
    <StepperPage>
      <Button onPress={previousPage}>
        <Text>{t('common.back')}</Text>
      </Button>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{t('onboarding.title')}</Text>
          <Text>
            <Trans
              i18nKey="onboarding.explaination"
              components={{
                strong: <Text style={[styles.moreInfo, { fontFamily: 'Space-Grotesk-Bold' }]} />,
              }}
            />
          </Text>
          {!id && (
            <Input
              placeholder={t('onboarding.placeholder')}
              onChangeText={handleUsernameInput}
              value={name}
            />
          )}
          {id && (
            <>
              <ChangeName />
              <Text style={{ color: colors.success }}>{t('onboarding.found')}</Text>
              <Text>
                <Trans
                  i18nKey="onboarding.companionReady"
                  components={{
                    strong: (
                      <Text style={[styles.moreInfo, { fontFamily: 'Space-Grotesk-Bold' }]} />
                    ),
                  }}
                />
              </Text>
              <Text>{t('onboarding.changeLater')}</Text>
            </>
          )}
          <Text>{showNotFoundError ? t('onboarding.notFound') : ''}</Text>
        </View>
      </KeyboardAwareScrollView>
      <StepperPageButton />
      <View style={styles.privacyWrapper}>
        <LockKeyholeIcon size={12} color={colors.grey} />
        <Text style={styles.privacyText}>{t('onboarding.settings.privacy')}</Text>
      </View>
    </StepperPage>
  );
};
