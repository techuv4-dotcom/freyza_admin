import { useState } from "react";
import FreyzaJournalForm from "../components/BlogManagement/FreyzaJournalForm";
import AddBlogForm from "../components/BlogManagement/AddBlogForm";
// import BlogCategoryForm from "../components/BlogManagement/BlogCategoryForm";
import ExistingBlogs from "../components/BlogManagement/ExistingBlogs";

export interface BlogData {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  serviceCategoryId: number;
  serviceCategoryName: string;
}

const BlogManagement = () => {
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page Header */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage Freyza Journal content, blog categories, and blog posts.
          </p>
        </div>

        {/* Freyza Journal */}

        <FreyzaJournalForm
          description={description}
          setDescription={setDescription}
        />

        {/* Blog Categories */}

        {/* <BlogCategoryForm /> */}
        <ExistingBlogs />

        {/* Add Blog */}

        {/* <AddBlogForm content={content!} setContent={setContent} /> */}
      </div>
    </div>
  );
};

export default BlogManagement;
