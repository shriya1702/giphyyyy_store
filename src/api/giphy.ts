import axios from 'axios';

const API_KEY: string = '0iK9QSqAlcQauv9E36mV8H5DCAUA4cU4';
const BASE_URL: string = 'https://api.giphy.com/v1/gifs';

export interface Gif {
    id: string;
    images: {
        original: any;
        fixed_height: {
            url: string;
        };
        fixed_height_still: {
            url: string;
        };
    };
}

export const fetchGifs = async (endpoint: string, query?: string, offset: number = 0, limit: number = 20): Promise<Gif[]> => {
    const url = `${BASE_URL}/${endpoint}`;
    const params = {
        api_key: API_KEY,
        offset,
        limit,
        q: query,
    };
    try {
        const response = await axios.get<{ data: Gif[] }>(url, { params });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        return [];
    }
};
