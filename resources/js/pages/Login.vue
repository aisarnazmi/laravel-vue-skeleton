<template>
<div>
    <div class="flex h-screen justify-center items-center" v-if="!$auth.check()">
        <div class="bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
                </h2>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6" @submit.prevent="login">
                        <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div class="mt-1">
                            <input v-model="user.email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                        </div>

                        <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div class="mt-1">
                            <input v-model="user.password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                        </div>

                        <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                            Remember me
                            </label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot your password?
                            </a>
                        </div>
                        </div>

                        <div>
                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="flex h-screen justify-center items-center" v-else>
        <div>Welcome, {{ $auth.user().name }}</div>
        <div>Getting your account ready.</div>
    </div>
</div>

</template>

<script>
export default {
    data(){
        return {
            isLoading : false,
            user: {
                email: null,
                password: null
            },
            progress : {
                value : 0,
                text : "",
            }
        }
    },
    created(){
        this.redirect_()
    },
    methods:{
        redirect_() {
            if(this.$auth.check()){
                
                var redirect = this.$auth.redirect()
                let route_name = null

                if(this.$auth.user().role == 1){
                    route_name = 'dashboard'
                }

                const redirectTo = redirect ? redirect.from.name : route_name
                this.$router.push({name: redirectTo})

            }
        },
        login() {
            //get the redirect object
            this.isLoading = true
            var app = this
            this.$auth.login({
                params: {
                    email: app.user.email,
                    password: app.user.password
                },
                success: function(res) {
                    this.isLoading = false
                    this.$store.commit('setUser', this.$auth.user())
                    this.redirect_()
                },
                error: function(err) {
                    this.isLoading = false
                },
            })
        }

    }
}
</script>

<style scoped>

</style>