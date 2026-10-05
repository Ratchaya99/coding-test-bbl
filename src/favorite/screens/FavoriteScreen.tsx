import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFavorites } from '../../shared/provider/FavoriteContext';

export default function FavoriteScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>

      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No favorites yet</Text>
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.price}>{item.price.toLocaleString()} ฿</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  list: {
    gap: 10,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  itemInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 15,
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#666',
  },
});
