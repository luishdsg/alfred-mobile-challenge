import { _getRandomUserInterface } from "../interface/getRandomUser-interface";


class FavoriteManager {
  private favorites: _getRandomUserInterface[] = [];

  addFavorite(user: _getRandomUserInterface) {
    this.favorites.push(user);
    console.log('Favoritado:');
  }

  removeFavorite(user: _getRandomUserInterface) {
    this.favorites = this.favorites.filter((fav) => fav.login.uuid !== user.login.uuid);
  }

  getFavorites() {
    return this.favorites;
  }

  isDuplicate(user: _getRandomUserInterface) {
    return this.favorites.some((fav) => fav.login.uuid === user.login.uuid);
  }
}

const favoriteManager = new FavoriteManager();

export default favoriteManager;
