import { useState } from "react";
import { Search, User, Calendar, Tag } from "lucide-react";
import Blogimg1 from "../../assets/Blogimg1.png";
import Blogimg2 from "../../assets/Blogimg2.png";
import Blogimg3 from "../../assets/Blogimg3.png";
import RP2 from "../../assets/Rp2.png";
import RP3 from "../../assets/Rp3.png";
import RP4 from "../../assets/Rp4.png";
import RP5 from "../../assets/Rp5.png";
import RP6 from "../../assets/Rp6.png";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  fullContent: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}

interface Category {
  name: string;
  count: number;
}

interface RecentPost {
  title: string;
  date: string;
  image: string;
}

const BlogMainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedPosts, setExpandedPosts] = useState(new Set<number>());
  const [searchTerm, setSearchTerm] = useState("");

  const allBlogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Going all-in with millennial design",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      fullContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: Blogimg1,
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      tags: ["design", "millennial", "modern"],
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      fullContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      image: Blogimg2,
      author: "Admin",
      date: "14 Oct 2022",
      category: "Handmade",
      tags: ["decorating", "interior", "design"],
    },
    {
      id: 3,
      title: "Handmade pieces that took time to make",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      fullContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus.",
      image: Blogimg3,
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      tags: ["handmade", "crafts", "artisan"],
    },
  ];

  const shuffleArray = (array: BlogPost[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const postsPerPage = 3;
  const totalPages = 2;

  const getCurrentPosts = () => {
    const filteredPosts = searchTerm
      ? allBlogPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
      : allBlogPosts;

    // Page 1 normal, Page 2 shuffled
    return currentPage === 1
      ? filteredPosts
      : shuffleArray(filteredPosts);
  };

  const toggleReadMore = (postId: number) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const categories: Category[] = [
    { name: "Crafts", count: 2 },
    { name: "Design", count: 8 },
    { name: "Handmade", count: 7 },
    { name: "Interior", count: 1 },
    { name: "Wood", count: 6 },
  ];

  const recentPosts: RecentPost[] = [
    { title: "Going all-in with millennial design", date: "03 Aug 2022", image: RP2 },
    { title: "Exploring new ways of decorating", date: "03 Aug 2022", image: RP3 },
    { title: "Handmade pieces that took time to make", date: "03 Aug 2022", image: RP4 },
    { title: "Modern home in Milan", date: "03 Aug 2022", image: RP5 },
    { title: "Colorful office redesign", date: "03 Aug 2022", image: RP6 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white min-h-screen">
      <div className="flex gap-8 items-start">
        <div className="flex-1 space-y-12">
          {getCurrentPosts().length > 0 ? (
            getCurrentPosts().map((post) => (
              <article key={post.id} className="bg-white rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-80 object-cover rounded-lg mb-6"
                />

                <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    <span>{post.category}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-medium text-black mb-4 leading-snug">
                  {post.title}
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {expandedPosts.has(post.id)
                    ? post.fullContent
                    : post.excerpt}
                </p>

                <button
                  onClick={() => toggleReadMore(post.id)}
                  className="text-black font-medium hover:underline"
                >
                  {expandedPosts.has(post.id) ? "Read less" : "Read more"}
                </button>
              </article>
            ))
          ) : (
            <div className="text-center text-gray-500 text-lg py-16">
              No posts found matching your search.
            </div>
          )}

          <div className="flex justify-center items-center gap-4 mt-16">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-md font-medium transition-colors ${
                  currentPage === page
                    ? "bg-yellow-700 text-white"
                    : "bg-yellow-50 text-black hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(currentPage < totalPages ? currentPage + 1 : 1)
              }
              className="px-4 py-2 bg-yellow-50 text-black rounded-md hover:bg-gray-100 transition"
            >
              Next
            </button>
          </div>
        </div>

        <div className="w-80 flex-shrink-0 flex flex-col gap-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-base outline-none focus:ring-2 focus:ring-yellow-700"
            />
            <Search
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <div>
            <h3 className="text-xl font-medium text-black mb-6">Categories</h3>
            <div className="flex flex-col gap-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-gray-500 text-base cursor-pointer hover:text-yellow-700"
                >
                  <span>{category.name}</span>
                  <span>{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-black mb-6">Recent Posts</h3>
            <div className="flex flex-col gap-6">
              {recentPosts.map((post, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-black leading-snug mb-1">
                      {post.title}
                    </h4>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogMainContent;
