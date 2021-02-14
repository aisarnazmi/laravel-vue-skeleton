const state = {
	user: $cookies.get('user')
}

const getters = {
    getUser: state => {
        return state.user;
    }
}

const mutations = {
	setUser(state, payload) {
		let user = {
			id: payload.id,
			name: payload.name,
			email: payload.email,
			role: payload.role
		}
		state.user = user
		$cookies.set('user', JSON.stringify(user))
	},
	removeUser(state) {
		state.user = null
		$cookies.remove('user')
	}
}

const actions = {
}

export default {
	state,
	getters,
	mutations,
	actions
}