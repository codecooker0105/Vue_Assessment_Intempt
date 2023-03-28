<template>
  <v-container>
    <v-card :loading="isLoading">
      <template v-if="!isLoading">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text>{{ post.body }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="editPost">Edit</v-btn>
          <v-btn color="error" @click="deletePost">Delete</v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <v-skeleton-loader type="article"> </v-skeleton-loader>
      </template>
    </v-card>

    <v-divider class="my-2"></v-divider>

    <template v-if="!isLoading">
      <v-card v-for="comment in comments" :key="comment.id" class="mb-1">
        <v-card-title>{{ comment.name }}</v-card-title>
        <v-card-text>{{ comment.body }}</v-card-text>
      </v-card>
    </template>
    <template v-else>
      <v-card v-for="id in 5" :key="id" class="mb-1">
        <v-skeleton-loader type="article"> </v-skeleton-loader>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "PostView",
  components: {},
  computed: {
    post() {
      return this.$store.state.selectedPost;
    },
  },
  data() {
    return {
      isLoading: true,
      comments: [],
    };
  },
  async mounted() {
    var response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
    );
    const post = await response.json();
    this.$store.dispatch("setSelectedPost", post);
    response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}/comments`
    );
    this.comments = await response.json();
    this.isLoading = false;
  },
  methods: {
    editPost() {
      this.$router.push("/create");
    },
    async deletePost() {
      await fetch(
        `https://jsonplaceholder.typicode.com/posts/${this.post.id}`,
        {
          method: "DELETE",
        }
      );
      const newPosts = this.$store.state.posts.filter(
        (v) => v.id !== this.post.id
      );
      await this.$store.dispatch("setPosts", newPosts);
      await this.$store.dispatch("setMessage", {
        content: "Successfully deleted",
        type: "success",
      });
      this.$router.push("/");
    },
  },
};
</script>
