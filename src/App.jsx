import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { z } from 'zod';
import {
  CloudQueueRounded,
  CodeRounded,
  DownloadRounded,
  GitHub,
  LinkedIn,
  MailOutlineRounded,
  NorthEastRounded,
  PhoneRounded,
  RocketLaunchRounded,
  StorageRounded,
  WhatsApp,
} from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';
import profilePhoto from './assets/MyPic.jpg';
import cvFile from './assets/CV.pdf';
import { dismiss, error as showError, loading as showLoading, success } from './utils/Toastify';
import './Styles/global.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Aadhil-official',
    icon: GitHub,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/mohamed-aadhil-716645248',
    icon: LinkedIn,
  },
  {
    label: 'Email',
    href: 'mailto:mohamedaadhil2446504@gmail.com',
    icon: MailOutlineRounded,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/+94750213273',
    icon: WhatsApp,
  },
];

const metrics = [
  {
    value: '06',
    label: 'Selected builds spanning internal tools, e-commerce, booking, hardware, and portfolio work.',
  },
  {
    value: 'Full-stack',
    label: 'React and React Native interfaces paired with Spring Boot APIs, auth, and business logic.',
  },
  {
    value: 'UOM',
    label: 'Currently reading Information Technology and Management at the University of Moratuwa.',
  },
];

const capabilities = [
  {
    title: 'Interface Engineering',
    text: 'Responsive frontends with React and React Native, built for clarity, speed, and durable component structure.',
    icon: CodeRounded,
  },
  {
    title: 'Backend Systems',
    text: 'Spring Boot services, JWT-secured flows, and maintainable business logic that can support real operations.',
    icon: CloudQueueRounded,
  },
  {
    title: 'Data And Integrations',
    text: 'MySQL, PostgreSQL, Firebase, SMTP workflows, and the operational data plumbing that keeps products reliable.',
    icon: StorageRounded,
  },
  {
    title: 'Delivery Focus',
    text: 'I like shipping products that solve workflow problems clearly, from public booking apps to internal management tools.',
    icon: RocketLaunchRounded,
  },
];

const stackGroups = [
  {
    title: 'Frontend',
    items: ['React', 'React Native', 'JavaScript', 'HTML', 'CSS', 'Material UI'],
  },
  {
    title: 'Backend',
    items: ['Spring Boot', 'REST APIs', 'JWT Security', 'SMTP', 'Microservices'],
  },
  {
    title: 'Data And Tools',
    items: ['MySQL', 'PostgreSQL', 'Firebase', 'Docker', 'AWS', 'Postman', 'Git'],
  },
];

const projects = [
  {
    title: 'Arctic Management System',
    status: 'Internal CMS',
    role: 'Built to manage company activity data and customer support workflows through a centralized web application.',
    summary:
      'A CMS-focused internal platform for organizing raw operational data, job activity, and service support processes across the business.',
    stack: ['Spring Boot', 'React', 'MongoDB'],
    href: 'https://github.com/orgs/sftreprjct/repositories',
  },
  {
    title: 'Metro Mobiles',
    status: 'E-commerce',
    role: 'Contributed backend delivery for order and inventory services inside a microservices-based online electronics store.',
    summary:
      'Built around scalable order processing, stock tracking, and service-to-service integration for a smoother digital shopping flow.',
    stack: ['Spring Boot', 'React', 'MySQL'],
    href: 'https://github.com/orgs/Metro-Mobiles/repositories',
  },
  {
    title: 'Hotel Room Booking',
    status: 'Ongoing',
    role: 'Developing a public booking application with REST-driven room management and a smoother reservation experience.',
    summary:
      'Focused on online booking flows, hotel data management, and a cleaner customer-facing frontend backed by structured API design.',
    stack: ['Spring Boot', 'React', 'PostgreSQL'],
    href: 'https://github.com/orgs/HtlBooking/repositories',
  },
  {
    title: 'Smart Laundry System',
    status: 'Full-stack',
    role: 'Owned both frontend and backend delivery for order tracking, payments, notifications, and service scheduling.',
    summary:
      'A cloud-based laundry management platform covering authentication, operational automation, invoicing, and customer convenience.',
    stack: ['Spring Boot', 'React Native', 'MySQL'],
    href: 'https://github.com/orgs/Smart-Laundry-System/repositories',
  },
  {
    title: 'Portfolio Platform',
    status: 'Personal Brand',
    role: 'Designed and implemented a structured portfolio experience to present projects, skills, and professional direction.',
    summary:
      'A responsive personal site focused on stronger presentation, clear navigation, and maintainable component-driven frontend work.',
    stack: ['React', 'Material UI', 'EmailJS'],
    href: 'https://github.com/Aadhil-official/Aadhil.github.io',
  },
  {
    title: 'Adjustable P10 LED Display Controller',
    status: 'Hardware',
    role: 'Built an ESP32-based controller for configurable text display over Wi-Fi, Ethernet, and SD card inputs.',
    summary:
      'The controller supports adjustable display counts, font control, and speed tuning so customers can manage signage more directly.',
    stack: ['ESP32', 'C', 'EasyEDA', 'Proteus', 'Blender'],
    href: 'https://github.com/Aadhil-official/L2S4-Sofware-Project-Back-end.git',
  },
];

