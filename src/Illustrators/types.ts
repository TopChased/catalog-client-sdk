// ============ ILLUSTRATOR TYPES ============
export interface Illustrator {
  _id: string;
  name: string;
  normalizedName: string;
  cardCount: number;
  createdAt: string;
  updatedAt: string;
  cardIds: string[];
}

export interface IllustratorsResponse {
  items: Illustrator[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}