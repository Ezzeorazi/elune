import Link from "next/link";
import { getProducts } from "@/lib/data";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";

const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" };
const sans = { fontFamily: "var(--font-jost), system-ui, sans-serif" };

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-[#2C2825]" style={serif}>
            Productos
          </h1>
          <p className="text-sm text-[#6F6963] mt-1" style={sans}>
            {products.length} productos en total
          </p>
        </div>
        <Link
          href="/admin/products/nuevo"
          className="inline-flex items-center gap-2 bg-[#2C2825] text-[#F5F1EB] text-xs tracking-[0.2em] uppercase px-4 py-2.5 hover:bg-[#C7AA7A] transition-colors duration-300"
          style={sans}
        >
          <Plus size={13} />
          Nuevo
        </Link>
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-[#DDD2C4] flex items-center gap-4 p-4"
          >
            <div
              className="w-14 h-14 relative shrink-0 overflow-hidden"
              style={{ background: product.bg }}
            >
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-base text-[#2C2825]" style={serif}>
                {product.name}
              </p>
              <p
                className="text-xs text-[#6F6963] mt-0.5 truncate"
                style={sans}
              >
                {product.description}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className="text-[10px] tracking-widest text-[#C7AA7A] uppercase"
                  style={sans}
                >
                  {product.tag}
                </span>
                <span
                  className={`text-[10px] ${
                    product.published
                      ? "text-green-600"
                      : "text-[#6F6963]/40"
                  }`}
                  style={sans}
                >
                  {product.published ? "● Publicado" : "○ Borrador"}
                </span>
              </div>
            </div>

            <Link
              href={`/admin/products/${product.id}`}
              className="shrink-0 inline-flex items-center gap-1.5 text-xs text-[#6F6963] hover:text-[#C7AA7A] border border-[#DDD2C4] hover:border-[#C7AA7A] transition-colors duration-200 px-3 py-1.5"
              style={sans}
            >
              <Pencil size={11} />
              Editar
            </Link>
          </div>
        ))}

        {products.length === 0 && (
          <div className="bg-white border border-[#DDD2C4] p-12 text-center">
            <p className="text-[#6F6963]" style={sans}>
              No hay productos todavía.{" "}
              <Link
                href="/admin/products/nuevo"
                className="text-[#C7AA7A] hover:underline"
              >
                Creá el primero
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
