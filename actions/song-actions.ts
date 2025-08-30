import axios from "axios";
import { Song } from "@/types/Song";

// const BASE_URL = "http://localhost:1000/songs";
const BASE_URL = process.env.API_GATEWAY_BASE_URL;

export const SongActions = {

    async createSongsFromApi(song: string): Promise<Boolean> {
        const response = await axios.post(`${BASE_URL}/songs/create/${song}`);
        if (response.status == 200 || response.status == 201) return true;
        return false;
    },

    async getRandom50(): Promise<Song[]> {
        const response = await axios.get<Song[]>(`${BASE_URL}/songs/get-random-50-songs`);
        console.log(response.data);
        return response.data;
    },

    async findByTitle(title: string): Promise<Song[]> {
        const response = await axios.get<Song[]>(`${BASE_URL}/songs/findByTitle/${title}`);
        return response.data;
    },
};