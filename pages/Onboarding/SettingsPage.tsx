import { Image } from "expo-image";
import { Info, LockKeyholeIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BottomSheet } from "~/components/BottomSheet/BottomSheet";
import { useBottomSheetControls } from "~/components/BottomSheet/useBottomSheet";
import { PrimaryButton } from "~/components/Button";
import { SelectableButtonGroup } from "~/components/SelectableButtonGroup/SelectableButtonGroup";
import { useStepperContext } from "~/components/Stepper/Stepper";
import { StepperPage } from "~/components/Stepper/StepperPage";
import { Text } from "~/components/Text";
import { styles } from "~/pages/Onboarding/styles";
import {
	GameMode,
	GamemodeType,
	Perspective,
	PerspectiveType,
	Platform,
	PlatformType,
	Region,
	RegionType,
	usePlayerStore,
} from "~/store/player";
import { colors } from "~/theme";

const regionOptions: RegionType[] = [
	Region.EU,
	Region.NA,
	Region.OC,
	Region.SA,
	Region.AS,
	Region.JP,
	Region.RU,
	Region.KAKAO,
	Region.SEA,
	Region.KRJP,
];
const perspectiveOptions: PerspectiveType[] = [
	Perspective.TPP,
	Perspective.FPP,
];
const gameModeOptions: GamemodeType[] = [
	GameMode.SOLO,
	GameMode.DUO,
	GameMode.SQUAD,
];
const platformOptions: PlatformType[] = [
	Platform.PC,
	Platform.PS,
	Platform.XBOX,
];

const disabledRegionForPlatformMap: Record<PlatformType, RegionType[]> = {
	[Platform.PC]: [],
	[Platform.PS]: [
		Region.SA,
		Region.JP,
		Region.RU,
		Region.KAKAO,
		Region.SEA,
		Region.KRJP,
	],
	[Platform.XBOX]: [
		Region.OC,
		Region.JP,
		Region.RU,
		Region.KAKAO,
		Region.SEA,
		Region.KRJP,
	],
};

export const SettingsPage = () => {
	const { nextPage } = useStepperContext();
	const { bottomSheetRef: gameModeSheetRef, openSheet: openGameModeSheet } =
		useBottomSheetControls();
	const {
		bottomSheetRef: perspectiveSheetRef,
		openSheet: openPerspectiveSheet,
	} = useBottomSheetControls();
	const { t } = useTranslation();
	const {
		region,
		setRegion,
		platform,
		setPlatform,
		gameMode,
		setGameMode,
		perspective,
		setPerspective,
	} = usePlayerStore();

	return (
		<StepperPage>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollView}
			>
				<Image
					source={require("assets/images/pubg.png")}
					contentPosition="top"
					style={styles.image}
				/>
				<View style={styles.contentWrapper}>
					<Text style={styles.title}>{t("onboarding.settings.title")}</Text>
					<Text style={styles.moreInfo}>
						{t("onboarding.settings.explaination")}
					</Text>
					<View style={styles.subWrapper}>
						<Text style={styles.subtitle}>
							{t("onboarding.settings.platform")}
						</Text>
						<SelectableButtonGroup
							defaultValue={Platform.PC}
							onSelectOption={setPlatform}
							value={platform}
							maxItemsInRow={3}
							options={platformOptions}
						/>
					</View>
					<View style={styles.subWrapper}>
						<Text style={styles.subtitle}>
							{t("onboarding.settings.region")}
						</Text>
						<SelectableButtonGroup
							onSelectOption={setRegion}
							defaultValue={Region.EU}
							value={region}
							maxItemsInRow={5}
							options={regionOptions}
							disabledOptions={disabledRegionForPlatformMap[platform]}
						/>
					</View>

					<View style={styles.subWrapper}>
						<View style={styles.gameModeWrapper}>
							<Text style={styles.subtitle}>
								{t("onboarding.settings.perspective")}
							</Text>
							<Pressable onPress={openPerspectiveSheet}>
								<Info color={colors.foreground} size={20} />
							</Pressable>
						</View>
						<SelectableButtonGroup
							onSelectOption={setPerspective}
							defaultValue={Perspective.TPP}
							value={perspective}
							options={perspectiveOptions}
						/>
					</View>
					<View style={styles.subWrapper}>
						<View style={styles.gameModeWrapper}>
							<Text style={styles.subtitle}>
								{t("onboarding.settings.gamemode")}
							</Text>
							<Pressable onPress={openGameModeSheet}>
								<Info color={colors.foreground} size={20} />
							</Pressable>
						</View>
						<SelectableButtonGroup
							onSelectOption={setGameMode}
							defaultValue={GameMode.SOLO}
							value={gameMode}
							maxItemsInRow={3}
							options={gameModeOptions}
						/>
					</View>
				</View>
				<PrimaryButton style={styles.nextPageButton} onPress={nextPage}>
					<Text style={styles.nextPageButtonText}>{t("common.continue")}</Text>
				</PrimaryButton>
				<View style={styles.privacyWrapper}>
					<LockKeyholeIcon size={12} color={colors.grey} />
					<Text style={styles.privacyText}>
						{t("onboarding.settings.privacy")}
					</Text>
				</View>
				<BottomSheet
					title={t("onboarding.settings.perspective")}
					reference={perspectiveSheetRef}
				>
					<Text>{t("onboarding.settings.perspectiveHint")}</Text>
				</BottomSheet>
				<BottomSheet
					title={t("onboarding.settings.gamemode")}
					reference={gameModeSheetRef}
				>
					<Text>{t("onboarding.settings.gameModeHint")}</Text>
				</BottomSheet>
			</KeyboardAwareScrollView>
		</StepperPage>
	);
};
