import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { playerApi } from '~/api/player';
import {Button, PrimaryButton} from '~/components/Button';
import { useAuthenticationStore } from '~/store/player';
import { Text } from '~/components/Text/Text';
import { Pencil } from 'lucide-react-native';
import { Input } from '~/components/Input/Input';
import {colors} from "~/theme";

const imageStyle = { width: '100%', height: 250 } as const;

export default function Onboarding() {
  const { t } = useTranslation('translation', { keyPrefix: 'onboarding' });
  const [name, setName] = useState('');
  const { id, setId, steamName, setSteamName } = useAuthenticationStore();
  const [showNotFoundError, setShowNotFoundError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={require('assets/images/pubg.png')}
          contentPosition="center"
          style={imageStyle}
        />
        <View style={{ padding: 16,
          backgroundColor: colors.background, flex: 1 }}>
          <View style={{gap: 8}}>
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
        </View>
        <PrimaryButton
          style={{ margin: 8, justifyContent: "center"}}
          disabled={(!id && !name) || isLoading}
          onPress={!id ? handlePress : () => router.replace('/')}>
          <Text style={{fontSize: 18}}>{t(id ? 'connect' : 'search')}</Text>
          {isLoading && <ActivityIndicator size="small" />}
        </PrimaryButton>
      </KeyboardAwareScrollView>
    </View>
  );
}
