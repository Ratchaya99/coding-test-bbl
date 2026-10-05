import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProductDetailScreen({ route }: any) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.itemInfo}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.price.toLocaleString()} ฿</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  itemInfo: {
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
});
