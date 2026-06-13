import Link from "next/link";
import { ArrowLeft, List } from "lucide-react";
import { getProducts } from "@/lib/data";
import ProductsBulkEditor from "@/components/admin/ProductsBulkEditor";

const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" };
const sans = { fontFamily: "var(--font-jost), system-ui, sans-serif" };

export default async function BulkProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-xs text-[#6F6963] hover:text-[#2C2825] transition-colors duration-200 mb-6"
        style={sans}
      >
        <ArrowLeft size={13} /> Volver a la lista
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-[#2C2825]" style={serif}>
            Planilla de productos
          </h1>
          <p className="text-sm text-[#6F6963] mt-1" style={sans}>
            Editá todos los productos juntos, como una hoja de cálculo.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 border border-[#DDD2C4] text-xs tracking-[0.15em] uppercase text-[#6F6963] px-4 py-2.5 hover:border-[#C7AA7A] hover:text-[#C7AA7A] transition-colors duration-200"
          style={sans}
        >
          <List size={13} /> Vista lista
        </Link>
      </div>

      <ProductsBulkEditor initial={products} />
    </div>
  );
}
