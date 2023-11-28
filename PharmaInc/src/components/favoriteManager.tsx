// favoriteManager.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _getRandomUserInterface } from '../interface/getRandomUser-interface';

class FavoriteManager {
  private favorites: _getRandomUserInterface[] = [];

  constructor() {
    this.loadFavorites();
  }

  private async loadFavorites() {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorites');
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  }

  private async saveFavorites() {
    try {
      await AsyncStorage.setItem('@favorites', JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  }

  getFavorites() {
    return this.favorites;
  }

  isFavorite(user: _getRandomUserInterface) {
    return this.favorites.some((fav) => fav.login.uuid === user.login.uuid);
  }

  addFavorite(user: _getRandomUserInterface) {
    this.favorites.push(user);
    this.saveFavorites();
  }

  removeFavorite(user: _getRandomUserInterface) {
    this.favorites = this.favorites.filter((fav) => fav.login.uuid !== user.login.uuid);
    this.saveFavorites();
  }
}

const favoriteManager = new FavoriteManager();
export default favoriteManager;
