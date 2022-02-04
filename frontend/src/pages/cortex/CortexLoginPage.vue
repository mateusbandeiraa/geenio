<template>
	<h1>Bem-vindo ao córtex</h1>
	<form class="login-form" @submit.prevent="onSubmitLogin">
		<input type="text" placeholder="id" name="id" v-model="loginId" />
		<input
			type="password"
			placeholder="senha"
			name="passsword"
			v-model="loginPassword"
		/>
		<my-button>Login</my-button>
	</form>
</template>

<script>
import MyButton from "../../components/MyButton.vue";
export default {
	components: { MyButton },
	data: function () {
		return {
			loginId: '',
			loginPassword: '',
		};
	},
	methods: {
		onSubmitLogin() {
			this.$http.get("/cortex/login", {
				auth: {
					username: this.loginId,
					password: this.loginPassword,
				},
			}).then(() => {
                console.log("Authorized.");
            }).catch(error => {
                if(error.response.status === 401){
                    console.error("Unauthorized.");
                }
            });
		},
	},
};
</script>

<style scoped>
h1 {
	text-align: center;
}
.login-form > input {
	display: block;
}

.login-form {
	display: grid;
	row-gap: 16px;

	max-width: 260px;

	margin-left: auto;
	margin-right: auto;
}
</style>