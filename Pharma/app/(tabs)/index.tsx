import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TextInput, View } from 'react-native';
import { _getRandomUser } from '../../services/getRandomUser';
import { _getRandomUserInterface } from '../../interface/getRandomUser-interface';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Text } from '../../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { components, fullView, mb_4, p2 } from '../../components/styles';

export default function EditScreenInfo({ path }: { path: string }) {
  const [userData, setUserData] = useState<_getRandomUserInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState<_getRandomUserInterface[]>([]); // Adiciona estado para os dados filtrados

  const _getMoreRandomUserData = async () => {
    try {
      setRefreshing(true);
      const newData = await _getRandomUser(page + 1);
      setUserData((prevData) => [...prevData, ...newData]);
      setPage(page + 1);
    } finally {
      setRefreshing(false);
    }
  };
  const _moreContect = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      _getMoreRandomUserData().finally(() => {
        setLoadingMore(false);
      });
    }
  };
  const _getRandomUserData = async () => {
    try {
      setRefreshing(true);
      setLoading(true);
      const data = await _getRandomUser(1);
      setUserData(data);
      setFilteredData(data);
      setPage(1);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const _loadingMoreContent = () => {
    return loadingMore ? (
      <View style={components.loadingContainer}>
        <ActivityIndicator animating size="large" color="#98C1D9" />
      </View>
    ) : null;
  };
  const _filterSearch = (text: string) => {
    const filteredData = userData.filter(
      (item) =>
        item.name.first.toLowerCase().includes(text.toLowerCase()) ||
        item.name.last.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredData);
  };
  useEffect(() => {
    _getRandomUserData();
  }, []);
  return (
    <View style={fullView}>
    {loading ? (
      <ActivityIndicator size="large" color="#98C1D9" />
    ) : (
      <View>
        <View style={components.searchContainer}>
          <TextInput
            style={components.search}
            placeholder="Pesquise por nome..."
            onChangeText={_filterSearch}
          />
        </View>
        <FlatList style={[p2, mb_4]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={userData}
          keyExtractor={(item) => item.login.uuid}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name.first} {item.name.last}</Text>
              <Text>{item.email}</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_getRandomUserData}
              colors={['#98C1D9']}
            />
          }
          onEndReached={_moreContect}
          onEndReachedThreshold={0.1}
          ListFooterComponent={_loadingMoreContent}
        />
      </View>

    )}
  </View>
  );
}


