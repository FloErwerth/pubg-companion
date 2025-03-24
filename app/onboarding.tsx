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
import {Onboarding} from "~/pages/Onboarding";


export default function OnboardingPage() {
  return <Onboarding />
}
