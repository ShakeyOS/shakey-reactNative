import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const PageTitle = ({ title, subTitle, style, textColor, textStyle }) => {
  return (
    <View style={[styles.container, style]}>
      <Text
        style={[styles.title, textStyle, textColor && { color: textColor }]}
      >
        {title}
      </Text>
      {subTitle && (
        <Text style={[styles.subTitle, textColor && { color: textColor }]}>
          {subTitle}
        </Text>
      )}
    </View>
  );
};

export default PageTitle;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textColor,
    marginVertical: 5,
  },
  subTitle: {
    color: colors.textColor,
  },
});
