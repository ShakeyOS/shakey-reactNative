import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import PageTitle from "../PageTitle";
import { Logo } from "../../constants/imageConfig";
import colors from "../../constants/colors";

const Header = ({ title, slug, style, darkLogo, size = 50 }) => {
  return (
    <View style={[styles.container, style]}>
      <PageTitle
        title={title || "ShakeyOS"}
        subTitle={slug}
        style={styles.title}
        textColor={darkLogo ? colors.white : colors.textColor}
      />
      <TouchableOpacity
        style={[styles.wrapper, style, { height: size + 10, width: size + 10 }]}
      >
        <Image
          source={Logo}
          style={{
            height: size,
            width: size,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    alignItems: "flex-start",
    marginVertical: 0,
    textTransform: "capitalize",
    width: "80%",
    marginBottom: 0,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
