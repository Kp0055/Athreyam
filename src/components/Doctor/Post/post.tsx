// src/components/Doctor/Post.tsx
import { useState, FormEvent } from "react";

function Post() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFeedPost = async (e: FormEvent) => {
    e.preventDefault();

    if (!text && !image) {
      alert("Please write something or upload an image.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", text);
      if (image) formData.append("image", image);

      const response = await fetch("http://localhost:5000/api/doctor/createPost", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      console.log("✅ Post successful:", data);

      setText("");
      setImage(null);
    } catch (error: any) {
      console.error("❌ Error posting:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFeedPost}
      className="bg-white p-6 rounded-lg shadow-md w-full  mx-auto"
    >
      <textarea
        rows={5}
        placeholder="What do you want to talk about?"
        className="w-full p-4 mb-4 rounded border border-gray-300 focus:outline-none text-base"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-6 py-2 rounded text-base`}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}

export default Post;
