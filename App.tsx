import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

interface Product {
  id: number;
  image: string;
  title: string;
  price: string;
}

const MOCK_DATA: Product[] = [
  { id: 1, image: '', title: 'iPhone 15', price: '30000' },
  { id: 2, image: '', title: 'iPhone 16', price: '40000' },
  { id: 3, image: '', title: 'iPhone 17', price: '50000' },
  { id: 4, image: '', title: 'iPhone 18', price: '60000' },
];

const URL = 'https://fakestoreapi.com/products';

function App() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={product}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemInfo}>
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
            </View>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
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
});

export default App;
