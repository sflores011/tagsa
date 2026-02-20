export type ContactPayload = {
  fullName: string;
  email: string;
  tel: string;
  subject: string;
  message?: string;
};

export type Cf7InvalidField = {
  field: string;
  message: string;
  idref?: string;
};

export type Cf7Response = {
  code?: string;
  contact_form_id: number;
  status: string;
  message: string;
  into?: string;
  invalid_fields?: Cf7InvalidField[];
  posted_data_hash?: string;
};

function requiredEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

export async function sendContactToCf7(
  values: ContactPayload,
): Promise<Cf7Response> {
  const endpoint = requiredEnv(
    "NEXT_PUBLIC_CF7_FEEDBACK_URL",
    "https://tagsa.aumenta.do/wp-json/contact-form-7/v1/contact-forms/101/feedback",
  );

  const formId = requiredEnv("NEXT_PUBLIC_CF7_FORM_ID", "101");
  const formVersion = requiredEnv("NEXT_PUBLIC_CF7_VERSION", "6.1.5");
  const locale = requiredEnv("NEXT_PUBLIC_CF7_LOCALE", "en_US");
  const unitTag = requiredEnv("NEXT_PUBLIC_CF7_UNIT_TAG", "wpcf7-f101-p0-o1");
  const containerPost = requiredEnv("NEXT_PUBLIC_CF7_CONTAINER_POST", "38");

  const fd = new FormData();

  // Campos CF7
  fd.set("full-name", values.fullName);
  fd.set("email", values.email);
  fd.set("tel-546", values.tel);
  fd.set("subject", values.subject);
  fd.set("message", values.message ?? "");

  // Meta CF7
  fd.set("_wpcf7", formId);
  fd.set("_wpcf7_version", formVersion);
  fd.set("_wpcf_locale", locale);
  fd.set("_wpcf7_unit_tag", unitTag);
  fd.set("_wpcf7_container_post", containerPost);

  const response = await fetch(endpoint, {
    method: "POST",
    // 👇 NO pongas Content-Type aquí.
    // El navegador pone multipart/form-data con boundary correcto.
    headers: {
      Accept: "application/json",
    },
    body: fd,
  });

  const raw = await response.text();
  let data: Cf7Response;
  try {
    data = JSON.parse(raw) as Cf7Response;
  } catch {
    data = {
      contact_form_id: Number(formId),
      status: "error",
      message: raw || "Unexpected response from CF7",
    };
  }

  if (!response.ok) {
    const error = new Error(
      `CF7 error ${response.status} ${response.statusText}: ${data?.message ?? raw}`,
    ) as Error & { status: number; cf7: Cf7Response };
    error.status = response.status;
    error.cf7 = data;
    throw error;
  }

  return data;
}
