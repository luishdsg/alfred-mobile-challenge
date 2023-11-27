import React from 'react';
import { FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { _getRandomUserInterface } from '../interface/getRandomUser-interface';
import favoriteManager from '../components/favoriteManager';
import { components, fullView } from '../styles';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



const Favorites: React.FC = () => {

  const [favorites, setFavorites] = useState<_getRandomUserInterface[]>([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(async () => {
      const refreshedFavorites = favoriteManager.getFavorites();
      setFavorites(refreshedFavorites);
      setRefreshing(false);
    }, 1000);
  }, []);


  const handleRemoveFavorite = (user: _getRandomUserInterface) => {
    favoriteManager.removeFavorite(user);
    const updatedFavorites = favoriteManager.getFavorites();
    setFavorites(updatedFavorites);
    setSnackbarVisible(true);
  };


  const renderFavoriteItem = ({ item }: { item: _getRandomUserInterface }) => {
    const renderRightActions = (progress: any, dragX: any) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      return (
        <TouchableOpacity onPress={() => handleRemoveFavorite(item)} style={components.deleteButton}>
          <Text><Feather name="trash-2" size={34} color="#293241" /></Text>
        </TouchableOpacity>
      );
    };
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);
      return `${addLeadingZero(day)}/${addLeadingZero(month)}/${year}`;
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity style={components.TouchableOpacity}>
          <Image source={{ uri: item.picture.thumbnail }} style={{ width: 50, height: 50, borderRadius: 25 }} />
          <View style={{ marginLeft: 10 }}>
            <Text style={components.centralText}><Ionicons name="person-outline" size={14} color="#293241" />{`${item.name.first} ${item.name.last}`}</Text>
            <Text style={components.centralText}><MaterialIcons name="alternate-email" size={14} color="#293241" />{item.email}</Text>
            <Text style={components.centralText}><MaterialCommunityIcons name="cake-variant-outline" size={14} color="#293241" />{formatDate(item.registered.date)}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      const refreshedFavorites = favoriteManager.getFavorites();
      setFavorites(refreshedFavorites);
    }, [])
  );
  return (
    <View style={[fullView, components.bgDarkBlue]}>
      {favorites.length === 0 ? (
        <View style={[fullView, components.bgDarkBlue]}>
          <Text text40L style={components.notFavorite}> (▀̿Ĺ̯▀̿ ̿) {'\n'} Nenhum item favoritado ainda.</Text>
          <Text text90L style={components.notFavorite}>(recarregue a página se necessário)</Text>
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.login.uuid}
            renderItem={renderFavoriteItem}
            refreshControl={
              <RefreshControl
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                tintColor="#98C1D9"
                colors={["#98C1D9"]}
                progressBackgroundColor="#ffffff"
                title="Favoritos..."
                titleColor="#98C1D9"
              />
            }
          />
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.login.uuid}
          renderItem={renderFavoriteItem}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              tintColor="#98C1D9"
              colors={["#98C1D9"]}
              progressBackgroundColor="#ffffff"
              title="Favoritos..."
              titleColor="#98C1D9"
            />
          }
        />
      )}
      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
        style={components.snackbar}
      >
        Item removido dos favoritos
      </Snackbar>
    </View>
  );
}

export default Favorites;