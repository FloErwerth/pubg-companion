import {
    runOnJS,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import {colors, pagePadding} from "~/theme";
import {Dimensions, View} from "react-native";
import {useEffect} from "react";

type ProgressProps = {
    percent: number;
}

const width = Dimensions.get("window").width;
const availableWidth = width - pagePadding * 2;

export const Progress = ({ percent }: ProgressProps) => {
    const percentVal = useSharedValue(percent);

    useEffect(() => {
        percentVal.value = withTiming(availableWidth * percent);
    }, [percent]);

    const animationStyle = useAnimatedStyle(() => ({
        width: percentVal.value,
        backgroundColor: colors.foreground,
        height: 8,
    }));

    return <View style={{
        height: 8,
        overflow: "hidden",
        borderRadius: 1000,
        borderWidth: 1,
        marginBottom: 8,
        borderColor: colors.grey}}>
        <Animated.View style={animationStyle}></Animated.View>
    </View>
}