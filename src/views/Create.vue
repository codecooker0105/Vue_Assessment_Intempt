<template>
  <v-container>
    <v-form @submit.prevent="createPost">
      <v-text-field label="Title" v-model="title" required></v-text-field>
      <v-textarea label="Body" v-model="body" required></v-textarea>
      <v-btn color="primary" type="submit">Create Post</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "CreateView",
  data() {
    return {
      title: this.$store.state.selectedPost
        ? this.$store.state.selectedPost.title
        : "",
      body: this.$store.state.selectedPost
        ? this.$store.state.selectedPost.body
        : "",
    };
  },
  methods: {
    async createPost() {
      const fetchUrl = this.$store.state.selectedPost
        ? `https://jsonplaceholder.typicode.com/posts/${this.$store.state.selectedPost.id}`
        : "https://jsonplaceholder.typicode.com/posts";
      const fetchBody = this.$store.state.selectedPost
        ? JSON.stringify({
            id: this.$store.state.selectedPost.id,
            title: this.title,
            body: this.body,
            userId: 1,
          })
        : JSON.stringify({
            title: this.title,
            body: this.body,
            userId: 1,
          });
      const response = await fetch(fetchUrl, {
        method: this.$store.state.selectedPost ? "PUT" : "POST",
        body: fetchBody,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const newPost = await response.json();
      if (newPost?.id) {
        var newPosts = this.$store.state.posts;
        if (this.$store.state.selectedPost) {
          newPosts.map((v) => {
            if (v.id === this.$store.state.selectedPost.id) {
              v.title = this.title;
              v.body = this.body;
            }
          });
        } else {
          newPosts.push(newPost);
        }
        await this.$store.dispatch("setPosts", newPosts);
        await this.$store.dispatch("setMessage", {
          content: this.$store.state.selectedPost
            ? "Successfully updated"
            : "Successfully created",
          type: "success",
        });
      } else {
        await this.$store.dispatch("setMessage", {
          content: this.$store.state.selectedPost
            ? "Failed to update"
            : "Failed to creat",
          type: "error",
        });
      }
      this.$router.push("/");
    },
  },
};
</script>
