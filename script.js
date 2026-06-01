const yearEl = document.getElementById("year");
const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");
const whatsappButton = document.getElementById("whatsapp-button");

const contactEmail = form.dataset.contactEmail || "hello@homeopathyhub.com.au";
const whatsappNumber = (form.dataset.whatsapp || "61000000000").replace(/\D/g, "");

yearEl.textContent = new Date().getFullYear();

const buildInquiryText = () => {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim() || "Not provided";
  const concern = form.concern.value.trim();

  return [
    "New inquiry from Homeopathy Hub website",
    "",
    `Full Name: ${name}`,
    `Email Address: ${email}`,
    `Phone Number: ${phone}`,
    "",
    "Health Concerns:",
    concern,
  ].join("\n");
};

const openWhatsApp = () => {
  if (!whatsappNumber) {
    message.textContent = "Clinic WhatsApp number is missing. Please set form data-whatsapp first.";
    message.style.color = "#a23e35";
    return;
  }

  const text = encodeURIComponent(buildInquiryText());
  const url = `https://wa.me/${whatsappNumber}?text=${text}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

const openEmailDraft = () => {
  const subject = encodeURIComponent("New Website Inquiry - Homeopathy Hub");
  const body = encodeURIComponent(buildInquiryText());
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
};

const ensureValidForm = () => {
  if (form.checkValidity()) {
    return true;
  }

  form.reportValidity();
  message.textContent = "Please complete all required fields before submitting.";
  message.style.color = "#a23e35";
  return false;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!ensureValidForm()) {
    return;
  }

  openEmailDraft();
  message.textContent = "Email draft opened. You can also send this inquiry via WhatsApp.";
  message.style.color = "#1f5f45";
});

whatsappButton.addEventListener("click", () => {
  if (!ensureValidForm()) {
    return;
  }

  openWhatsApp();
  message.textContent = "WhatsApp chat opened with your pre-filled inquiry details.";
  message.style.color = "#1f5f45";
});
