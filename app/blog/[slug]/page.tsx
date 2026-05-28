import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

/* ── Static post data (replace with CMS/MDX when ready) ── */
const posts: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readTime: string;
    bg: string;
    content: string;
  }
> = {
  "los-mejores-regalos-para-cada-ocasion": {
    title: "Los mejores regalos para cada ocasión",
    category: "Regalos",
    date: "15 de mayo, 2025",
    readTime: "4 min",
    bg: "bg-[#f5ede8]",
    content: `
Regalar es un arte. Un buen regalo no se mide por su precio, sino por la intención que lleva. La pregunta clave no es cuánto gastaste, sino cuánto pensaste en esa persona.

## La intención detrás del regalo

Un regalo con intención dice más que cualquier tarjeta. Cuando elegís algo que habla del otro —de sus gustos, sus rituales, sus momentos— estás regalando tiempo, atención y amor. Eso es lo que ELUNÈ busca transmitir en cada creación.

## Tipos de regalo según la ocasión

**Cumpleaños**: Optá por algo que mime a quien lo recibe. Un box con jabones artesanales y una vela es perfecto para quien valora el autocuidado.

**Casamiento / Baby shower**: Los souvenirs personalizados son el detalle que los invitados guardan. Un jabón con forma floral o una bolsita con el nombre del evento transforma el recuerdo.

**Sin ocasión**: A veces el mejor regalo es el inesperado. Un "pensé en vos" en forma de box pequeña puede ser el gesto más significativo del año.

## El packaging importa

La primera impresión siempre es visual. Un regalo bien presentado —con packaging cuidado, cintas, tarjeta— eleva cualquier objeto a la categoría de experiencia. En ELUNÈ, el packaging es parte del regalo, no un accesorio.

## ¿Cómo elegir el regalo ideal?

1. Pensá en los rituales diarios de esa persona
2. Elegí algo que no se comprarían solas
3. Sumá un detalle personalizado (nombre, fecha, mensaje)
4. Presentalo con amor

El regalo perfecto no existe. Pero el regalo intencional, sí.
    `.trim(),
  },
  "como-elegir-el-jabon-artesanal-perfecto": {
    title: "Cómo elegir el jabón artesanal perfecto",
    category: "Self-Care",
    date: "28 de abril, 2025",
    readTime: "5 min",
    bg: "bg-[#edf2ee]",
    content: `
Un jabón artesanal no es solo un jabón. Es una decisión consciente sobre lo que ponés en tu cuerpo y cómo querés empezar (o terminar) tu día.

## Ingredientes que hacen la diferencia

Los jabones de supermercado están llenos de detergentes y conservantes. Los artesanales, en cambio, se hacen con aceites vegetales, mantecas naturales y aromas puros. Algunos ingredientes clave:

**Aceite de coco**: Limpia profundamente y da una espuma abundante.

**Manteca de karité**: Hidrata y suaviza pieles secas o sensibles.

**Arcilla**: Ideal para pieles mixtas, absorbe el exceso de grasa.

**Lavanda**: Tiene propiedades calmantes, perfecta para la noche.

**Avena**: Suaviza y alivia la irritación. Ideal para pieles sensibles.

## Fragancias vs. aceites esenciales

Los jabones artesanales pueden perfumarse con fragancias sintéticas o con aceites esenciales puros. Los aceites esenciales son la opción más natural, aunque su aroma puede ser más sutil.

## Formas y estética

En ELUNÈ, cada jabón tiene una forma pensada: flores, animales, corazones. El diseño hace que el jabón sea bonito en tu baño o mesada, no solo funcional.

## ¿Cómo saber que es de calidad?

Un buen jabón artesanal debe:
- Tener una lista de ingredientes clara
- Estar curado correctamente (proceso que lleva varias semanas)
- No causar irritación ni resecar la piel

La próxima vez que elijas un jabón, elegí uno que cuide tu piel y tu espacio.
    `.trim(),
  },
  "el-ritual-de-regalarse-a-una-misma": {
    title: "El ritual de regalarse a una misma",
    category: "Bienestar",
    date: "10 de abril, 2025",
    readTime: "3 min",
    bg: "bg-[#f3f0f7]",
    content: `
Hay una forma de autocuidado que muchas veces olvidamos: regalarnos a nosotras mismas.

## ¿Por qué nos cuesta tanto?

Desde pequeñas, aprendemos que los regalos son para los demás. Pero cuidarse también es un acto de amor, y a veces ese amor hay que dárselo una misma.

## Un ritual es más que una rutina

Una rutina es mecánica. Un ritual es intencional. La diferencia está en la presencia: en prestar atención a lo que estás haciendo, en elegir hacerlo con cuidado.

Un jabón artesanal con tu fragancia favorita, encendido con agua caliente, en silencio. Eso es un ritual.

## Cómo crear el tuyo

1. **Elegí un momento del día** que sea tuyo. La mañana antes de que todos se despierten, o la noche cuando la casa está en calma.

2. **Sumá un elemento sensorial**: una vela, un jabón con aroma especial, una crema que amás.

3. **Desconectate del teléfono** por esos 10 minutos. Completamente.

4. **Nombrá lo que sentís**: gratitud, cansancio, alegría. Solo nombrar ya es un acto de cuidado.

## Regalate lo que regalás a otros

Si tenés cuidado al elegir los regalos para quienes querés, tenelo también al elegir lo que te regalás a vos. Porque vos también lo merecés.

En ELUNÈ creemos que el autocuidado empieza por ahí: por decidir que uno mismo vale el mismo cuidado que se le da a los demás.
    `.trim(),
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} — Blog ELUNÈ`,
    description: post.content.slice(0, 160),
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-serif text-3xl text-dark mt-10 mb-4"
        >
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("**") && line.endsWith("**")) {
      const text = line.replace(/\*\*/g, "");
      return (
        <p key={i} className="font-sans font-semibold text-dark mt-4">
          {text}
        </p>
      );
    }
    if (line.match(/^\*\*(.+?)\*\*:/)) {
      const match = line.match(/^\*\*(.+?)\*\*:(.*)/);
      if (match) {
        return (
          <p key={i} className="font-sans text-taupe leading-relaxed mt-2">
            <strong className="text-dark">{match[1]}:</strong>
            {match[2]}
          </p>
        );
      }
    }
    if (line.match(/^\d+\.\s/)) {
      return (
        <li key={i} className="font-sans text-taupe leading-relaxed ml-4 list-decimal">
          {line.replace(/^\d+\.\s/, "")}
        </li>
      );
    }
    if (line.trim() === "") return <div key={i} className="h-3" />;
    return (
      <p key={i} className="font-sans text-taupe leading-relaxed">
        {line}
      </p>
    );
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24">
      <article className="max-w-3xl mx-auto px-6 lg:px-0">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-widest text-taupe hover:text-soft-gold transition-colors duration-300 uppercase mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Volver al blog
        </Link>

        {/* Hero image area */}
        <div
          className={`${post.bg} aspect-[16/7] w-full flex items-center justify-center mb-10`}
        >
          <span className="font-serif text-6xl text-dark/10 tracking-widest select-none">
            ELUNÈ
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-sans text-[10px] tracking-[0.3em] text-soft-gold uppercase border border-soft-gold px-2 py-0.5">
            {post.category}
          </span>
          <span className="font-sans text-xs text-taupe/60">{post.date}</span>
          <span className="text-taupe/30">·</span>
          <span className="font-sans text-xs text-taupe/60">
            {post.readTime} de lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl text-dark leading-tight mb-6">
          {post.title}
        </h1>
        <div className="w-12 h-px bg-soft-gold mb-10" />

        {/* Content */}
        <div className="flex flex-col gap-3">{renderContent(post.content)}</div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-warm-beige/30 text-center">
          <p className="font-serif text-xl text-dark italic mb-4">
            &ldquo;El arte de regalar con intención&rdquo;
          </p>
          <Link
            href="/#contacto"
            className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-cream bg-dark px-6 py-3 hover:bg-soft-gold transition-colors duration-500"
          >
            Hacer un pedido
          </Link>
        </div>
      </article>
    </div>
  );
}
