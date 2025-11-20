export default {
  async fetch() {
    return new Response("hello from url worker", {
      headers: { "content-type": "text/plain" },
    });
  },
};
