import axios from "axios";
import { Song } from "@/types/Song";

// const BASE_URL = "http://localhost:1000/songs";
const BASE_URL = "https://midal-api-gateway.onrender.com/songs";

export const SongActions = {

    async getRandom50(): Promise<Song[]> {
        const response = await axios.get<Song[]>(`${BASE_URL}/get-random-50-songs`);
        console.log(response.data);
        return response.data;
    },

    async findByTitle(title: string): Promise<Song[]> {
        const response = await axios.get<Song[]>(`${BASE_URL}/findByTitle/${title}`);
        return response.data;
    },

    async getById(id: string): Promise<Song> {
        const response = await axios.get<Song>(`${BASE_URL}/${id}`);
        return response.data;
    },

    async create(song: Omit<Song, "id" | "version">): Promise<Song> {
        const response = await axios.post<Song>(`${BASE_URL}`, song);
        return response.data;
    },

    async update(id: string, song: Partial<Song>): Promise<Song> {
        const response = await axios.put<Song>(`${BASE_URL}/${id}`, song);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await axios.delete(`${BASE_URL}/${id}`);
    },
};