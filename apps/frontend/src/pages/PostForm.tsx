import { useState } from "react";
import Markdown from "react-markdown";
import ImageUploading from "react-images-uploading";
import type { ImageListType } from "react-images-uploading";
import usePost from "../hooks/usePost";
import { useLocation } from "react-router-dom";

export default function PostForm() {
  const [showRenderedMarkdown, setShowRenderedMarkdown] = useState(false);
  const maxNumber = 9;
  const { postMutation } = usePost();
  const location = useLocation();
  const isEditForm = location.pathname.includes("edit");
  const { postData } = usePost();
  const [images, setImages] = useState<ImageListType>(
    isEditForm
      ? postData?.slideshow_image_urls.map((url: string) => ({
          data_url: url,
        })) || []
      : [],
  );

  const [thumbnail, setThumbnail] = useState<ImageListType>(
    isEditForm
      ? postData?.thumbnail_url
        ? [{ thumbnail: postData.thumbnail_url }]
        : []
      : [],
  );
  const [title, setTitle] = useState(isEditForm ? postData?.title : "");
  const [markdownContent, setMarkdownContent] = useState(
    isEditForm ? postData?.content : "",
  );
  const [tags, setTags] = useState(isEditForm ? postData?.tags : "");
  const [projectLink, setProjectLink] = useState(
    isEditForm ? postData?.project_link : "",
  );
  const [liveLink, setLiveLink] = useState(
    isEditForm ? postData?.live_link : "",
  );

  // ! For some reason there's a weird bug due to the backend DTO restricting users from only adding 1 tag
  // ! When the user presses the publish button, there needs to be a loading state so the user can't spam the publish button

  const onImageChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900">
      <div className="w-full lg:w-2/3 mx-auto lg:p-15 p-10  text-slate-50 space-y-5">
        <h1 className="text-3xl font-semibold my-10">
          {isEditForm ? "Edit Your Post" : "Create a New Post"}
        </h1>
        <div>
          <label className="block mb-2 text-lg text-slate-400">
            Upload Thumbnail <span className="text-red-500">*</span>
          </label>
          <div className="border border-slate-800 rounded-md overflow-hidden">
            <ImageUploading
              value={thumbnail}
              onChange={setThumbnail}
              maxNumber={1}
              dataURLKey="thumbnail"
            >
              {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                <div className="w-full h-60 bg-transparent outline-none text-white border border-slate-500 rounded-md flex items-center justify-center">
                  {imageList.length > 0 ? (
                    <div className="relative group w-full h-full">
                      <img
                        src={imageList[0].thumbnail}
                        alt="Thumbnail"
                        className="w-full h-full object-cover rounded-md"
                      />
                      {/* Overlay for actions when image exists */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => onImageUpdate(0)}
                          className="text-xs bg-sky-500 text-white px-2 py-1 rounded hover:bg-sky-600 hover:cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => onImageRemove(0)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Click to upload if no image
                    <button
                      type="button"
                      onClick={onImageUpload}
                      className="w-full h-full flex flex-col items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors rounded-md"
                    >
                      <span className="text-xl">+</span>
                      <span className="text-sm">Upload Thumbnail</span>
                    </button>
                  )}
                </div>
              )}
            </ImageUploading>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            This image will be used as the thumbnail for your post. Recommended
            dimensions: 1200x630px.
          </p>
        </div>
        <div className="text-white space-y-8">
          <div>
            <label className="block mb-2 text-lg text-slate-400">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-lg bg-transparent outline-none text-white border-b border-slate-500 pb-3"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="block mb-2 text-lg text-slate-400">
                Content <span className="text-red-500">*</span>
              </label>
              <p
                className="text-base text-slate-500 rounded-md px-2 py-1 underline hover:cursor-pointer hover:text-slate-400"
                onClick={() => setShowRenderedMarkdown(!showRenderedMarkdown)}
              >
                {showRenderedMarkdown
                  ? "Show Markdown Editor"
                  : "Show Rendered Markdown"}
              </p>
            </div>
            {showRenderedMarkdown ? (
              <div className="w-full min-h-60 bg-transparent outline-none text-white border border-slate-500 rounded-md p-3 font-mono text-sm max-h-96 overflow-y-scroll prose prose-invert max-w-none wrap-break-word">
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
              Upload Images for Showcase (max 9){" "}
              <span className="text-red-500">*</span>
            </label>
            <ImageUploading
              multiple
              value={images}
              onChange={onImageChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                <div className="border border-slate-800 rounded-md overflow-hidden">
                  <div className="grid grid-cols-3 gap-2 p-2">
                    {[...Array(maxNumber)].map((_, index) => {
                      const image = imageList[index];
                      return (
                        <div
                          key={index}
                          className="relative group h-32 border border-slate-600 rounded-md bg-slate-800 overflow-hidden flex items-center justify-center"
                        >
                          {image ? (
                            <>
                              <img
                                src={image.data_url}
                                alt={`Showcase ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {/* Overlay for actions when image exists */}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => onImageUpdate(index)}
                                  className="text-xs bg-sky-500 text-white px-2 py-1 rounded hover:bg-sky-600 hover:cursor-pointer"
                                >
                                  Change
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onImageRemove(index)}
                                  className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
                                >
                                  Remove
                                </button>
                              </div>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={onImageUpload}
                              className="w-full h-full flex flex-col items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
                            >
                              <span className="text-xl">+</span>
                              <span className="text-xs">Slot {index + 1}</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
          <div>
            <label className="block mb-2 text-lg text-slate-400">
              Tags (comma separated, max 5){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="tag1, tag2, tag3, tag4, tag5"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full text-lg bg-transparent outline-none text-white border-b border-slate-500 pb-3"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg text-slate-400">
              Link to your project repository (optional)
            </label>
            <input
              type="text"
              placeholder="https://yourproject.com"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
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
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
              className="w-full text-lg bg-transparent outline-none text-white border-b border-slate-500 pb-3"
            />
          </div>
          <div className="flex justify-end">
            {isEditForm ? (
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => {
                  // Handle post update logic here
                }}
              >
                Update Post
              </button>
            ) : (
              <button
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                onClick={() => {
                  // Handle post creation logic here
                }}
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
