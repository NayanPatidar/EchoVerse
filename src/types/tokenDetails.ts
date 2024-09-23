export interface TokenDetails {
  name: string;
  email: string;
}

export interface DecodedTokenDetails {
  name: string;
  email: string;
  exp: number;
  iat: number
}
