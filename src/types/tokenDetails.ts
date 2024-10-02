export interface TokenDetails {
  name: string;
  email: string;
  userId: string;
}

export interface DecodedTokenDetails {
  name: string;
  email: string;
  exp: number;
  iat: number;
  userId: string;
}
