

let accessToken: string | null = null;
let refreshToken: string | null = null; 


export const tokenStorage = {
  setTokens: (access: string, refresh?: string) => {
    accessToken = access;
    refreshToken = refresh ?? null;
  },
  getAccessToken: (): string | null => {
    return accessToken;
  },
  getRefreshToken: (): string | null => {
    return refreshToken;
  },
  clearTokens: () => {
    accessToken = null;
    refreshToken = null;
  },
};