<template>
<div class="">
    <div v-if="$auth.ready()">
        <router-view></router-view>
    </div>
    <div v-if="!$auth.ready()">
        <div>Loading...1</div>
    </div>
</div>
</template>

<script>
export default {
    mounted() {
        this.$auth.ready(function () {
            console.log('ready'); // Will be proper context.
        });
    }
}
</script>