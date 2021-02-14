<template>
<div class="h-screen">
    <div class="flex justify-center items-center" v-if="!$auth.check()">
        <div>Login FORM</div>
    </div>
    <div v-else>
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