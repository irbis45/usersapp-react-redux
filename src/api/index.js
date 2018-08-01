import axios from 'axios';

import { apiPrefix } from '../../config/config.json';

export default {
	getUsers() {
		return axios.get(`${apiPrefix}/get_users`);
	},

	addUser(data) {
		return axios.post(`${apiPrefix}/add_user`, data);
	},

	getGroups() {
		return axios.get(`${apiPrefix}/get_groups`);
	},
}
