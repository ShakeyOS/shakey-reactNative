import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import CarouselItems from '../../components/Carousel';
import IconBtn from '../../components/CustomButton/IconBtn';
import Octicons from 'react-native-vector-icons/Octicons';
import data from '../../constants/data';
import categoriesData from '../../constants/categories';
import colors from '../../constants/colors';
import ServiceCard from '../../components/Cards/ServiceCard';

const width = Dimensions.get('screen').width;

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleSelectItem = value => {
    setSelectedCategory(value);
  };
  const customData = data;

  const filteredData =
    selectedCategory?.trim() == ''
      ? customData
      : customData?.filter(item => item?.category === selectedCategory?.trim());

  return (
    <PageContainer>
      <Text style={styles.hello}>Hello! 👋</Text>
      <View style={styles.header}>
        <PageTitle
          title={'John Smith'}
          subTitle={'Who would you like to hire today?'}
          style={styles.title}
        />
        <IconBtn IconPack={Octicons} iconName={'bell'} unread={true} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{marginVertical: 10}}>
        <PageTitle
          title={"Company's Popular Stacks"}
          style={styles.title}
          textStyle={styles.textStyle}
        />
        <CarouselItems data={customData} />
        <PageTitle
          title={'Categories'}
          style={styles.title}
          textStyle={styles.textStyle}
        />
        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={categoriesData}
          renderItem={({item}) => {
            const isSelected = selectedCategory?.includes(item?.value);
            return (
              <TouchableOpacity
                onPress={() => handleSelectItem(item?.value)}
                style={[
                  styles.categoryContainer,
                  isSelected && {backgroundColor: colors.primary},
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && {color: colors.white},
                  ]}>
                  {item?.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <FlatList
          horizontal
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            const {id, name, details, image, price} = item;

            return (
              <View style={styles.cardWrapper}>
                <ServiceCard
                  key={id}
                  title={name}
                  description={details}
                  startPrice={price}
                  image={image}
                  favoriteItem={{
                    isFavorite: true,
                  }}
                />
              </View>
            );
          }}
        />
      </ScrollView>
    </PageContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    alignItems: 'flex-start',
    marginVertical: 0,
    marginBottom: 0,
  },
  textStyle: {
    fontSize: 18,
    marginVertical: 0,
  },
  cardWrapper: {
    width: width / 1.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainer: {
    backgroundColor: colors.lightGrey,
    height: 'auto',
    width: 150,
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  categoryText: {
    color: colors.textColor,
    textAlign: 'center',
    fontSize: 12,
  },
  hello: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
