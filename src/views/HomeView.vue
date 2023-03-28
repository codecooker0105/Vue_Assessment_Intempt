<template>
  <v-container>
    <v-card v-if="showAlert" class="my-3">
      <v-alert dense text :type="message?.type">
        {{ message?.content }}
      </v-alert>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="posts"
      :loading="isLoading"
      @click:row="(item) => viewPost(item.id)"
      loading-text="Loading... Please wait"
      class="elevation-1"
    >
      <template v-slot:[`top`]>
        <v-toolbar-title>
          <v-card align="right" class="pa-2 d-flex justify-end">
            <v-btn rounded color="primary" @click="gotoCreate"
              >Create New Post</v-btn
            >
          </v-card>
        </v-toolbar-title>
      </template>
      <template v-slot:[`item.body`]="{ item }">
        {{ item.body.substring(0, 50) }}...
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    headers() {
      return [
        { text: "Title", value: "title" },
        { text: "Body", value: "body" },
      ];
    },
    message() {
      return this.$store.state.message;
    },
  },
  data() {
    return {
      isLoading: true,
      showAlert: false,
      intervalId: null,
    };
  },
  async mounted() {
    if (this.$store.state.posts.length == 0) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const posts = await response.json();
      await this.$store.dispatch("setPosts", posts);
    }
    if (this.$store.state.message) {
      this.showAlert = true;
      this.hideAlert();
    }
    this.isLoading = false;
  },
  methods: {
    viewPost(id) {
      this.$router.push(`/post/${id}`);
    },
    gotoCreate() {
      this.$store.dispatch("setSelectedPost", null);
      this.$router.push(`/create`);
    },
    hideAlert() {
      this.intervalId = setInterval(() => {
        this.showAlert = false;
      }, 3000);
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
