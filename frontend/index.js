import { backend } from 'declarations/backend';

let quill;

document.addEventListener('DOMContentLoaded', async () => {
  quill = new Quill('#editor', {
    theme: 'snow'
  });

  const newPostBtn = document.getElementById('newPostBtn');
  const newPostForm = document.getElementById('newPostForm');
  const submitPostBtn = document.getElementById('submitPost');
  const postsContainer = document.getElementById('posts');

  newPostBtn.addEventListener('click', () => {
    newPostForm.style.display = 'block';
  });

  submitPostBtn.addEventListener('click', async () => {
    const title = document.getElementById('postTitle').value;
    const author = document.getElementById('postAuthor').value;
    const body = quill.root.innerHTML;

    if (title && author && body) {
      await backend.addPost(title, body, author);
      newPostForm.style.display = 'none';
      document.getElementById('postTitle').value = '';
      document.getElementById('postAuthor').value = '';
      quill.setContents([]);
      await displayPosts();
    }
  });

  async function displayPosts() {
    const posts = await backend.getPosts();
    postsContainer.innerHTML = '';
    posts.forEach(post => {
      const postElement = document.createElement('article');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p class="author">By ${post.author}</p>
        <div class="post-body">${post.body}</div>
      `;
      postsContainer.appendChild(postElement);
    });
  }

  await displayPosts();
});
