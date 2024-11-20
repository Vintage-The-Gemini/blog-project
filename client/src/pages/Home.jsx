// In your component (e.g., Home.jsx or wherever you fetch blogs)
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Log the API URL to verify it's correct
        console.log('API URL:', import.meta.env.VITE_API_URL + '/api/blogs');
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`);
        console.log('Response:', response.data); // Log the response
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {blogs.length === 0 ? (
        <div>No blogs found</div>
      ) : (
        blogs.map(blog => (
          <div key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;