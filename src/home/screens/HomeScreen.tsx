import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}

const MOCK_DATA: Product[] = [
  { id: 1, image: '', title: 'iPhone 15', price: 30000 },
  { id: 2, image: '', title: 'iPhone 16', price: 40000 },
  { id: 3, image: '', title: 'iPhone 17', price: 50000 },
  { id: 4, image: '', title: 'iPhone 18', price: 60000 },
];

const URL = 'https://fakestoreapi.com/products';

export default function HomeScreen({ navigation }: any) {
  const [product, setProduct] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Failed to loaded API');
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.log('something went wrong');
      //Mock data fallback because API request fails
      setProduct(MOCK_DATA);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleToProductDetail = (item: Product) => {
    navigation.navigate('ProductDetail', {
      product: item,
    });
  };
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      <View style={styles.container}>
        <Text style={styles.title}>Products</Text>
        <FlatList
          data={product}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={styles.itemCard}
              onPress={() => handleToProductDetail(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.itemInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.price}>
                  {item.price.toLocaleString()} ฿
                </Text>
              </View>
            </Pressable>
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10,
  },
  contentContainerStyle: {
    gap: 10,
  },
  itemCard: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  itemInfo: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
});
