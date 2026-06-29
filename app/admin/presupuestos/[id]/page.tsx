export const dynamic = "force-dynamic";

import { getPresupuesto, getSettings } from "@/lib/data";
import { notFound } from "next/navigation";
import PresupuestoDetail from "@/components/admin/PresupuestoDetail";

export default async function PresupuestoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pdf?: string }>;
}) {
  const { id } = await params;
  const { pdf } = await searchParams;

  const [presupuesto, settings] = await Promise.all([
    getPresupuesto(id),
    getSettings(),
  ]);

  if (!presupuesto) notFound();

  return <PresupuestoDetail presupuesto={presupuesto} settings={settings} autoPdf={pdf === "1"} />;
}
