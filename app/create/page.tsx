import Link from "next/link";
import { createPost } from "../actions";

export default function CreatePostPage() {
  return (
    <div className="py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="card-title mb-0">Tambah Post Baru</h4>
            </div>
            <div className="card-body">
              <form action={createPost}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-bold">
                    Judul Post
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Masukkan judul artikel"
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
                    rows={5}
                    className="form-control"
                    placeholder="Tuliskan isi artikel di sini..."
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <Link href="/" className="btn btn-secondary">
                    Kembali
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Simpan Post
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
