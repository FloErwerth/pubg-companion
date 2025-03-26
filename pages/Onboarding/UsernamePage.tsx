import { router } from "expo-router";
import { ArrowLeft, LockKeyholeIcon, Pencil } from "lucide-react-native";
import { Fragment, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSearchForPlayer } from "~/api/player";
import { Button, PrimaryButton } from "~/components/Button";
import { Input } from "~/components/Input";
import { useStepperContext } from "~/components/Stepper/Stepper";
import { StepperPage } from "~/components/Stepper/StepperPage";
import { Text } from "~/components/Text";
import { styles } from "~/pages/Onboarding/styles";
import { usePlayerStore } from "~/store/player";
import { colors } from "~/theme";

export const UsernamePage = () => {
	const { t } = useTranslation("translation");
	const { id, setId, steamName, setSteamName } = usePlayerStore();
	const [showNotFoundError, setShowNotFoundError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { previousPage } = useStepperContext();
	const searchForPlayer = useSearchForPlayer(
		steamName,
		(id) => {
			setId(id);
			setIsLoading(false);
		},
		() => {
			setIsLoading(false);
			setShowNotFoundError(true);
		},
	);

	const handleSearchForPlayer = async () => {
		setShowNotFoundError(false);
		setIsLoading(true);

		await searchForPlayer();
	};

	const navigateToTabs = () => {
		router.navigate("/(tabs)");
	};

	const handleUsernameInput = (name: string) => {
		setShowNotFoundError(false);
		setSteamName(name);
	};

	const StepperPageButton = () => {
		return (
			<PrimaryButton
				style={styles.nextPageButton}
				onPress={!id ? handleSearchForPlayer : navigateToTabs}
			>
				<Text style={styles.nextPageButtonText}>
					{t(id ? "onboarding.connect" : "onboarding.search")}
				</Text>
				{isLoading && <ActivityIndicator size="small" />}
			</PrimaryButton>
		);
	};

	const ChangeName = () => {
		return (
			<View
				style={{ borderRadius: 8, padding: 8, backgroundColor: colors.grey6 }}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
					className="flex-row items-center justify-between"
				>
					<View>
						<Text>{t("onboarding.yourName")}</Text>
						<Text style={{ fontSize: 18 }}>{steamName}</Text>
					</View>
					<Button
						onPress={() => {
							setId("");
							setSteamName("");
						}}
					>
						<Pencil color={colors.white} size="20" />
					</Button>
				</View>
			</View>
		);
	};

	return (
		<StepperPage>
			<Button style={styles.backButton} onPress={previousPage}>
				<ArrowLeft size={16} color={colors.foreground} />
				<Text>{t("common.back")}</Text>
			</Button>
			<KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
				<View style={styles.contentWrapper}>
					<Text style={styles.title}>{t("onboarding.title")}</Text>
					<Text>
						<Trans
							i18nKey="onboarding.explaination"
							components={{
								strong: (
									<Text
										style={[
											styles.moreInfo,
											{ fontFamily: "Space-Grotesk-Bold" },
										]}
									/>
								),
							}}
						/>
					</Text>
					{!id && (
						<Input
							placeholder={t("onboarding.placeholder")}
							onChangeText={handleUsernameInput}
							onSubmitEditing={handleSearchForPlayer}
							autoCapitalize="none"
							value={steamName}
						/>
					)}
					{id && (
						<Fragment>
							<ChangeName />
							<Text style={{ color: colors.success }}>
								{t("onboarding.found")}
							</Text>
							<Text>
								<Trans
									i18nKey="onboarding.companionReady"
									components={{
										strong: (
											<Text
												style={[
													styles.moreInfo,
													{ fontFamily: "Space-Grotesk-Bold" },
												]}
											/>
										),
									}}
								/>
							</Text>
							<Text>{t("onboarding.changeLater")}</Text>
						</Fragment>
					)}
					<Text>{showNotFoundError ? t("onboarding.notFound") : ""}</Text>
				</View>
			</KeyboardAwareScrollView>
			<StepperPageButton />
			<View style={styles.privacyWrapper}>
				<LockKeyholeIcon size={12} color={colors.grey} />
				<Text style={styles.privacyText}>
					{t("onboarding.settings.privacy")}
				</Text>
			</View>
		</StepperPage>
	);
};
