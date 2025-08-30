export type Artist = {
  id?: string;              // UUID, optional при създаване
  mb_id: string;            // MusicBrainz ID
  name: string;
  country?: string;
  gender?: string;
  year_formed?: number;
  summary?: string;
  thumbnails?: string[];
  backgrounds?: string[];
  lastUpdated?: Date;       // автоматично попълвано от базата
};