import axios from 'axios';
import {base64} from './common';
import {baseUrl, client, secret} from './account';

export type Token = {
  access_token: string,
  token_type: string, //'bearer',
  expires_in: number,
  scope: string, // 'read write'
}

export async function requestToken() {
  const response = await axios.post(`${baseUrl}/api/v1/account/token`, {}, {
    headers: {
      Authorization: `Basic ${base64(client + ':' + secret)}`,
    },
  });
  const token: Token = response.data;
  return token;
}
