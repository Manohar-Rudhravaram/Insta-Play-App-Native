/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import Styles from '../styles/HomeStyles';
import Skeleton from '../components/Skeleton';
import { themeContext } from '../context/ThemeContext';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const lists = search ? list : movies;
  const debounceDelay = 500;
  const { theme, toggleHandler } = useContext(themeContext);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    try {
      setLoadingMore(true);
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&page=${page}`);
      const data = await response.json();
      setMovies([...movies, ...data.results]);
      setLoadingMore(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function refreshHandler() {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }

  const loadMoreData = () => {
    if (!loadingMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = useCallback((text) => {
    setSearch(text);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        async function getSearchData() {
          setLoading(true);
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US&query=${search}&page=1&include_adult=false`);
          const data = await response.json();
          setList(data.results);
          setLoading(false);
        }
        getSearchData();
      }
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  function footerComponent() {
    return (
      <View>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <>
      <View style={Styles.header}>
        <TextInput
          style={Styles.searchInput}
          placeholder="search..."
          placeholderTextColor="white"
          value={search}
          onChangeText={handleSearch}
        />
        <Image source={require('../assets/search.png')} style={Styles.searchBtn} />
      </View>
      <Image source={require('../assets/Banner.png')} resizeMode="cover" style={Styles.banner} />
      <Text style={[Styles.text, { backgroundColor: theme === 'dark' ? '#0c111b' : 'white', color: theme === 'dark' ? 'white' : 'black' }]}>{!search ? 'Trending' : `Search results for ${search}`}</Text>
      <View style={[Styles.renderContainer, { backgroundColor: !theme === 'dark' ? 'white' : '#0c111b' }]}>
        <FlatList
          data={lists}
          style={[Styles.list, { backgroundColor: theme === 'dark' ? '#0c111b' : 'white' }]}
          keyExtractor={(item) => item.id * Math.random()}
          renderItem={({ item }) => (
            <Card item={item} key={item.id} />
          )}
          ListEmptyComponent={loading ? <Skeleton /> : (!loading && lists.length === 0 && <Text style={Styles.text}>No Data Found</Text>)}
          refreshing={refreshing}
          onRefresh={refreshHandler}
          onEndReached={!search && loadMoreData}
          onEndReachedThreshold={1}
          ListFooterComponent={!search && footerComponent}
        />
      </View>
    </>
  );
}
