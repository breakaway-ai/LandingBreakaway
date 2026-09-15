"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const testimonials = [
  {
    quoteKey: "testimonials.testimonial1Quote",
    nameKey: "testimonials.testimonial1Name",
    roleKey: "testimonials.testimonial1Role",
  },
  {
    quoteKey: "testimonials.testimonial2Quote",
    nameKey: "testimonials.testimonial2Name",
    roleKey: "testimonials.testimonial2Role",
  },
  {
    quoteKey: "testimonials.testimonial3Quote",
    nameKey: "testimonials.testimonial3Name",
    roleKey: "testimonials.testimonial3Role",
  },
];

export default function Testimonials() {
  const t = useTranslations();

  return (
    <section id="testimonials" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="label text-primary">
            {t("testimonials.label")}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-[1.75rem] leading-[1.15] text-ink sm:text-4xl lg:text-[2.6rem]">
            {t("testimonials.headline")}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.figure
              key={testimonial.quoteKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: (i % 3) * 0.08 },
              }}
              viewport={{ once: true }}
              className="card flex h-full flex-col p-6 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl leading-none text-primary-soft"
              >
                “
              </span>
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink sm:text-base">
                {t(testimonial.quoteKey)}
              </blockquote>
              <figcaption className="mt-7 border-t border-ink/10 pt-5">
                <span className="block text-sm font-medium text-ink">
                  {t(testimonial.nameKey)}
                </span>
                <span className="prose-mono mt-1 block">
                  {t(testimonial.roleKey)}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