const contactCards = [
  {
    label: 'Email',
    value: 'mohamedaadhil2446504@gmail.com',
    href: 'mailto:mohamedaadhil2446504@gmail.com',
    icon: MailOutlineRounded,
  },
  {
    label: 'Phone',
    value: '(+94) 750213273',
    href: 'tel:+94750213273',
    icon: PhoneRounded,
  },
  {
    label: 'LinkedIn',
    value: 'mohamed-aadhil-716645248',
    href: 'https://linkedin.com/in/mohamed-aadhil-716645248',
    icon: LinkedIn,
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

const formSchema = z.object({
  user_name: z.string().trim().min(2, 'Enter your name.'),
  user_email: z.string().trim().email('Enter a valid email address.'),
  message: z.string().trim().min(24, 'Share a short project brief so I know what you need.'),
});

function renderSectionIntro(eyebrow, title, copy, align = 'left') {
  return (
    <div className={`section-intro section-intro--${align}`}>
      <p className="section-intro__eyebrow">{eyebrow}</p>
      <h2 className="section-intro__title">{title}</h2>
      {copy ? <p className="section-intro__copy">{copy}</p> : null}
    </div>
  );
}

function App() {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationResult = formSchema.safeParse(formState);

    if (!validationResult.success) {
      showError(validationResult.error.issues[0]?.message || 'Check the form and try again.');
      return;
    }

    if (!formRef.current) {
      showError('The contact form is not ready yet. Use email or LinkedIn instead.');
      return;
    }

    const loadingToast = showLoading('Sending message...');
    setIsSubmitting(true);

    try {
      await emailjs.sendForm('service_ddrrakr', 'template_who3p09', formRef.current, {
        publicKey: 'QDLQ7f9CtTAS1Jhz1',
      });

      dismiss(loadingToast);
      success('Message sent successfully.');
      setFormState({
        user_name: '',
        user_email: '',
        message: '',
      });
    } catch {
      dismiss(loadingToast);
      showError('Message failed. Use email or LinkedIn if the form does not go through.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3200 }} />
      <div className="portfolio-app">
        <header className="site-header">
          <div className="container site-header__inner">
            <a className="brand" href="#top">
              <span className="brand__mark">A</span>
              <span className="brand__text">
                Aadhil
                <small>Full-stack engineer</small>
              </span>
            </a>

            <nav className="site-nav" aria-label="Primary">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>

            <a className="header-cta" href="#contact">
              Start a project
              <NorthEastRounded fontSize="small" />
            </a>
          </div>
        </header>

        <main>
          <section className="hero" id="top">
            <div className="container hero__grid">
              <motion.div className="hero__copy" {...reveal}>
                <p className="hero__eyebrow">Full-stack portfolio</p>
                <h1 className="hero__title">Web, mobile, and backend systems built to ship cleanly.</h1>
                <p className="hero__lede">
                  I&apos;m Aadhil, a developer focused on responsive interfaces, secure APIs, and practical products that
                  stay maintainable after launch.
                </p>

                <div className="hero__actions">
                  <a className="button button--primary" href={cvFile} download>
                    <DownloadRounded fontSize="small" />
                    Download CV
                  </a>
                  <a className="button button--secondary" href="#projects">
                    Selected work
                  </a>
                </div>

                <div className="hero__socials" aria-label="Professional links">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a key={href} className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={label}>
                      <Icon fontSize="small" />
                    </a>
                  ))}
                </div>

                <div className="hero__metrics">
                  {metrics.map((metric) => (
                    <article key={metric.value} className="metric-card">
                      <strong>{metric.value}</strong>
                      <p>{metric.label}</p>
                    </article>
                  ))}
                </div>
              </motion.div>

              <motion.div className="hero__visual" {...reveal}>
                <div className="hero__frame">
                  <div className="hero__badge hero__badge--top">Available for product work, client builds, and portfolio-grade frontend delivery.</div>
                  <img className="hero__photo" src={profilePhoto} alt="Portrait of Aadhil" />
                  <div className="hero__badge hero__badge--bottom">
                    <span>Current track</span>
                    <strong>Information Technology and Management at UOM</strong>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="container hero__rail">
              {['React', 'React Native', 'Spring Boot', 'MySQL', 'PostgreSQL', 'Firebase', 'Docker', 'AWS'].map(
                (item) => (
                  <span key={item}>{item}</span>
                ),
              )}
            </div>
          </section>

          <section className="section section--light" id="about">
            <div className="container">
              {renderSectionIntro(
                'About',
                'Reliable software, clear interfaces, and backend depth where it matters.',
                'My work leans toward products that have real workflows behind them: management systems, e-commerce, booking flows, and service operations.',
              )}

              <div className="about-layout">
                <motion.div className="about-copy" {...reveal}>
                  <p>
                    Hi there. I build responsive web and mobile experiences with React and React Native, aiming for
                    fast interaction, clean structure, and polished delivery across different screen sizes.
                  </p>
                  <p>
                    On the backend, I work with Spring Boot, relational databases, Firebase, SMTP integrations, and
                    JWT-based security. I care about maintainable architecture, useful APIs, and features that make
                    sense once a product hits real usage.
                  </p>
                  <p>
                    The goal is straightforward: ship software that looks considered on the surface and stays reliable
                    underneath it.
                  </p>
                </motion.div>

                <motion.div className="fact-grid" {...reveal}>
                  <article className="fact-card">
                    <span>Education</span>
                    <strong>Information Technology and Management</strong>
                    <p>University of Moratuwa</p>
                  </article>
                  <article className="fact-card">
                    <span>Focus</span>
                    <strong>Frontend polish with backend structure</strong>
                    <p>Web apps, mobile flows, operational systems, and data-heavy interfaces.</p>
                  </article>
                  <article className="fact-card">
                    <span>Working style</span>
                    <strong>Clean delivery over visual noise</strong>
                    <p>Readable components, practical UX, and software that remains maintainable.</p>
                  </article>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="section section--dark" id="stack">
            <div className="container">
              {renderSectionIntro(
                'Stack',
                'Modern tools chosen for product delivery, not decoration.',
                'The stack is centered on frontend responsiveness, backend reliability, and clean operational data flow.',
              )}

              <div className="stack-grid">
                {stackGroups.map((group) => (
                  <motion.article key={group.title} className="stack-card" {...reveal}>
                    <h3>{group.title}</h3>
                    <div className="stack-pills">
                      {group.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="capability-grid">
                {capabilities.map(({ title, text, icon: Icon }) => (
                  <motion.article key={title} className="capability-card" {...reveal}>
                    <Icon className="capability-card__icon" />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="section section--light" id="projects">
            <div className="container">
              {renderSectionIntro(
                'Selected Work',
                'Projects shaped by operations, customer workflows, and practical product constraints.',
                'These are the builds that best represent how I work across UI, backend structure, integrations, and delivery.',
              )}

              <div className="project-grid">
                {projects.map((project) => (
                  <motion.article key={project.title} className="project-card" {...reveal}>
                    <div className="project-card__top">
                      <span>{project.status}</span>
                      <a href={project.href} target="_blank" rel="noreferrer">
                        Repository
                        <NorthEastRounded fontSize="inherit" />
                      </a>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="project-card__role">{project.role}</p>
                    <p className="project-card__summary">{project.summary}</p>
                    <div className="project-card__stack">
                      {project.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="section section--accent" id="contact">
            <div className="container contact-grid">
              <motion.div {...reveal}>
                {renderSectionIntro(
                  'Contact',
                  'Have a project, upgrade, or product idea that needs serious implementation?',
                  'The quickest routes are email, LinkedIn, and WhatsApp, but the form is here if you want to send a brief directly.',
                )}

                <div className="contact-card-grid">
                  {contactCards.map(({ label, value, href, icon: Icon }) => (
                    <a key={label} className="contact-card" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      <Icon />
                      <div>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.form ref={formRef} className="contact-form" onSubmit={handleSubmit} {...reveal}>
                <label htmlFor="user_name">
                  Name
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    value={formState.user_name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>

                <label htmlFor="user_email">
                  Email
                  <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    value={formState.user_email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>

                <label htmlFor="message">
                  Project brief
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tell me what you are building, what needs to change, and what stack you are working with."
                  />
                </label>

                <button className="button button--primary button--submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send message'}
                  <NorthEastRounded fontSize="small" />
                </button>
              </motion.form>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container site-footer__inner">
            <p>
              Aadhil
              <span>Full-stack engineer building with React, Spring Boot, and structured product thinking.</span>
            </p>

            <div className="site-footer__links">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon fontSize="small" />
                </a>
              ))}
            </div>

            <small>{currentYear} Aadhil. All rights reserved.</small>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
