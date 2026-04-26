import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import contactContent from "../../assets/strings/contact.json";
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

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const FORM = contactContent.form;
const FIELDS = FORM.fields;

function formatSubject(template: string, type: string, name: string) {
  return template.replace("{type}", type).replace("{name}", name);
}

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { type: INQUIRY_TYPES[0] },
  });

  const onSubmit = async (values: InquiryFormValues) => {
    setSubmitError(null);

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      setSubmitError(FORM.errors.notConfigured);
      return;
    }

    const subject = formatSubject(FORM.subjectTemplate, values.type, values.yourName);
    const payload = {
      access_key: accessKey,
      subject,
      from_name: values.yourName,
      replyto: values.email,
      [FIELDS.yourName.label]: values.yourName,
      [FIELDS.partnerName.label]: values.partnerName ?? "",
      [FIELDS.email.label]: values.email,
      [FIELDS.date.label]: values.date ?? "",
      [FIELDS.type.label]: values.type,
      [FIELDS.location.label]: values.location ?? "",
      [FIELDS.message.label]: values.message ?? "",
    };

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Request failed");
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? `${FORM.errors.prefix} ${error.message}`
          : FORM.errors.fallback,
      );
    }
  };

  if (submitted) {
    return (
      <div className="border border-line p-[24px] font-display text-[20px] italic text-ink-soft">
        {FORM.successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-2 gap-[28px] max-md:grid-cols-1">
        <TextField
          id={FIELD_IDS.yourName}
          label={FIELDS.yourName.label}
          placeholder={FIELDS.yourName.placeholder}
          autoComplete="name"
          error={errors.yourName?.message}
          {...register("yourName")}
        />
        <TextField
          id={FIELD_IDS.partnerName}
          label={FIELDS.partnerName.label}
          placeholder={FIELDS.partnerName.placeholder}
          {...register("partnerName")}
        />
      </div>

      <TextField
        id={FIELD_IDS.email}
        label={FIELDS.email.label}
        type="email"
        placeholder={FIELDS.email.placeholder}
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="grid grid-cols-2 gap-[28px] max-md:grid-cols-1">
        <TextField
          id={FIELD_IDS.date}
          label={FIELDS.date.label}
          placeholder={FIELDS.date.placeholder}
          {...register("date")}
        />
        <SelectField
          id={FIELD_IDS.type}
          label={FIELDS.type.label}
          options={INQUIRY_TYPES}
          error={errors.type?.message}
          {...register("type")}
        />
      </div>

      <TextField
        id={FIELD_IDS.location}
        label={FIELDS.location.label}
        placeholder={FIELDS.location.placeholder}
        {...register("location")}
      />

      <TextAreaField
        id={FIELD_IDS.message}
        label={FIELDS.message.label}
        placeholder={FIELDS.message.placeholder}
        {...register("message")}
      />

      {submitError ? (
        <p
          role="alert"
          className="mt-[20px] font-sans text-[12px] uppercase tracking-meta text-accent"
        >
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-[20px] bg-ink px-[40px] py-[18px] font-sans text-[11px] uppercase tracking-meta text-bg transition-colors duration-300 hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? FORM.submittingLabel : FORM.submitLabel}
      </button>
    </form>
  );
}
