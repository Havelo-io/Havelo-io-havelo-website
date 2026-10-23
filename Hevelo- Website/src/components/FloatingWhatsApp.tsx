import { WhatsAppIcon } from './Icons'

const WHATSAPP_URL = 'https://wa.me/94705766539'

export default function FloatingWhatsApp() {
  return (
    <a
      className="whatsapp-float"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HAVELO on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  )
}
