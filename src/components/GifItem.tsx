// src/components/GifItem.tsx
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Alert, PermissionsAndroid } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { useTheme } from '../context/ThemeContext';
import { Gif } from '../api/giphy';

interface GifItemProps {
    gif: Gif;
}

const GifItem: React.FC<GifItemProps> = ({ gif }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        requestStoragePermission();
    }, []);

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission",
                    message: "This app needs access to your storage to download GIFs.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const downloadGif = async () => {
        try {
            const path = `${RNFS.DocumentDirectoryPath}/${gif.id}.gif`;
            const response = await RNFS.downloadFile({
                fromUrl: gif.images.original.url,
                toFile: path,
                background: true,
                discretionary: true,
                cacheable: false,
            }).promise;

            if (response.statusCode === 200) {
                Alert.alert('Download Success', `GIF downloaded successfully to: ${path}`);
            } else {
                throw new Error('Failed to download GIF');
            }
        } catch (error) {
            console.error('Error downloading GIF:', error);
            Alert.alert('Download Error', `Error downloading GIF: ${error.message}`);
        }
    };

    const shareGif = async () => {
        try {
            await Share.open({
                url: gif.images.original.url,
                title: 'Share GIF',
                message: 'Check out this cool GIF!',
            });
        } catch (error) {
            if (error.message !== 'User did not share') {
                console.error('Error sharing GIF:', error);
                Alert.alert('Share Error', `Error sharing GIF: ${error.message}`);
            }
        }
    };

    const iconColor = isDark ? 'white' : 'black'; 
    const textColor = isDark ? 'white' : 'black'; 

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#333' : '#fff' }]}>
            <TouchableOpacity style={styles.imageContainer} onPress={() => setIsPlaying(!isPlaying)}>
                <FastImage
                    source={{
                        uri: isPlaying ? gif.images.fixed_height.url : gif.images.fixed_height_still.url,
                        priority: FastImage.priority.high,
                    }}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.cover}
                />
                {!isPlaying && (
                    <View style={styles.overlay}>
                        <Icon name="play-circle-filled" size={50} color="white" />
                    </View>
                )}
            </TouchableOpacity>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={downloadGif} style={styles.actionButton}>
                    <Icon name="file-download" size={24} color={iconColor} />
                    <Text style={[styles.actionText, { color: textColor }]}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={shareGif} style={styles.actionButton}>
                    <Icon name="share" size={24} color={iconColor} />
                    <Text style={[styles.actionText, { color: textColor }]}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 1,
    },
    imageContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 5,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        marginLeft: 5,
        fontSize: 14,
    },
});

export default GifItem;
