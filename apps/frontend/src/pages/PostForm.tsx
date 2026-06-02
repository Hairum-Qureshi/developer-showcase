import { useState } from "react";
import Markdown from "react-markdown";

export default function PostForm() {
  const [showRenderedMarkdown, setShowRenderedMarkdown] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900">
      <div className="w-2/3 mx-auto p-15 text-slate-50 space-y-5">
        <h1 className="text-3xl font-mono font-semibold my-10">
          Create a New Post
        </h1>

        <div>
          <label className="block mb-2 text-lg text-slate-400">
            Upload Thumbnail <span className="text-red-500">*</span>
          </label>
          <div className="border border-slate-800 rounded-md overflow-hidden">
            <img
              src="https://prairiesigns.com/assets/img/placeholder_600x400.svg"
              alt="Post Thumbnail"
              className="object-cover w-full h-64 hover:cursor-pointer"
            />
          </div>
        </div>

        <div className="text-white space-y-8">
          <div>
            <label className="block mb-2 text-lg text-slate-400">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="w-full text-lg bg-transparent outline-none text-white border-b border-slate-500 pb-3"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="block mb-2 text-lg text-slate-400">
                Content <span className="text-red-500">*</span>
              </label>
              {showRenderedMarkdown ? (
                <p
                  className="text-base text-slate-500 rounded-md px-2 py-1 underline hover:cursor-pointer hover:text-slate-400"
                  onClick={() => setShowRenderedMarkdown(false)}
                >
                  Show Rendered Markdown
                </p>
              ) : (
                <p
                  className="text-base text-slate-500 rounded-md px-2 py-1 underline hover:cursor-pointer hover:text-slate-400"
                  onClick={() => setShowRenderedMarkdown(true)}
                >
                  Show Markdown Editor
                </p>
              )}
            </div>
            {showRenderedMarkdown ? (
              <div className="w-full min-h-60 bg-transparent outline-none text-white border border-slate-500 rounded-md p-3 font-mono text-sm max-h-96 overflow-y-scroll prose prose-invert max-w-none">
                <Markdown>{markdownContent}</Markdown>
              </div>
            ) : (
              <>
                <textarea
                  placeholder="Write your post content here..."
                  className="w-full min-h-[300px] bg-transparent outline-none text-white border border-slate-500 rounded-md p-3 font-mono text-sm"
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                />
                <div className="flex w-full text-sm text-slate-500 justify-between items-center">
                  <p>This editor supports markdown</p>
                  <p>0/1000 Characters Remaining</p>
                </div>
              </>
            )}
          </div>
          <div>
            <label className="block mb-2 text-lg text-slate-400">
              Upload Images for Showcase (max 9)
              <span className="text-red-500">*</span>
            </label>
            <div className="border border-slate-800 rounded-md overflow-hidden">
              <div className="grid grid-cols-3 gap-2 p-2">
                <div className="border border-slate-600 rounded-md h-32 bg-slate-600 flex items-center justify-center text-slate-500">
                  <span>Image 1</span>
                </div>
                <div className="border border-slate-600 rounded-md h-32 bg-slate-600 flex items-center justify-center text-slate-500">
                  <span>Image 2</span>
                </div>
                <div className="border border-slate-600 rounded-md h-32 bg-slate-600 flex items-center justify-center text-slate-500">
                  <span>Image 3</span>
                </div>
                <div className="border border-slate-600 rounded-md h-32 bg-slate-600 flex items-center justify-center text-slate-500">
                  <span>Image 4</span>
                </div>
                <div className="border border-slate-600 rounded-md h-32 bg-slate-600 flex items-center justify-center text-slate-500">
                  <span>Image 5</span>
                </div>
                <div className="border border-slate-600 rounded-md h-32 bg-slate-600 flex items-center justify-center text-slate-500">
                  <span>Image 6</span>
                </div>
                <div className="border border-slate-600 rounded-md h-32 bg-slate-600 flex items-center justify-center text-slate-500">
                  <span>Image 7</span>
                </div>
                <div className="border border-slate-600 rounded-md h-32 bg-slate-600 flex items-center justify-center text-slate-500">
                  <span>Image 8</span>
                </div>
                <div className="border border-slate-600 rounded-md h-32 bg-slate-600 flex items-center justify-center text-slate-500">
                  <span>Image 9</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-lg text-slate-400">
              Link to your project repository (optional)
            </label>
            <input
              type="text"
              placeholder="https://yourproject.com"
              className="w-full text-lg bg-transparent outline-none text-white border-b border-slate-500 pb-3"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg text-slate-400">
              Link to your live project (optional)
            </label>
            <input
              type="text"
              placeholder="https://yourproject.com"
              className="w-full text-lg bg-transparent outline-none text-white border-b border-slate-500 pb-3"
            />
          </div>
          <div className="flex justify-end">
            <button className="px-5 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
