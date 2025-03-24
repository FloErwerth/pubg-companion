import {Dimensions, StyleSheet} from "react-native";
import {colors, pagePadding} from "~/theme";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    outerWrapper: {
        width: width - pagePadding * 2,
        backgroundColor: colors.background,
        flex: 1
    },
    innerWrapper: {
        backgroundColor: colors.background,
        flex: 1
    }
})