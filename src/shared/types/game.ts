export interface Genre {
  id: number;
  name: string;
  slug: string | null;
  url: string | null;
}

export interface Platform {
  id: number;
  name: string;
  abbreviation: string | null;
  alternative_name: string | null;
  slug: string | null;
  url: string | null;
  platform_type: number | null;
}

export interface Game {
  id: number;
  name: string;
  summary: string | null;
  cover_id: number | null;
  cover_image_id: string | null;
  cover_url: string | null;
  created_at: number | null;
  updated_at: number | null;
  genres: Genre[];
  platforms: Platform[];
}
