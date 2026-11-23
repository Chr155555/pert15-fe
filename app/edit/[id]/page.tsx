import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePost } from "../../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              <h4 className="card-title mb-0">Edit Post</h4>
            </div>
            <div className="card-body">
              <form action={updatePost.bind(null, post.id)}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-bold">
                    Judul Post
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={post.title}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label fw-bold">
                    Konten
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    defaultValue={post.content}
                    rows={5}
                    className="form-control"
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <Link href="/" className="btn btn-secondary">
                    Batal
                  </Link>
                  <button type="submit" className="btn btn-success">
                    Perbarui Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
