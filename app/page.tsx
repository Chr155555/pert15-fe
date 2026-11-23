import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "./actions";

export default async function Home() {
  let posts: Array<{
    id: number;
    title: string;
    content: string;
    createdAt: Date;
  }> = [];

  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to query posts from Prisma:", err);
  }

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">My Prisma & SQLite Blog</h1>
          <p className="text-muted mb-0">
            Worksheet 4 - Deployment with Vercel & SQLite Database
          </p>
        </div>
        <Link href="/create" className="btn btn-primary">
          + Create New Post
        </Link>
      </div>

      <div className="alert alert-info mb-4" role="alert">
        <strong>Catatan Modul:</strong> Data database dibaca langsung dari SQLite
        (<code>dev.db</code>) via Prisma ORM. File database telah di-seed secara
        lokal dan dibundling untuk deployment Vercel.
      </div>

      {posts.length === 0 ? (
        <div className="card text-center p-5">
          <p className="text-muted mb-3">Belum ada post di database.</p>
          <div>
            <Link href="/create" className="btn btn-outline-primary">
              Buat Post Pertama
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {posts.map((post) => (
            <div key={post.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-primary">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-decoration-none text-primary"
                    >
                      {post.title}
                    </Link>
                  </h5>
                  <p className="card-text text-secondary flex-grow-1">
                    {post.content.length > 120
                      ? post.content.substring(0, 120) + "..."
                      : post.content}
                  </p>
                  <div className="text-muted small mb-3">
                    📅 {new Date(post.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="d-flex gap-2">
                    <Link
                      href={`/posts/${post.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Detail
                    </Link>
                    <Link
                      href={`/edit/${post.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <form
                      action={deletePost.bind(null, post.id)}
                      className="ms-auto"
                    >
                      <button
                        type="submit"
                        className="btn btn-sm btn-outline-danger"
                      >
                        Hapus
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
