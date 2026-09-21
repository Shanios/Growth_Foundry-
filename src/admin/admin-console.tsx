"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Switch } from "@/frontend/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/frontend/components/ui/tabs";
import { Textarea } from "@/frontend/components/ui/textarea";

type Kind = "case-studies" | "blog";

type Item = {
  id: number;
  title: string;
  body: string;

  published: boolean;

  sector?: string | null;
  outcome?: string | null;

  author?: string | null;

  featuredImage?: string | null;
  coverImage?: string | null;

  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

function ContentManager({ kind }: { kind: Kind }) {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);

  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const [published, setPublished] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setPublished(Boolean(editing?.published));
    setPreviewUrl(null);
  }, [editing]);

  const load = useCallback(async () => {
    try {
      const response = await fetch(`/api/cms/${kind}`);

      const data = (await response.json()) as {
        items?: Item[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to load content.");
      }

      setItems(data.items ?? []);
    } catch {
      setStatus("Content is temporarily unavailable.");
    }
  }, [kind]);

  useEffect(() => {
    void load();
  }, [load]);

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);
  }

  async function save(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setBusy(true);
    setStatus("");

    const form = event.currentTarget;
    const data = new FormData(form);

    let image = String(
      data.get("existingImage") ?? ""
    );

    const file = data.get("image");

    try {
      if (
        file instanceof File &&
        file.size > 0
      ) {
        const media = new FormData();

        media.set("file", file);

        const upload = await fetch(
          "/api/cms/upload",
          {
            method: "POST",
            body: media,
          }
        );

        const uploadData =
          (await upload.json()) as {
            url?: string;
            error?: string;
          };

        if (
          !upload.ok ||
          !uploadData.url
        ) {
          throw new Error(
            uploadData.error ||
              "Upload failed"
          );
        }

        image = uploadData.url;
      }

      const payload = {
        id: editing?.id,

        title: data.get("title"),
        body: data.get("body"),

        sector: data.get("sector"),
        outcome: data.get("outcome"),

        author: data.get("author"),

        image,

        published,
      };

      const response = await fetch(
        `/api/cms/${kind}`,
        {
          method: editing
            ? "PATCH"
            : "POST",

          headers: {
            "content-type":
              "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const result =
        (await response.json()) as {
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to save."
        );
      }

      const wasEditing =
        Boolean(editing);

      form.reset();

      if (previewUrl) {
        URL.revokeObjectURL(
          previewUrl
        );
      }

      setPreviewUrl(null);
      setEditing(null);
      setPublished(false);

      setStatus(
        wasEditing
          ? "Changes saved."
          : "Draft created."
      );

      await load();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to save."
      );
    } finally {
      setBusy(false);
    }
  }

  async function remove(
    id: number
  ) {
    if (
      !window.confirm(
        "Delete this record? This cannot be undone."
      )
    ) {
      return;
    }

    setBusy(true);

    try {
      const response = await fetch(
        `/api/cms/${kind}?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete record."
        );
      }

      if (editing?.id === id) {
        setEditing(null);
        setPublished(false);

        if (previewUrl) {
          URL.revokeObjectURL(
            previewUrl
          );
        }

        setPreviewUrl(null);
      }

      setStatus(
        "Record deleted."
      );

      await load();
    } catch {
      setStatus(
        "Unable to delete this record."
      );
    } finally {
      setBusy(false);
    }
  }

  function cancelEdit() {
    setEditing(null);
    setPublished(false);
    setStatus("");

    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      );
    }

    setPreviewUrl(null);
  }

  return (
    <div className="admin-grid">
      <form
        className="editor-panel"
        onSubmit={save}
      >
        <div className="admin-panel-heading">
          <div>
            <span className="admin-kicker">
              {editing
                ? "Editing"
                : "New record"}
            </span>

            <h2>
              {kind === "blog"
                ? "Insight"
                : "Case study"}
            </h2>
          </div>

          {editing && (
            <Button
              type="button"
              variant="ghost"
              onClick={cancelEdit}
            >
              Cancel edit
            </Button>
          )}
        </div>

        <label>
          Title

          <Input
            name="title"
            required
            defaultValue={
              editing?.title ?? ""
            }
            key={`title-${
              editing?.id ?? "new"
            }`}
          />
        </label>

        <label>
          Body

          <Textarea
            name="body"
            required
            defaultValue={
              editing?.body ?? ""
            }
            key={`body-${
              editing?.id ?? "new"
            }`}
            className="min-h-36"
          />
        </label>

        {kind ===
        "case-studies" ? (
          <div className="editor-two">
            <label>
              Sector

              <Input
                name="sector"
                defaultValue={String(
                  editing?.sector ?? ""
                )}
                key={`sector-${
                  editing?.id ??
                  "new"
                }`}
              />
            </label>

            <label>
              Outcome

              <Input
                name="outcome"
                defaultValue={String(
                  editing?.outcome ?? ""
                )}
                key={`outcome-${
                  editing?.id ??
                  "new"
                }`}
              />
            </label>
          </div>
        ) : (
          <label>
            Author

            <Input
              name="author"
              defaultValue={String(
                editing?.author ??
                  "Growth Foundry"
              )}
              key={`author-${
                editing?.id ??
                "new"
              }`}
            />
          </label>
        )}

        <label>
          Cover image

          {(editing?.featuredImage ||
            editing?.coverImage) &&
            !previewUrl && (
              <div className="admin-image-preview">
                <img
                  src={String(
                    editing?.featuredImage ??
                      editing?.coverImage
                  )}
                  alt="Current uploaded cover"
                />

                <span>
                  Current image
                </span>
              </div>
            )}

          {previewUrl && (
            <div className="admin-image-preview">
              <img
                src={previewUrl}
                alt="New selected cover preview"
              />

              <span>
                New image preview
              </span>
            </div>
          )}

          <Input
            name="image"
            type="file"
            accept="image/*"
            onChange={
              handleImageChange
            }
          />

          <input
            type="hidden"
            name="existingImage"
            value={String(
              editing?.featuredImage ??
                editing?.coverImage ??
                ""
            )}
          />
        </label>

        <label className="publish-row">
          <Switch
            checked={published}
            onCheckedChange={
              setPublished
            }
          />

          Published
        </label>

        <Button
          type="submit"
          size="lg"
          disabled={busy}
        >
          {busy
            ? "Saving…"
            : editing
            ? "Save changes"
            : "Create draft"}
        </Button>

        <p
          className="admin-status"
          role="status"
        >
          {status}
        </p>
      </form>

      <section className="records-panel">
        <div className="admin-panel-heading">
          <div>
            <span className="admin-kicker">
              Content library
            </span>

            <h2>
              {items.length} records
            </h2>
          </div>
        </div>

        <div className="record-list">
          {items.length === 0 ? (
            <p className="empty-records">
              No records yet. Create
              the first one.
            </p>
          ) : (
            items.map((item) => (
              <article
                className="record"
                key={item.id}
              >
                <div>
                  <span>
                    {item.published
                      ? "Published"
                      : "Draft"}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.body.slice(
                      0,
                      120
                    )}

                    {item.body.length >
                    120
                      ? "…"
                      : ""}
                  </p>
                </div>

                <div className="record-actions">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditing(
                        item
                      );
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    disabled={busy}
                    onClick={() =>
                      void remove(
                        item.id
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
type ContactSubmissionItem = {
  id: number;
  name: string;
  email: string;
  company?: string | null;
  topic?: string | null;
  message: string;
  createdAt: string;
};

function ContactSubmissionsManager() {
  const [items, setItems] = useState<
    ContactSubmissionItem[]
  >([]);

  const [status, setStatus] =
    useState("");

  const [busy, setBusy] =
    useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch(
        "/api/admin/contact-submissions"
      );

      const data =
        (await response.json()) as {
          items?: ContactSubmissionItem[];
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to load enquiries."
        );
      }

      setItems(data.items ?? []);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to load enquiries."
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove(id: number) {
    if (
      !window.confirm(
        "Delete this enquiry? This cannot be undone."
      )
    ) {
      return;
    }

    setBusy(true);
    setStatus("");

    try {
      const response = await fetch(
        `/api/admin/contact-submissions?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const result =
        (await response.json()) as {
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to delete enquiry."
        );
      }

      setStatus("Enquiry deleted.");

      await load();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to delete enquiry."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="records-panel admin-full-panel">
      <div className="admin-panel-heading">
        <div>
          <span className="admin-kicker">
            Contact enquiries
          </span>

          <h2>
            {items.length} enquiries
          </h2>
        </div>
      </div>

      <div className="record-list">
        {items.length === 0 ? (
          <p className="empty-records">
            No contact enquiries yet.
          </p>
        ) : (
          items.map((item) => (
            <article
              className="record admin-data-record"
              key={item.id}
            >
              <div>
                <div className="admin-record-meta">
                  <span>
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </span>

                  {item.topic && (
                    <span>
                      {item.topic}
                    </span>
                  )}
                </div>

                <h3>{item.name}</h3>

                <p>
                  <a
                    href={`mailto:${item.email}`}
                  >
                    {item.email}
                  </a>

                  {item.company
                    ? ` · ${item.company}`
                    : ""}
                </p>

                <p className="admin-message">
                  {item.message}
                </p>
              </div>

              <div className="record-actions">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={busy}
                  onClick={() =>
                    void remove(item.id)
                  }
                >
                  Delete
                </Button>
              </div>
            </article>
          ))
        )}
      </div>

      <p
        className="admin-status"
        role="status"
      >
        {status}
      </p>
    </section>
  );
}
type NewsletterSubscriberItem = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  consent: boolean;
  active: boolean;
  createdAt: string;
};

