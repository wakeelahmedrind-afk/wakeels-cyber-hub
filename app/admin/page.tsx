
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Resource = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  file_name: string | null;
  file_path: string | null;
  is_published: boolean;
};

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Penetration Testing");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function checkAdmin(userId: string) {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (error || data?.role !== "admin") {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    setAuthorized(true);
    await loadResources();
    setLoading(false);
  }

  async function loadResources() {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Resources load nahi huay: " + error.message);
      return;
    }

    setResources(data || []);
  }

  useEffect(() => {
    async function initialize() {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user;

      if (currentUser) {
        setUser(currentUser);
        await checkAdmin(currentUser.id);
      } else {
        setLoading(false);
      }
    }

    initialize();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user;

        setUser(currentUser || null);
        setAuthorized(false);

        if (currentUser) {
          checkAdmin(currentUser.id);
        } else {
          setLoading(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
      setBusy(false);
      return;
    }

    setUser(data.user);
    await checkAdmin(data.user.id);
    setBusy(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setAuthorized(false);
    setResources([]);
  }

  async function addResource(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user || !title.trim()) return;

    if (file && file.size > 50 * 1024 * 1024) {
      alert("File 50 MB se bari hai.");
      return;
    }

    setBusy(true);

    let filePath: string | null = null;

    try {
      if (file) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        filePath = `${user.id}/${crypto.randomUUID()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("cyber-resources")
          .upload(filePath, file, {
            contentType: file.type || "application/octet-stream",
            upsert: false,
          });

        if (uploadError) throw uploadError;
      }

      const { error: insertError } = await supabase
        .from("resources")
        .insert({
          title: title.trim(),
          category,
          description: description.trim(),
          file_name: file?.name || null,
          file_path: filePath,
          is_published: false,
        });

      if (insertError) {
        if (filePath) {
          await supabase.storage.from("cyber-resources").remove([filePath]);
        }
        throw insertError;
      }

      setTitle("");
      setDescription("");
      setFile(null);

      const fileInput = document.getElementById(
        "resource-file"
      ) as HTMLInputElement | null;

      if (fileInput) fileInput.value = "";

      await loadResources();
      alert("Resource successfully save ho gaya!");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setBusy(false);
    }
  }

  async function togglePublish(resource: Resource) {
    setBusy(true);

    const { error } = await supabase
      .from("resources")
      .update({ is_published: !resource.is_published })
      .eq("id", resource.id);

    if (error) {
      alert("Update failed: " + error.message);
    } else {
      await loadResources();
    }

    setBusy(false);
  }

  async function deleteResource(resource: Resource) {
    if (!confirm("Kya aap ye resource delete karna chahte hain?")) return;

    setBusy(true);

    try {
      const { error: deleteError } = await supabase
        .from("resources")
        .delete()
        .eq("id", resource.id);

      if (deleteError) throw deleteError;

      if (resource.file_path) {
        const { error: storageError } = await supabase.storage
          .from("cyber-resources")
          .remove([resource.file_path]);

        if (storageError) {
          alert("Database record delete ho gaya, lekin storage file delete nahi hui: " + storageError.message);
        }
      }

      await loadResources();
    } catch (error: any) {
      alert("Delete failed: " + error.message);
    } finally {
      setBusy(false);
    }
  }

  async function downloadFile(resource: Resource) {
    if (!resource.file_path) return;

    const { data, error } = await supabase.storage
      .from("cyber-resources")
      .createSignedUrl(resource.file_path, 60);

    if (error) {
      alert("File access failed: " + error.message);
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  if (loading) {
    return <main className="p-10 text-center">Loading...</main>;
  }

  if (!user || !authorized) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-5">
        <form
          onSubmit={login}
          className="bg-white rounded-2xl p-8 w-full max-w-md space-y-4"
        >
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-slate-500">
            Wakeel's Cyber Hub Admin Control Center
          </p>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded-lg p-3"
          />

          <button
            disabled={busy}
            className="w-full bg-blue-700 text-white p-3 rounded-lg disabled:opacity-50"
          >
            {busy ? "Please wait..." : "Login"}
          </button>

          {user && !authorized && (
            <p className="text-red-600 text-sm">
              Is account ko Admin permission nahi mili.
            </p>
          )}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-slate-950 text-white px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">WAKEEL'S CYBER HUB</h1>
            <p className="text-slate-300 text-sm">Admin Control Center</p>
          </div>

          <div className="flex gap-3">
            <a href="/" className="bg-white text-slate-900 px-4 py-2 rounded-lg">
              View Website
            </a>
            <button onClick={logout} className="bg-red-600 px-4 py-2 rounded-lg">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-2">Welcome, Administrator</h2>
        <p className="text-slate-500 mb-8">
          Manage your cybersecurity knowledge library.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {[
            ["Total Resources", resources.length],
            ["Published", resources.filter((r) => r.is_published).length],
            ["Drafts", resources.filter((r) => !r.is_published).length],
          ].map(([label, value]) => (
            <div key={String(label)} className="bg-white p-6 rounded-2xl shadow-sm border">
              <p className="text-slate-500">{label}</p>
              <p className="text-3xl font-bold mt-2">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <section className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-6">
            <h3 className="text-xl font-bold mb-5">Add New Resource</h3>

            <form onSubmit={addResource} className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Resource Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter resource title"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Category</label>
                <input
                  required
                  list="resource-categories"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-lg p-3"
                />
                <datalist id="resource-categories">
                  <option value="Penetration Testing" />
                  <option value="Network Security" />
                  <option value="CTF Write-ups" />
                  <option value="Cybersecurity Books" />
                  <option value="English Notes" />
                  <option value="Programming" />
                  <option value="Other" />
                </datalist>
                <p className="text-xs text-slate-500 mt-1">
                  Aap apni new category bhi type kar sakte hain.
                </p>
              </div>

              <div>
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your resource"
                  rows={4}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Select File (50 MB max)</label>
                <input
                  id="resource-file"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full border rounded-lg p-3"
                />
                {file && (
                  <p className="text-xs text-slate-500 mt-2">
                    {file.name} — {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={busy}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold p-3 rounded-lg disabled:opacity-50"
              >
                {busy ? "Please wait..." : "Add Resource"}
              </button>
            </form>
          </section>

          <section className="lg:col-span-3 bg-white rounded-2xl border shadow-sm p-6">
            <h3 className="text-xl font-bold mb-5">Manage Resources</h3>

            {resources.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <p className="font-semibold">No resources added yet</p>
                <p className="text-sm">Add your first resource using the form.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="border rounded-xl p-4">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="font-bold">{resource.title}</h4>
                        <p className="text-sm text-blue-700">{resource.category}</p>
                        <p className="text-sm text-slate-500 mt-2">
                          {resource.description}
                        </p>
                        <p className="text-xs text-slate-500 mt-2 break-all">
                          File: {resource.file_name || "No file attached"}
                        </p>
                      </div>

                      <span className={`text-xs h-fit px-2 py-1 rounded ${
                        resource.is_published
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {resource.is_published ? "Published" : "Draft"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <button
                        disabled={busy}
                        onClick={() => togglePublish(resource)}
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                      >
                        {resource.is_published ? "Unpublish" : "Publish"}
                      </button>

                      {resource.file_path && (
                        <button
                          onClick={() => downloadFile(resource)}
                          className="bg-slate-200 px-4 py-2 rounded-lg text-sm"
                        >
                          Download
                        </button>
                      )}

                      <button
                        disabled={busy}
                        onClick={() => deleteResource(resource)}
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
