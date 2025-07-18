import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Banner,
  Card,
  Pagination,
  PopularPosts,
  PopularWriters,
} from "../components";
import { CATEGORIES } from "../utils/dummyData";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [popular, setPopular] = useState({ posts: [], writers: [] });
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/posts?page=${page}`);
        setPosts(res.data.data);
        setNumOfPages(res.data.numOfPage || 1);
      } catch (err) {
        setPosts([]);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get("/api/posts/popular");
        setPopular(res.data.data);
      } catch (err) {
        setPopular({ posts: [], writers: [] });
      }
    };
    fetchPopular();
  }, []);

  const handlePageChange = (val) => {
    setPage(val);
  };

  if (loading)
    return (
      <div className='w-full h-full py-8 flex items-center justify-center'>
        <span className='text-lg text-slate-500'>Loading...</span>
      </div>
    );

  if (posts?.length < 1)
    return (
      <div className='w-full h-full py-8 flex items-center justify-center'>
        <span className='text-lg text-slate-500'>No Post Available</span>
      </div>
    );

  const randomIndex = Math.floor(Math.random() * posts.length);

  return (
    <div className='py-10 2xl:py-5'>
      <Banner post={posts[randomIndex]} />

      <div className='px-0 lg:pl-20 2xl:px-20 '>
        {/* Categories */}
        <div className='mt-6 md:mt-0'>
          <p className='text-2xl font-semibold text-gray-600 dark:text-white'>
            Popular Categories
          </p>
          <div className='w-full flex flex-wrap py-10 gap-8'>
            {CATEGORIES.map((cat) => (
              <Link
                to={`/category?cat=${cat?.label}`}
                className={`flex items-center justify-center gap-3 ${cat.color} text-white font-semibold text-base px-4 py-2 rounded cursor-pointer`}
                key={cat.label}
              >
                {cat?.icon}
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Blog Post */}
        <div className='w-full flex flex-col md:flex-row gap-10 2xl:gap-20'>
          {/* LEFT */}
          <div className='w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14'>
            {posts?.map((post, index) => (
              <Card key={post?._id} post={post} index={index} />
            ))}

            <div className='w-full flex items-cemter justify-center'>
              <Pagination
                totalPages={numOfPages}
                onPageChange={handlePageChange}
                currentPage={page}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className='w-full md:w-1/4 flex flex-col gap-y-12'>
            {/* POPULAR POSTS */}
            <PopularPosts posts={popular?.posts} />

            {/* POPULAR WRITERS */}
            <PopularWriters data={popular?.writers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
