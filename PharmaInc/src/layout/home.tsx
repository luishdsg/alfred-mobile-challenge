import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, TextInput } from 'react-native';
import { _getRandomUser } from '../services/getRandomUser';
import { _getRandomUserInterface } from '../interface/getRandomUser-interface';
import { components, fullView } from '../styles';
import UserListItem from '../components/listUsers';
import favoriteManager from '../components/favoriteManager';
import { Text } from 'react-native-ui-lib';
import { Snackbar } from 'react-native-paper';
import ModalDetail from '../components/modal';


const Home: React.FC = () => {
  const [userData, setUserData] = useState<_getRandomUserInterface[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<_getRandomUserInterface[]>([]);
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<_getRandomUserInterface | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [alphabet, setAlphabet] = useState(true);

  const _getRandomUserData = async () => {
    try {
      if (refreshing) {
        setPage(1);
      }
      const newData = await _getRandomUser(page + 1);
      setUserData(refreshing ? newData : [...userData, ...newData]);
      setPage(page + 1);
      setTimeout(() => {
        setUserData(newData);
      }, 1000);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };


  const _filterSearch = (text: string, data: _getRandomUserInterface[]) => {
    setSearchTerm(text);
    if (text.length === 0) {
      setFilteredData([]);
    } else {
      const filteredData = data.filter(
        (item) =>
          item.name.first.toLowerCase().includes(text.toLowerCase()) ||
          item.name.last.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  };


  const handleFavoritePress = (user: _getRandomUserInterface) => {
    const isDuplicate = favoriteManager.getFavorites().some((fav) => fav.login.uuid === user.login.uuid);
    if (!isDuplicate) {
      favoriteManager.addFavorite(user);
      setFavoriteMessage(`${user.name.first} ${user.name.last} foi favoritado!`);
      setTimeout(() => {
        setFavoriteMessage('');
      }, 1500);
    } else {
      setSnackbarVisible(true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    _getRandomUserData();
  };

  const onEndReached = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      _getRandomUserData();
    }
  };


  useEffect(() => {
    if (searchTerm.length > 0) {
      return;
    }
    _getRandomUserData();
  }, [searchTerm]);


  const renderUsers = ({ item }: { item: _getRandomUserInterface }) => {
    return (
      <UserListItem
        user={item}
        swipeoutBtns={[
          {
            text: 'Favoritar',
            onPress: () => handleFavoritePress(item),
            backgroundColor: '#3D5A80',
            color: '#E0FBFC',
          }]}
        onPress={() => {
          setSelectedUser(item);
          setShowModal(true);
        }}
      />
    );
  };


  const _loadingMoreContent = () => {
    return loadingMore ? (
      <View style={components.loadingContainer}>
        <ActivityIndicator animating size="large" color="#98C1D9" />
      </View>
    ) : null;
  };

  
  return (
    <View style={fullView}>
      <View style={components.searchContainer}>
        <TextInput
          style={components.search}
          placeholder="Pesquise por nome..."
          value={searchTerm}
          onChangeText={(text) => {
            _filterSearch(text, userData);
            setLoadingMore(text === '' ? true : false);
          }}
        />
      </View>
      {(filteredData.length === 0 && searchTerm !== '') ? (
        <View style={components.noResults}>
          <Text style={{ color: '#E0FBFC' }} text40L>¯\_(ツ)_/¯  {"\n"}Nenhum usuário com esse nome</Text>
        </View>
      ) : (
        <FlatList style={[components.bgDarkBlue]}
          extraData={filteredData.length > 0 ? filteredData : null}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={filteredData.length > 0 ? filteredData : userData}
          keyExtractor={(item) => item.login.uuid}
          renderItem={renderUsers}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#98C1D9']} />
          }
          ListFooterComponent={_loadingMoreContent}
        />
      )}
      {favoriteMessage !== '' && (
        <View style={components.msgFavorited}>
          <Text style={{ color: 'white' }}>{favoriteMessage}</Text>
        </View>
      )}
      <Snackbar
        style={components.snackbar}
        visible={isSnackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        Este usuário já está nos favoritos
      </Snackbar>
      <ModalDetail
        user={selectedUser}
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

export default Home;
