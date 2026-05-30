import { getContacts, markContactRead, deleteContact } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { Mail, MailOpen, Trash2 } from "lucide-react";

const subjectLabels: Record<string, string> = {
  jabones: "Jabones artesanales",
  box: "Box de regalo",
  souvenirs: "Souvenirs para evento",
  personalizado: "Pedido personalizado",
  otro: "Otro",
};

export default async function ContactsPage() {
  const contacts = await getContacts();
  const unread = contacts.filter((c) => !c.read).length;

  async function read(id: string) {
    "use server";
    await markContactRead(id);
    revalidatePath("/admin/contacts");
  }

  async function remove(id: string) {
    "use server";
    await deleteContact(id);
    revalidatePath("/admin/contacts");
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1
          className="text-3xl text-[#2C2825]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Mensajes de contacto
        </h1>
        <p
          className="text-sm text-[#6F6963] mt-1"
          style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
        >
          {contacts.length} mensajes · {unread} sin leer
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white border border-[#DDD2C4] p-12 text-center">
          <p
            className="text-[#6F6963] text-sm"
            style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
          >
            Todavía no hay mensajes.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {contacts.map((c) => (
            <div
              key={c.id}
              className={`bg-white border p-6 ${
                c.read ? "border-[#DDD2C4]" : "border-[#C7AA7A]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {!c.read && (
                      <span
                        className="text-[9px] tracking-[0.3em] bg-[#C7AA7A]/20 text-[#C7AA7A] px-2 py-0.5 uppercase"
                        style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                      >
                        Nuevo
                      </span>
                    )}
                    <span
                      className="text-[10px] tracking-[0.25em] text-[#6F6963]/50 uppercase"
                      style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                    >
                      {subjectLabels[c.subject] ?? c.subject}
                    </span>
                    <span
                      className="text-[10px] text-[#6F6963]/40"
                      style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                    >
                      ·{" "}
                      {new Date(c.created_at).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p
                    className="text-base text-[#2C2825] font-medium"
                    style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                  >
                    {c.name}
                  </p>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-sm text-[#C7AA7A] hover:underline"
                    style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                  >
                    {c.email}
                  </a>
                  <p
                    className="text-sm text-[#6F6963] mt-3 leading-relaxed whitespace-pre-wrap"
                    style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
                  >
                    {c.message}
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  {!c.read && (
                    <form action={read.bind(null, c.id)}>
                      <button
                        type="submit"
                        title="Marcar como leído"
                        className="p-2 text-[#6F6963]/50 hover:text-[#C7AA7A] transition-colors duration-200"
                      >
                        <MailOpen size={16} strokeWidth={1.5} />
                      </button>
                    </form>
                  )}
                  {c.read && (
                    <span className="p-2 text-[#6F6963]/30">
                      <Mail size={16} strokeWidth={1.5} />
                    </span>
                  )}
                  <form action={remove.bind(null, c.id)}>
                    <button
                      type="submit"
                      title="Eliminar"
                      className="p-2 text-[#6F6963]/50 hover:text-red-400 transition-colors duration-200"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
