import Image from 'next/image';
import Navbar from '../components/navbar';

import posts from '../../../dummy-data/posts.json';
import users from '../../../dummy-data/users.json';

const currentUser = users[0];

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="m-4 rounded-lg p-4 ring-2 ring-black bg-white shadow-lg">
        <div className="flex gap-4">
          <h1 className="text-2xl my-2 font-bold">startery community</h1>
          <button className="bg-rose-200 my-2 p-2 rounded-lg text-rose-600 h-fit self-center md:mt-0 ring-2 shadow-lg ring-black/80 underline underline-offset-2">
            start new thread
          </button>
        </div>

        <div className="bg-slate-200/50 mb-2 rounded-lg flex w-full gap-1">
          <h2 className="uppercase p-2 w-2/3">topic</h2>
          <h2 className="uppercase p-2 w-1/6 text-xs">replies</h2>
          <h2 className="uppercase p-2 w-1/6 text-xs">views</h2>
          <h2 className="uppercase p-2 w-1/6 text-xs">latest</h2>
        </div>
        <div className="divide-black/50 p-2">
          {posts.map((post) => (
            <div
              key={post._id}
              className="mb-2 hover:bg-rose-200 rounded-lg flex ring-2 ring-black"
            >
              <div className="p-2 w-2/3">
                <a href="" className="underline">
                  {post.title}
                </a>
                <div className="flex gap-8">
                  <h3 className="font-bold text-xs">{post.author}</h3>
                  <h3 className="text-xs">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                  </h3>
                </div>
              </div>
              <h2 className="p-2 w-1/6">{post.comments.length}</h2>
              <h2 className="p-2 w-1/6">{post.views}</h2>
              <h2 className="p-2 w-1/6">{post.upvotes}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
