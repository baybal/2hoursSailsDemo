/* global Vue, VueRouter, axios */
Vue.config.ignoredElements = ['user', 'message', 'signup', 'popup', 'login-form', 'user-data'];
var existingUser = {
	template: '<body login><login-form v-show="!success">Email: <input v-model="emailAddress"><br>Password: <input v-model="password"><br><message v-on="message">{{message}}</message><button @click="login()">LOGIN</button></login-form><user-data v-show="success"><span>Email: {{userdata.emailAddress}}</span><span>Name: {{userdata.firstName}} {{userdata.lastName}}</span><span>Phone: {{userdata.phone}}</span></user-data></body>',
	data() {
		return {
			emailAddress: '',
			password: '',
			message: '',
			success: false,
			userdata: {}
		};
	},
	methods: {
		login() {
			axios.post('/login', { emailAddress: this.emailAddress, password: this.password }, { withCredentials: true }).then(res => {
				this.message = res.data;
				this.success = true;
				this.getUserData();
			}, err => {
				this.message = 'Wrong email/password';
			});
		},
		getUserData() {
			axios.get('/test/find?emailAddress=' + this.emailAddress, { withCredentials: true }).then(res => {
				if(res.data[0]) this.userdata = res.data[0];
				if (this.userdata.isAdmin) this.$router.push({ path: '/listUsers' });
			});
		}
	}
};
var debugComponenent = {
	template: '<body listusers><user v-for="user in users" :key="user.id">createdAt: {{user.createdAt}}, updatedAt: {{user.updatedAt}}, id: {{user.id}}, emailAddress: {{user.emailAddress}}, name: {{user.firstName}} {{user.lastName}}, phone: {{user.phone}}, admin: {{user.isAdmin}}, password hash: {{user.password}}</user></body>',
	data() {
		return {
			users: []
		};
	},
	methods: {
		update() {
			axios.get('/test/find').then(res => {
				this.users = res.data;
			});
		}
	},
	created() {
		setInterval(this.update, 3000);
	}
};
var signup = {
	template: '<body signup><signup v-show="!success"><h1>Please sign up for new product notification</h1>Email (required)<br><input v-model="emailAddress"><br>Password (if you want to review your subscription later)<br><input v-model="password"><br>Phone (required)<br><input v-model="phone"><br>First name (required)<br><input v-model="firstName">Last name (required)<br><input v-model="lastName"><br><message v-on="message">{{message}}</message><button @click="signup()">Signup!</button><button @click="$router.push({path: \'/existingUser\'})">Login for existing users</button></signup><popup v-show="success">You are subscribed now!</popup></body>',
	data() {
		return {
			success: false,
			emailAddress: '',
			password: '',
			firstName: '',
			lastName: '',
			phone: '',
			message: ''
		};
	},
	methods: {
		signup() {
			axios.post('/signup', { emailAddress: this.emailAddress, password: this.password, firstName: this.firstName, lastName: this.lastName, phone: this.phone }).then(res => {
				this.success = true;
			}, err => {
				this.message = 'Please fill in required fields';
			});
		}
	}
};
var router = new VueRouter({
	routes: [
		{ path: '/', component: signup },
		{ path: '/existingUser', component: existingUser },
		{ path: '/listUsers', component: debugComponenent }
	]
});
new Vue({
	name: 'Sails api demo',
	router,
	methods: {
		start() {
			this.$mount(document.body);
		}
	},
	created() {
		document.addEventListener('DOMContentLoaded', this.start);
	},
	render(createElement) {
		return createElement('router-view');
	}
});
