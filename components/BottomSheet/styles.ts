import { StyleSheet } from "react-native";
import { colors } from "~/theme";

export const styles = StyleSheet.create({
	outerWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
	},
	outerWrapperPanDown: {
		paddingBottom: 16,
	},
	wrapper: {
		padding: 16,
	},
	title: {
		fontSize: 18,
		textAlign: "center",
	},
	close: {
		fontSize: 16,
	},
	background: {
		backgroundColor: colors.grey6,
		opacity: 1,
	},
});
