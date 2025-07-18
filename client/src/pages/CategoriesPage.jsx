import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Pagination, PopularPosts, PopularWriters } from "../components";

const CategoriesPage = () => {
  const query = new URLSearchParams(window.location.search).get("cat");
  const [posts, setPosts] = useState([]);
  const [popular, setPopular] = useState({ posts: [], writers: [] });
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/posts?cat=${query}&page=${page}`);
        setPosts(res.data.data);
        setNumOfPages(res.data.numOfPage || 1);
      } catch (err) {
        setPosts([]);
      }
      setLoading(false);
    };
    if (query) fetchPosts();
  }, [query, page]);

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

  return (
    <div className='px-0 2xl:px-20'>
      <div className='py-5'>
        <h2 className='text-4xl 2xl:text-5xl font-semibold text-slate-800 dark:text-white'>
          {query}
        </h2>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-10 2xl:gap-20'>
        {/* LEFT */}
        <div className='w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14'>
          {posts?.length === 0 ? (
            <div className='w-full h-full py-8 flex  justify-center'>
              <span className='text-lg text-slate-500'>
                No Post Available for this category
              </span>
            </div>
          ) : (
            <>
              {posts?.map((post) => (
                <Card key={post?._id} post={post} />
              ))}

              <div className='w-full flex items-cemter justify-center'>
                <Pagination
                  totalPages={numOfPages}
                  onPageChange={handlePageChange}
                  currentPage={page}
                />
              </div>
            </>
          )}
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
  );
};

export default CategoriesPage;
