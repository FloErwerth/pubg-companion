import {
	BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Fragment, useCallback } from "react";
import { View } from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";
import { styles } from "~/components/BottomSheet/styles";
import { SecondaryButton } from "~/components/Button";
import { Text } from "~/components/Text";
import { colors } from "~/theme";
import { Separator } from "../Separator";
import { BottomSheetProps } from "./types";

const Backdrop = ({ animatedIndex }: BottomSheetBackdropProps) => {
	const animatedStyle = useAnimatedStyle(() => ({
		backgroundColor: colors.grey6,
		position: "absolute",
		width: "100%",
		height: "100%",
		opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.5]),
	}));

	return <Animated.View style={animatedStyle} />;
};

export const BottomSheet = ({
	children,
	snapPoints = ["100%"],
	title,
	enablePanDownToClose = false,
	...props
}: BottomSheetProps) => {
	const handleClose = useCallback(() => {
		props.reference?.current?.close();
	}, [props.reference?.current?.close]);

	const panDownToClose = !enablePanDownToClose ? { handleComponent: null } : {};

	const Header = () => {
		if (enablePanDownToClose) {
			return (
				<View style={styles.outerWrapperPanDown}>
					<Text style={styles.title}>{title}</Text>
				</View>
			);
		}
		return (
			<Fragment>
				<View style={styles.outerWrapper}>
					<Text style={styles.title}>{title}</Text>
					{!enablePanDownToClose && (
						<SecondaryButton size="m" onPress={handleClose}>
							<Text style={styles.close}>Schließen</Text>
						</SecondaryButton>
					)}
				</View>
			</Fragment>
		);
	};

	return (
		<BottomSheetModal
			backgroundStyle={styles.background}
			ref={props.reference}
			snapPoints={snapPoints}
			{...props}
			{...panDownToClose}
			backdropComponent={Backdrop}
		>
			<BottomSheetView>
				<Header />
				<Separator />
				<View style={styles.wrapper}>{children}</View>
			</BottomSheetView>
		</BottomSheetModal>
	);
};
