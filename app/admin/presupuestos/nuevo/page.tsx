import { getProducts, getSettings } from "@/lib/data";
import PresupuestoForm from "@/components/admin/PresupuestoForm";

export const dynamic = "force-dynamic";

export default async function NuevoPresupuestoPage() {
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);
  return <PresupuestoForm products={products} settings={settings} />;
}
