import { Link } from "react-router-dom";
import { Reveal } from "../../components/ui/Reveal";

type NextCollectionProps = {
  eyebrow: string;
  title: React.ReactNode;
  href: string;
};

export function NextCollection({ eyebrow, title, href }: NextCollectionProps) {
  return (
    <section className="border-t border-line px-[40px] py-[100px] text-center max-md:px-[22px]">
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display mt-[22px]">
          <Link to={href} className="border-b border-accent pb-[6px]">
            {title} →
          </Link>
        </h2>
      </Reveal>
    </section>
  );
}
