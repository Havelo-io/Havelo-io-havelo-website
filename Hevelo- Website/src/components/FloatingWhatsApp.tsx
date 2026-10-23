import { WhatsAppIcon } from './Icons'
import { SITE } from '../config/site'

export default function FloatingWhatsApp() {
  return (
    <a
      className="whatsapp-float"
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HAVELO on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  )
}
