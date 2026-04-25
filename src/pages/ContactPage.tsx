import { useEffect } from "react";
import { PageBanner } from "../components/shared/PageBanner";
import { Reveal } from "../components/ui/Reveal";
import { InquiryForm } from "../features/contact/InquiryForm";
import { StudioInfo } from "../features/contact/StudioInfo";

const PAGE_TITLE = "Contact — YELI";

export default function ContactPage() {
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="Section 05 — Contact"
        title={
          <>
            Tell us
            <br />
            about the <em>day</em>.
          </>
        }
        lede="We respond to every inquiry within two days. We book five weddings per season."
      />

      <section className="px-[40px] py-[120px] max-md:px-[22px] max-md:py-[80px]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-[80px] max-md:grid-cols-1 max-md:gap-[60px]">
          <Reveal variant="left">
            <StudioInfo />
          </Reveal>
          <Reveal variant="right" delay={1}>
            <InquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
