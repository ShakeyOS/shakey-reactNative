import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppDev} from '../../constants/imageConfig';
import colors from '../../constants/colors';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconBtn from '../CustomButton/IconBtn';

const width = Dimensions.get('screen').width;

const ServiceCard = ({
  title,
  description,
  startPrice,
  image,
  onPress,
  renderRightActions,
  isAdmin,
  purchaseCard,
  adminPurchaseDetail,
  favoriteItem,
  onFavouritePress,
}) => {
  const Container = isAdmin ? Swipeable : View;
  const status = purchaseCard?.status;

  return (
    <GestureHandlerRootView>
      <Container renderRightActions={renderRightActions}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.container, purchaseCard && {paddingBottom: 0}]}>
          {image ? (
            <Image resizeMode="cover" source={image} style={styles.image} />
          ) : (
            <Image resizeMode="cover" source={AppDev} style={styles.image} />
          )}
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {title || `Develop a cross platform app using react native`}
              </Text>

              {!adminPurchaseDetail && !purchaseCard && (
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={20} color={colors.primary} />
                  <View>
                    <Text style={styles.ratingText}>
                      4.9
                      <Text style={styles.ratingCount}>(20)</Text>
                    </Text>
                  </View>
                </View>
              )}
              {status && (
                <View
                  style={[
                    styles.statusContainer,
                    styles[`container_${status}`],
                  ]}>
                  <Text style={styles.statusText}>
                    {status == 'INPROCESS' ? 'In Process' : status}
                  </Text>
                </View>
              )}
              {adminPurchaseDetail && (
                <View style={styles.packageContainer}>
                  <Text style={styles.packageText}>
                    {adminPurchaseDetail?.packageName}
                  </Text>
                </View>
              )}
            </View>
            {description && (
              <Text style={styles.description} numberOfLines={2}>
                {description ||
                  `Develop a cross platform app using react native`}
              </Text>
            )}
            {startPrice && (
              <>
                <Text style={{color: colors.grey}}>Starting at</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>$ {startPrice || 250}</Text>

                  {favoriteItem ? (
                    favoriteItem?.isLoading ? (
                      <ActivityIndicator
                        color={colors.primary}
                        size={'small'}
                      />
                    ) : (
                      <IconBtn
                        IconPack={FontAwesome}
                        iconName={'heart'}
                        iconProps={{
                          color: favoriteItem?.isFavorite
                            ? colors.red
                            : colors.grey,
                          size: 20,
                        }}
                        style={styles.heartIcon}
                        onPress={onFavouritePress}
                      />
                    )
                  ) : null}
                </View>
              </>
            )}
            {adminPurchaseDetail && (
              <View>
                <Text style={styles.contactDetailsText}>
                  Customer Contact Details:
                </Text>
                <View style={styles.contactContainer}>
                  <Text style={styles.contactName}>
                    {adminPurchaseDetail?.name}
                  </Text>
                  <Text selectable style={styles.contactPhone}>
                    {adminPurchaseDetail?.phone}
                  </Text>
                </View>
                <Text selectable style={styles.contactEmail}>
                  {adminPurchaseDetail?.email}
                </Text>
              </View>
            )}
          </View>
          {!adminPurchaseDetail && purchaseCard && (
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                {purchaseCard.packageName} Plan Bought
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Container>
    </GestureHandlerRootView>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 12,
    margin: 5,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 7,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  contentContainer: {
    paddingHorizontal: 10,
    marginRight: 5,
    paddingTop: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: colors.textColor,
    fontSize: 16,
    paddingRight: 8,
    fontWeight: '600',
    textTransform: 'capitalize',
    width: '80%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  ratingText: {
    color: colors.primary,
    fontWeight: '600',
  },
  ratingCount: {
    color: colors.grey,
    fontWeight: '400',
  },
  packageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  packageText: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: colors.primary,
    textTransform: 'capitalize',
  },
  description: {
    color: colors.textColor,
    marginVertical: 5,
    textTransform: 'capitalize',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: colors.textColor,
    fontSize: 18,
    fontWeight: '600',
  },
  heartIcon: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    marginVertical: 0,
    marginBottom: 0,
    shadowColor: 'transparent',
  },
  contactDetailsText: {
    color: colors.textColor,
    fontSize: 16,
    fontWeight: '600',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  contactName: {
    color: colors.textColor,
    textTransform: 'capitalize',
    width: '50%',
  },
  contactPhone: {
    color: colors.textColor,
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  contactEmail: {
    color: colors.textColor,
  },
  footerContainer: {
    backgroundColor: colors.primary,
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: colors.white,
    textTransform: 'capitalize',
  },
  statusContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: colors.primaryLight,
    padding: 5,
    borderRadius: 8,
  },
  statusText: {
    color: colors.primary,
    textTransform: 'capitalize',
  },
});
