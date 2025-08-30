import axios from "axios";

export const YoutubeTokenActions = {

    async saveAccessToken(code: string): Promise<boolean> {
        try {
            const response = await axios.post(
                `http://localhost:8080/songs/save-access-token?code=${encodeURIComponent(code)}`
            );

            if (response.status === 200 || response.status === 202) {
                return true;
            } else {
                return false;
            }

        } catch (err) {
            console.error("Backend error:", err);
            return false;
        };
    }
};
