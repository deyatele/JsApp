class Apisevice {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

  async createPost(post) {
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'post',
        body: JSON.stringify(post),
      });
      return useRequeste(request);
    } catch (error) {
      console.error(error);
    }
  }
  async fetchPosts() {
    try {
      const request = new Request(`${this.url}/posts.json`,{
          method: 'get'
      });
      return useRequeste(request);
    } catch (error) {
      console.error(error);
    }
  }
  async fetchPostById(id) {
    try {
        const request = new Request(`${this.url}/posts/${id}.json`,{
            method: 'get'
        });
        return useRequeste(request);
      } catch (error) {
        console.error(error);
      }
  }
}
async function useRequeste(request) {
  const response = await fetch(request);
  return await response.json();
}
export const apiService = new Apisevice(
  'https://jsappfb-default-rtdb.europe-west1.firebasedatabase.app'
);
