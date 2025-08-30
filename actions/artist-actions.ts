import axios from "axios";
import { Artist } from "@/types/Artist";

let BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL;

export async function fetchArtistsFromApi(title: string) {
    await axios.post(`${BASE_URL}/artist/api/find-all`, { title });
};

export async function getArtists(): Promise<Artist[]> {
    const response = await axios.get(`${BASE_URL}/artist/get-all`);
    return response.data;
};

export async function getById(id: string): Promise<Artist | null> {
    try {
        const response = await axios.get(`${BASE_URL}/artist/` + id);
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    };
};

export async function findByTitle(title: string): Promise<Artist[] | []> {
    try {
        const response = await axios.get(`${BASE_URL}/artist/findByTitle/` + title);
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    };
};