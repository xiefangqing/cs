<template>
  <div class="c2">
    <topic-search @search="search" />
  </div>
</template>

<script>
import TopicSearch from '@/components/TopicSearch.vue';

export default {
  name: 'C2',
  components: {
    TopicSearch
  },
  methods: {
    search(info) {
      console.log(info);
    }
  }
};
</script>
