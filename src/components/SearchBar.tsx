import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import debounce from 'lodash/debounce';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const debouncedOnSearch = useCallback(debounce(onSearch, 500), [onSearch]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={query}
                onChangeText={(text) => {
                    setQuery(text);
                    debouncedOnSearch(text);
                }}
                placeholder="Search GIFs"
                placeholderTextColor={'black'}
                clearButtonMode="while-editing"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        color:'black'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color:'black'
    },
});

export default SearchBar;
