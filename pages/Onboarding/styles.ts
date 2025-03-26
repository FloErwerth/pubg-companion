import { StyleSheet } from "react-native";
import { colors } from "~/theme";

export const styles = StyleSheet.create({
	image: {
		width: "100%",
		borderRadius: 16,
		height: 180,
	},
	backButton: {
		gap: 8,
		paddingLeft: 0,
	},
	nextPageButton: {
		justifyContent: "center",
	},
	nextPageButtonText: {
		fontSize: 16,
	},
	scrollView: {
		flexGrow: 1,
	},
	contentWrapper: {
		marginTop: 8,
		gap: 16,
		paddingBottom: 32,
		flex: 1,
	},
	subWrapper: { gap: 8 },
	title: { fontSize: 22, fontFamily: "Space-Grotesk-Bold" },
	subtitle: { fontSize: 18, fontFamily: "Space-Grotesk-Bold" },
	moreInfo: { fontSize: 16 },
	privacyWrapper: {
		flexDirection: "row",
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
		marginTop: 8,
		width: "75%",
	},
	gameModeWrapper: {
		alignItems: "flex-end",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	privacyText: {
		paddingRight: 8,
		color: colors.grey,
		fontSize: 10,
	},
});
