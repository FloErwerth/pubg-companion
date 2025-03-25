import { useStepperContext } from '~/components/Stepper/Stepper';
import { StepperPage } from '~/components/Stepper/StepperPage';
import { Image } from 'expo-image';
import { styles } from '~/pages/Onboarding/styles';
import { Button, PrimaryButton } from '~/components/Button';
import { Text } from '~/components/Text';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View } from 'react-native';
import { Lock, LockKeyholeIcon } from 'lucide-react-native';
import { colors } from '~/theme';
import {SelectableButtonGroup} from "~/components/SelectableButtonGroup/SelectableButtonGroup";
import {Platform, PlatformType, Region, RegionType, usePlayerStore} from "~/store/player";

const regionOptions: RegionType[] = [Region.EU, Region.NA, Region.OC,Region.SA, Region.AS];
const platformOptions: PlatformType[] = [Platform.PC, Platform.PS, Platform.XBOX];
export const SettingsPage = () => {
  const { nextPage } = useStepperContext();
  const { t } = useTranslation('translation');
  const { region, setRegion, platform, setPlatform } = usePlayerStore();

  return (
    <StepperPage>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={require('assets/images/pubg.png')}
          contentPosition="top"
          style={styles.image}
        />
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{t('onboarding.settings.title')}</Text>
          <Text style={styles.moreInfo}>{t('onboarding.settings.explaination')}</Text>
          <Text style={styles.subtitle}>Region</Text>
          <SelectableButtonGroup onSelectOption={setRegion} value={region} options={regionOptions} />
          <Text style={styles.subtitle}>Platform</Text>
          <SelectableButtonGroup onSelectOption={setPlatform} value={platform} options={platformOptions} />
        </View>
        <PrimaryButton style={styles.nextPageButton} onPress={nextPage}>
          <Text style={styles.nextPageButtonText}>{t('common.continue')}</Text>
        </PrimaryButton>
        <View style={styles.privacyWrapper}>
          <LockKeyholeIcon size={12} color={colors.grey} />
          <Text style={styles.privacyText}>{t('onboarding.settings.privacy')}</Text>
        </View>
      </KeyboardAwareScrollView>
    </StepperPage>
  );
};
