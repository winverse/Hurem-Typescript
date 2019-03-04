import axios from 'axios';

export const write = (content: string): Promise<any> => {
	return axios.post('/api/posts', { content });
};

export const list = (): Promise<any> => {
	return axios.get('/api/posts');
};

export const listOfUser = (displayname: string): Promise<any> => {
	return axios.get(`/api/posts?displayname=${displayname}`);
};

export const next = (url: string): Promise<any> => {
	return axios.get(url);
};