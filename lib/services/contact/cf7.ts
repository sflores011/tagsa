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

export async function sendContactToCf7(values: ContactPayload): Promise<Cf7Response> {
  const endpoint = requiredEnv(
    "NEXT_PUBLIC_CF7_FEEDBACK_URL",
    "https://tagsa.aumenta.do/wp-json/contact-form-7/v1/contact-forms/101/feedback",
  );

  const formId = requiredEnv("NEXT_PUBLIC_CF7_FORM_ID", "101");
  const formVersion = requiredEnv("NEXT_PUBLIC_CF7_VERSION", "6.1.5");
  const locale = requiredEnv("NEXT_PUBLIC_CF7_LOCALE", "en_US");
  const unitTag = requiredEnv("NEXT_PUBLIC_CF7_UNIT_TAG", "wpcf7-f101-p0-o1");
  const containerPost = requiredEnv("NEXT_PUBLIC_CF7_CONTAINER_POST", "38");

  const body = new URLSearchParams({
    "full-name": values.fullName,
    email: values.email,
    "tel-546": values.tel,
    subject: values.subject,
    message: values.message ?? "",
    _wpcf7: formId,
    _wpcf7_version: formVersion,
    _wpcf_locale: locale,
    _wpcf7_unit_tag: unitTag,
    _wpcf7_container_post: containerPost,
  });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "application/json",
    },
    body,
  });

  const data = (await response.json()) as Cf7Response;

  if (!response.ok) {
    throw data;
  }

  return data;
}
