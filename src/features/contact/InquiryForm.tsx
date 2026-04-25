import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { INQUIRY_TYPES, inquirySchema, type InquiryForm as InquiryFormValues } from "./contact.schema";
import { SelectField, TextAreaField, TextField } from "./Field";

const FIELD_IDS = {
  yourName: "inquiry-your-name",
  partnerName: "inquiry-partner-name",
  email: "inquiry-email",
  date: "inquiry-date",
  type: "inquiry-type",
  location: "inquiry-location",
  message: "inquiry-message",
} as const;

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { type: "Wedding" },
  });

  const onSubmit = async (_values: InquiryFormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-line p-[24px] font-display text-[20px] italic text-ink-soft">
        Thank you. We&rsquo;ll write back within two days.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-2 gap-[28px] max-md:grid-cols-1">
        <TextField
          id={FIELD_IDS.yourName}
          label="Your name"
          placeholder="Jane Aurelio"
          autoComplete="name"
          error={errors.yourName?.message}
          {...register("yourName")}
        />
        <TextField
          id={FIELD_IDS.partnerName}
          label="Partner's name"
          placeholder="Pierre Aurelio"
          {...register("partnerName")}
        />
      </div>

      <TextField
        id={FIELD_IDS.email}
        label="Email"
        type="email"
        placeholder="hello@elsewhere.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="grid grid-cols-2 gap-[28px] max-md:grid-cols-1">
        <TextField
          id={FIELD_IDS.date}
          label="Date (or season)"
          placeholder="June 2026"
          {...register("date")}
        />
        <SelectField
          id={FIELD_IDS.type}
          label="Type"
          options={INQUIRY_TYPES}
          error={errors.type?.message}
          {...register("type")}
        />
      </div>

      <TextField
        id={FIELD_IDS.location}
        label="Where"
        placeholder="Provence, France"
        {...register("location")}
      />

      <TextAreaField
        id={FIELD_IDS.message}
        label="Tell us about the day"
        placeholder="Anything you'd like us to know."
        {...register("message")}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-[20px] bg-ink px-[40px] py-[18px] font-sans text-[11px] uppercase tracking-meta text-bg transition-colors duration-300 hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
