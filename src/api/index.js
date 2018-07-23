import axios from 'axios';

import { apiPrefix } from '../../config/config.json';

export default {
	listUsers() {
		return axios.get(`${apiPrefix}/get_list`);
	},

	addUser(data) {
		return axios.post(`${apiPrefix}/add_user_get`, data);
	},

	listGroups() {
		return axios.get(`${apiPrefix}/get_groups`);
	},
}
