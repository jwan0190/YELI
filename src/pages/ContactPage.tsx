import { useEffect } from "react";
import contactContent from "../components/assets/strings/contact.json";
import { PageBanner } from "../components/shared/PageBanner";
import { Reveal } from "../components/ui/Reveal";
import { InquiryForm } from "../features/contact/InquiryForm";
import { StudioInfo } from "../features/contact/StudioInfo";

export default function ContactPage() {
  useEffect(() => {
    document.title = contactContent.pageTitle;
  }, []);

  return (
    <>
      <PageBanner
        eyebrow={contactContent.banner.eyebrow}
        title={contactContent.banner.title}
        lede={contactContent.banner.lede}
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