function NewsletterSubscribersManager() {
  const [items, setItems] = useState<
    NewsletterSubscriberItem[]
  >([]);

  const [status, setStatus] =
    useState("");

  const [busy, setBusy] =
    useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch(
        "/api/admin/newsletter-subscribers"
      );

      const data =
        (await response.json()) as {
          items?: NewsletterSubscriberItem[];
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to load subscribers."
        );
      }

      setItems(data.items ?? []);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to load subscribers."
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function toggleActive(
    item: NewsletterSubscriberItem
  ) {
    setBusy(true);
    setStatus("");

    try {
      const response = await fetch(
        "/api/admin/newsletter-subscribers",
        {
          method: "PATCH",

          headers: {
            "content-type":
              "application/json",
          },

          body: JSON.stringify({
            id: item.id,
            active: !item.active,
          }),
        }
      );

      const result =
        (await response.json()) as {
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to update subscriber."
        );
      }

      setStatus(
        item.active
          ? "Subscriber deactivated."
          : "Subscriber reactivated."
      );

      await load();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to update subscriber."
      );
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    if (
      !window.confirm(
        "Permanently delete this subscriber?"
      )
    ) {
      return;
    }

    setBusy(true);
    setStatus("");

    try {
      const response = await fetch(
        `/api/admin/newsletter-subscribers?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const result =
        (await response.json()) as {
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to delete subscriber."
        );
      }

      setStatus(
        "Subscriber deleted."
      );

      await load();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to delete subscriber."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="records-panel admin-full-panel">
      <div className="admin-panel-heading">
        <div>
          <span className="admin-kicker">
            Mailing list
          </span>

          <h2>
            {items.length} subscribers
          </h2>
        </div>
      </div>

      <div className="record-list">
        {items.length === 0 ? (
          <p className="empty-records">
            No newsletter subscribers yet.
          </p>
        ) : (
          items.map((item) => (
            <article
              className="record admin-data-record"
              key={item.id}
            >
              <div>
                <div className="admin-record-meta">
                  <span>
                    {item.active
                      ? "Active"
                      : "Inactive"}
                  </span>

                  <span>
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </span>
                </div>

                <h3>
                  {item.firstName}{" "}
                  {item.lastName}
                </h3>

                <p>
                  <a
                    href={`mailto:${item.email}`}
                  >
                    {item.email}
                  </a>
                </p>

                <p>
                  Consent:{" "}
                  {item.consent
                    ? "Yes"
                    : "No"}
                </p>
              </div>

              <div className="record-actions">
                <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={() =>
                    void toggleActive(
                      item
                    )
                  }
                >
                  {item.active
                    ? "Deactivate"
                    : "Reactivate"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  disabled={busy}
                  onClick={() =>
                    void remove(item.id)
                  }
                >
                  Delete
                </Button>
              </div>
            </article>
          ))
        )}
      </div>

      <p
        className="admin-status"
        role="status"
      >
        {status}
      </p>
    </section>
  );
}
export function AdminConsole() {
  return (
    <Tabs
      defaultValue="case-studies"
      className="admin-tabs"
    >
      <TabsList variant="line">
        <TabsTrigger value="case-studies">
          Case studies
        </TabsTrigger>

        <TabsTrigger value="blog">
          Insights
        </TabsTrigger>

        <TabsTrigger value="contacts">
          Contact enquiries
        </TabsTrigger>

        <TabsTrigger value="newsletter">
          Newsletter
        </TabsTrigger>
      </TabsList>

      <TabsContent value="case-studies">
        <ContentManager kind="case-studies" />
      </TabsContent>

      <TabsContent value="blog">
        <ContentManager kind="blog" />
      </TabsContent>

      <TabsContent value="contacts">
        <ContactSubmissionsManager />
      </TabsContent>

      <TabsContent value="newsletter">
        <NewsletterSubscribersManager />
      </TabsContent>
    </Tabs>
  );
}