import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { playerApi } from '~/api/player';
import { Button } from '~/components/Button';
import { useAuthenticationStore } from '~/store/player';
import { Text } from '~/components/Text/Text';
import { Pencil } from 'lucide-react-native';
import { Input } from '~/components/Input/Input';

const imageStyle = { width: '100%', height: 340 } as const;

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
    <Fragment>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={require('assets/images/pubg.png')}
          contentFit="contain"
          contentPosition="center"
          style={imageStyle}
        />
        <View className="gap-[4px] flex-1 p-2">
          <View className="gap-[4px]">
            <Text>{t('title')}</Text>
            <Text className="text-[18px] text-center">{t('explaination')}</Text>
            {!id && (
              <Input placeholder="PUBG Username" onChangeText={handleUsernameInput} value={name} />
            )}
            {id && (
              <View className="rounded-full p-1">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text>{t('yourName')}</Text>
                    <Text>{steamName}</Text>
                  </View>
                  <Button
                    onPress={() => {
                      setName(steamName);
                      setId('');
                      setSteamName('');
                    }}>
                    <Pencil color="$color.black" size="$0.75" />
                  </Button>
                </View>
              </View>
            )}
            {showNotFoundError && <Text>{t('onboarding.notFound')}</Text>}
          </View>
        </View>
        <Button
          style={{ margin: 8 }}
          disabled={(!id && !name) || isLoading}
          onPress={!id ? handlePress : () => router.replace('/')}>
          <Text>{t(id ? 'connect' : 'search')}</Text>
          {isLoading && <ActivityIndicator size="large" />}
        </Button>
      </KeyboardAwareScrollView>
    </Fragment>
  );
}
