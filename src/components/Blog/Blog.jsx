import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => (
  <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <Link to={`/blog/${post.slug}`}>
      {post.image && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <time dateTime={post.publishedDate}>{new Date(post.publishedDate).toLocaleDateString()}</time>
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-medium">
              {post.author.initials}
            </div>
            <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  </article>
);

const Blog = () => {
  const blogPosts = [
    {
      slug: 'announcing-zkarnage',
      title: 'Announcing ZKarnage: A Mainnet Stress Test for Zero-Knowledge Provers',
      excerpt: 'Prooflab, with the support of a grant from the Ethereum Foundation, is proud to announce the launch of ZKarnage, a live, on-chain stress-testing initiative for zero-knowledge proving systems on the Ethereum mainnet.',
      publishedDate: '2025-07-21',
      readTime: 5,
      author: {
        name: 'Conner Swann',
        initials: 'CS'
      },
      tags: ['Announcement', 'ZKarnage', 'Research'],
      image: null
    },
    {
      slug: 'prooflab-research-collective',
      title: 'Introducing Prooflab: A Research Collective for Cryptographic Systems',
      excerpt: 'Today we are excited to announce the transformation of Prooflab into a research collective dedicated to improving the security, performance, and reliability of cryptographic proving systems.',
      publishedDate: '2025-07-15',
      readTime: 3,
      author: {
        name: 'Conner Swann',
        initials: 'CS'
      },
      tags: ['Announcement', 'Prooflab'],
      image: null
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
        <p className="text-lg text-gray-600">
          Latest updates, announcements, and insights from the Prooflab research collective.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog; 