import {StyleSheet, View, Dimensions, FlatList} from 'react-native';
import {useRef, useState} from 'react';
import ServiceCard from '../Cards/ServiceCard';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import colors from '../../constants/colors';
import IconBtn from '../CustomButton/IconBtn';
import Entypo from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('screen').width;

const CarouselItems = ({data, onToggleFavorite, isLoading}) => {
  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const animatedDotStyle = index =>
    useAnimatedStyle(() => {
      const isActive = currentIndex === index;
      return {
        backgroundColor: isActive ? colors.primary : colors.primaryLight,
        width: isActive ? 12 : 8,
        height: isActive ? 12 : 8,
        borderRadius: 6,
      };
    });

  const onScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };
  const scrollToIndex = index => {
    carouselRef?.current?.scrollToIndex({index});
  };

  // Calculate the indices of the dots to show
  const dotIndicates = [];
  const totalDots = Math.min(5, data?.length); // Show a maximum of 5 dots
  const middleDot = Math.floor(totalDots / 2);

  for (let i = 0; i < totalDots; i++) {
    let dotIndex = currentIndex + i - middleDot;

    if (dotIndex < 0) {
      dotIndex += data.length;
    } else if (dotIndex >= data.length) {
      dotIndex -= data.length;
    }
    dotIndicates.push(dotIndex);
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        ref={carouselRef}
        pagingEnabled
        onScroll={onScroll}
        keyExtractor={(_, index) => index.toString()}
        data={data}
        renderItem={({item}) => {
          const {id, name, details, category, image, adminID} = item;

          const startPrice = item?.SubServices?.items?.reduce((min, item) => {
            const price = Number(item.price);
            if (isNaN(price)) return min;
            return min === undefined ? price : Math.min(min, price);
          }, undefined);

          return (
            <View
              style={{
                width: width - 20,
                paddingRight: 10,
              }}>
              <ServiceCard
                title={name}
                description={details}
                startPrice={startPrice}
                image={image}
                favoriteItem={{
                  isFavorite: true,
                  isLoading,
                }}
              />
            </View>
          );
        }}
      />
      <View style={styles.buttonsContainer}>
        <IconBtn
          IconPack={Entypo}
          iconName={'chevron-left'}
          onPress={() => scrollToIndex(currentIndex > 0 ? currentIndex - 1 : 0)}
          style={styles.icon}
        />
        <View style={styles.dotsContainer}>
          {dotIndicates?.map((dotIndex, index) => (
            <Animated.View
              key={index}
              style={[styles.dot, animatedDotStyle(index)]}
            />
          ))}
        </View>
        <IconBtn
          IconPack={Entypo}
          iconName={'chevron-right'}
          onPress={() =>
            scrollToIndex(
              currentIndex < data.length - 1
                ? currentIndex + 1
                : data.length - 1,
            )
          }
          style={styles.icon}
        />
      </View>
    </View>
  );
};

export default CarouselItems;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryLight,
    marginHorizontal: 4,
  },
});
