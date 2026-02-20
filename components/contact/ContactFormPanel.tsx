"use client";

import { FormEvent, useState } from "react";
import {
  Cf7InvalidField,
  sendContactToCf7,
} from "@/lib/services/contact/cf7";

type ContactFormValues = {
  fullName: string;
  email: string;
  tel: string;
  subject: string;
  message: string;
};

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  tel: "",
  subject: "",
  message: "",
};

export default function ContactFormPanel() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});

  const fieldNameMap: Record<string, keyof ContactFormValues> = {
    "full-name": "fullName",
    email: "email",
    "tel-546": "tel",
    subject: "subject",
    message: "message",
  };

  const mapInvalidFields = (invalidFields: Cf7InvalidField[] = []) => {
    const nextErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    invalidFields.forEach((item) => {
      const uiField = fieldNameMap[item.field];
      if (uiField) {
        nextErrors[uiField] = item.message;
      }
    });
    setFieldErrors(nextErrors);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const data = await sendContactToCf7(values);

      if (data.status === "mail_sent") {
        setSuccessMessage(data.message || "Mensaje enviado correctamente.");
        setValues(initialValues);
        return;
      }

      if (data.status === "validation_failed") {
        mapInvalidFields(data.invalid_fields ?? []);
        setErrorMessage(data.message || "Valida los campos del formulario.");
        return;
      }

      setErrorMessage(data.message || "No se pudo enviar el mensaje.");
    } catch (error: unknown) {
      let message = "No se pudo enviar el mensaje.";
      let invalidFields: Cf7InvalidField[] = [];

      if (typeof error === "object" && error !== null) {
        const apiError = error as Error & {
          message?: string;
          invalid_fields?: Cf7InvalidField[];
          cf7?: {
            message?: string;
            invalid_fields?: Cf7InvalidField[];
          };
        };

        if (typeof apiError.cf7?.message === "string") {
          message = apiError.cf7.message;
        } else if (typeof apiError.message === "string") {
          message = apiError.message;
        }

        if (Array.isArray(apiError.invalid_fields)) {
          invalidFields = apiError.invalid_fields;
        } else if (Array.isArray(apiError.cf7?.invalid_fields)) {
          invalidFields = apiError.cf7.invalid_fields;
        }
      }

      mapInvalidFields(invalidFields);
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#E6E6E6] px-6 pb-10 pt-32 md:px-12 md:pb-16 md:pt-36 lg:px-16">
      <div className="mx-auto w-full max-w-[560px]">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-[18px] text-black">
              Nombre
            </label>
            <input
              id="fullName"
              type="text"
              value={values.fullName}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, fullName: event.target.value }))
              }
              required
              className="h-[56px] w-full rounded-[12px] border border-[#B3B3B3] bg-white px-5 text-[20px] text-black outline-none transition focus:border-[#2683d8]"
              placeholder="Juan Rodriguez"
            />
            {fieldErrors.fullName && (
              <p className="text-sm font-semibold text-red-600">{fieldErrors.fullName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[18px] text-black">
                Correo Electronico
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
                required
                className="h-[56px] w-full rounded-[12px] border border-[#B3B3B3] bg-white px-5 text-[20px] text-black outline-none transition focus:border-[#2683d8]"
                placeholder="Correo electronico"
              />
              {fieldErrors.email && (
                <p className="text-sm font-semibold text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="tel" className="block text-[18px] text-black">
                Telefono
              </label>
              <input
                id="tel"
                type="text"
                value={values.tel}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, tel: event.target.value }))
                }
                required
                className="h-[56px] w-full rounded-[12px] border border-[#B3B3B3] bg-white px-5 text-[20px] text-black outline-none transition focus:border-[#2683d8]"
                placeholder="1234 5678"
              />
              {fieldErrors.tel && (
                <p className="text-sm font-semibold text-red-600">{fieldErrors.tel}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="block text-[18px] text-black">
              Asunto
            </label>
            <input
              id="subject"
              type="text"
              value={values.subject}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, subject: event.target.value }))
              }
              required
              className="h-[56px] w-full rounded-[12px] border border-[#B3B3B3] bg-white px-5 text-[20px] text-black outline-none transition focus:border-[#2683d8]"
              placeholder="Asunto"
            />
            {fieldErrors.subject && (
              <p className="text-sm font-semibold text-red-600">{fieldErrors.subject}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-[18px] text-black">
              Mensaje
            </label>
            <textarea
              id="message"
              value={values.message}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, message: event.target.value }))
              }
              className="h-[180px] w-full resize-none rounded-[12px] border border-[#B3B3B3] bg-white px-5 py-4 text-[20px] text-black outline-none transition focus:border-[#2683d8]"
              placeholder="Tu mensaje"
            />
            {fieldErrors.message && (
              <p className="text-sm font-semibold text-red-600">{fieldErrors.message}</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-sm font-semibold text-green-700">{successMessage}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[56px] w-full rounded-[12px] bg-gradient-to-r from-[#0A66BF] to-[#30A8E0] text-[24px] text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </section>
  );
}
