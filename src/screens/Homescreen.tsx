// src/screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet, Switch, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { fetchGifs, Gif } from '../api/giphy';
import GifItem from '../components/GifItem';
import SearchBar from '../components/SearchBar';

const HomeScreen: React.FC = () => {
    const { isDark, toggleTheme } = useTheme();
    const [gifs, setGifs] = React.useState<Gif[]>([]);
    const [query, setQuery] = React.useState('');
    const [offset, setOffset] = React.useState(0);

    React.useEffect(() => {
        loadGifs();
    }, [query]);

    const loadGifs = async () => {
        const newGifs = await fetchGifs(query ? 'search' : 'trending', query, offset);
        setGifs(query ? newGifs : [...gifs, ...newGifs]); //  infinite scroll
        setOffset(offset + 20);
    };

    return (
        <View style={isDark ? styles.darkContainer : styles.lightContainer}>
            <SearchBar onSearch={(text) => {
                setQuery(text);
                setOffset(0); 
            }} />
            <Switch 
            trackColor={{ false: "#767577", true: "#81b0ff" }} 
            value={isDark} onValueChange={toggleTheme} />
            <FlatList
                data={gifs}
                renderItem={({ item }) => <GifItem gif={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
                onEndReached={loadGifs}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    lightContainer: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: 'white',
    },
    darkContainer: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: 'black',
        color:'white'
    },
});

export default HomeScreen;
