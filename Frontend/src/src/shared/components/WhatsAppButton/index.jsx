export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi, I would like to know more about Kini. Please share more information about your courses, programs, and services."
  );

  return (
    <a
      href={`https://wa.me/919000198239?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-transform hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}