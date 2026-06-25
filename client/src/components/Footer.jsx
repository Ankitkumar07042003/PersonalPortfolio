import './Footer.css';

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ankit-kumar-gupta-0149a125b',
    icon: '💼',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Ankitkumar07042003',
    icon: '🐙',
  },
  {
    label: 'Email',
    href: 'mailto:ankitraj829206@gmail.com',
    icon: '📧',
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow footer__glow--one"></div>
      <div className="footer__glow footer__glow--two"></div>

      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <img
                src="/logo.jpeg"
                alt="Ankit Kumar"
                className="footer__logo"
              />
            </div>

            <h3 className="footer__title">
              Ankit Kumar
            </h3>

            <p className="footer__tagline">
              Building scalable software, one commit at a time.
            </p>
          </div>

          <div className="footer__socials">
            <p className="footer__nav-title">
              Connect With Me
            </p>

            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                {...(!href.startsWith('mailto:')
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {})}
                className="footer__social-link"
              >
                <span>{icon}</span>
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__divider"></div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()}
            {' '}
            <span className="footer__name">
              Ankit Kumar
            </span>
            . All rights reserved.
          </p>

          <p className="footer__loc">
            📍 Ranchi, Jharkhand, India · Open to opportunities
          </p>
        </div>
      </div>
    </footer>
  );
}