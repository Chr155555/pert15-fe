import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deletePost } from "../../actions";

export default async function PostDetailPage({
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
        <div className="col-12 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="fw-bold mb-3">{post.title}</h2>
              <div className="text-muted small mb-4">
                Dipublikasikan pada:{" "}
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="lead mb-4" style={{ whiteSpace: "pre-line" }}>
                {post.content}
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <Link href="/" className="btn btn-outline-secondary">
                  ← Kembali ke Beranda
                </Link>
                <div className="d-flex gap-2">
                  <Link
                    href={`/edit/${post.id}`}
                    className="btn btn-outline-primary"
                  >
                    Edit
                  </Link>
                  <form action={deletePost.bind(null, post.id)}>
                    <button type="submit" className="btn btn-outline-danger">
                      Hapus
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
