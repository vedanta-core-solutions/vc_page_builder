'use client';

export default function NfcVisitingCard({ data }) {
  if (!data) return null;

  const {
    fullName,
    businessName,
    businessType,
    phone,
    whatsapp,
    email,
    website,
    address,
    socialLinks = {}
  } = data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full bg-surface shadow-card rounded-2xl p-6 border border-primary/20">
        
        {/* TOP SECTION — Identity */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text">{fullName}</h1>
          <p className="text-lg text-text/80">{businessName}</p>
          <p className="text-sm text-text/60">{businessType}</p>
        </div>

        {/* MIDDLE SECTION — Contact */}
        <div className="space-y-3 mb-6">
          {phone && (
            <a href={`tel:${phone}`} className="block text-primary font-medium">
              📞 {phone}
            </a>
          )}

          {whatsapp && (
            <a href={`https://wa.me/${whatsapp}`} className="block text-primary font-medium">
              💬 WhatsApp
            </a>
          )}

          {email && (
            <a href={`mailto:${email}`} className="block text-primary font-medium">
              ✉️ {email}
            </a>
          )}

          {website && (
            <a href={website} target="_blank" className="block text-primary font-medium">
              🌐 Website
            </a>
          )}
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex space-x-4 mb-6">
          {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank">📸</a>}
          {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank">📘</a>}
          {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank">💼</a>}
        </div>

        {/* ADDRESS */}
        {address && (
          <div className="text-center text-sm text-text/60">
            {address}
          </div>
        )}
      </div>
    </div>
  );
}
