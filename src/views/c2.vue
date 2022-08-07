<template>
  <div class="c2">
    <home-search @search="search" />
  </div>
</template>

<script>
import HomeSearch from '@/components/HomeSearch.vue';

export default {
  name: 'C2',
  components: {
    HomeSearch
  },
  methods: {
    search(info) {
      console.log(info);
    }
  }
};
</script>
