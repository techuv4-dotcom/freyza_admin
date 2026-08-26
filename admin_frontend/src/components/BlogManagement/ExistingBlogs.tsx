import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios.instance";
// import AddBlogForm from "./AddBlogForm";
// AddBlogForm;
// import updateBlog from "./updateBlog";
import UpdateBlog from "./updateBlog";
import { toast } from "react-toastify";
import AddBlogForm from "./AddBlogForm";
import { useAuth } from "../../context/AuthContext";
// import AddBlogForm from "./updateBlog";
// import updateBlog from "./updateBlog";

export interface Category {
  id: number;
  name: string;
}

export interface BlogData {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  slug: string;
  serviceCategoryId: number;
  serviceCategoryName: string;
}

export default function ExistingBlogs() {
  const { hasPermission } = useAuth();
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [content, setContent] = useState<BlogData>();
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showExistingBlog, setShowExistingBlog] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [data, setData] = useState<BlogData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all",
  );

  //   const fatchAll = async () => {
  //     try {
  //       const [blogResp, categoryResp] = await Promise.all([
  //         axiosInstance.get("/blog"),
  //         axiosInstance.get("/service-category"),
  //       ]);

  //       setData(blogResp.data);
  //       setCategorys(categoryResp.data);
  //     } catch (error) {
  //       toast.error("somthing went wrong");
  //       throw error;
  //     }
  //   };
  const fetchAll = async () => {
    try {
      console.log("Calling blog...");
      const blogResp = await axiosInstance.get("/blog");
      console.log("Blog success");

      console.log("Calling category...");
      const categoryResp = await axiosInstance.get("/service-category/name");
      setCategorys(categoryResp.data);
      console.log("Category success");

      setData(blogResp.data);
      //   setCategorys(categoryResp.data);
    } catch (err) {
      toast.error("somthing went wrong");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {showExistingBlog && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Blogs</h2>
          <div className="flex justify-end">
            {hasPermission("blog", "create") && (
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(true);
                  setShowExistingBlog(false);
                  setShowEditForm(false);
                }}
                className="rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                Add new Blog
              </button>
            )}
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value === "all" ? "all" : Number(e.target.value),
                )
              }
              className="w-full md:w-72 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Categories</option>

              {categorys.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Blogs */}
          <div className="space-y-4">
            {data
              .slice(1)
              .filter((blog) =>
                selectedCategory === "all"
                  ? true
                  : blog.serviceCategoryId === selectedCategory,
              )
              .map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-center justify-between border rounded-xl p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {blog.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    {hasPermission("blog", "update") && (
                      <button
                        onClick={() => {
                          setContent(blog);
                          setShowEditForm(true);
                          setShowExistingBlog(false);
                        }}
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </button>
                    )}

                    {hasPermission("blog", "read") && (
                      <button
                        onClick={() => {
                          setContent(blog);
                          setShowEditForm(true);
                          setShowExistingBlog(false);
                        }}
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      >
                        <Eye size={18} />
                      </button>
                    )}

                    {hasPermission("blog", "delete") && (
                      <button
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                        onClick={async () => {
                          await axiosInstance.delete(`/blog/${blog.id}`);
                          toast.success("Deleted Successfully");
                          fetchAll();
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {showEditForm && (
        <UpdateBlog
          categorys={categorys}
          setShow={setShowExistingBlog}
          setShowEditForm={setShowEditForm}
          content={content!}
          setContent={setContent}
          onUpdate={fetchAll}
        />
      )}
      {showAddForm && (
        <AddBlogForm
          categorys={categorys}
          setShow={setShowAddForm}
          setShowExistingBlog={setShowExistingBlog}
        />
      )}
    </div>
  );
}
