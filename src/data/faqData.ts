import { FAQItem, FAQCategory } from '../types';

export const FAQ_CATEGORIES: { id: FAQCategory; label: string; count: number; icon: string }[] = [
  { id: 'getting-started', label: 'Getting Started', count: 5, icon: 'Compass' },
  { id: 'care-team', label: 'Our Care Team', count: 4, icon: 'Users' },
  { id: 'pricing-booking', label: 'Pricing & Booking', count: 4, icon: 'CreditCard' },
  { id: 'privacy-safety', label: 'Privacy & Safety', count: 2, icon: 'ShieldCheck' },
  { id: 'general', label: 'General', count: 3, icon: 'HelpCircle' },
];

export const FAQ_ITEMS: FAQItem[] = [
  // Getting Started
  {
    id: 'gs-1',
    category: 'getting-started',
    question: 'What is MindWell?',
    answer: 'MindWell is an intelligent mental wellness and somatic yoga companion built to provide immediate, confidential, and empathetic support. Combining state-of-the-art conversational AI with clinical oversight and ancient yogic science, MindWell helps you navigate everyday stress, process anxiety, cultivate emotional resilience, and seamlessly escalate to board-certified human clinicians whenever deeper intervention is needed.',
    tags: ['Overview', 'Basics', 'AI & Human Care'],
    readTime: '1 min read'
  },
  {
    id: 'gs-2',
    category: 'getting-started',
    question: 'How do I get started?',
    answer: 'Getting started is effortless. You can begin right here on the web or tap the floating chat button to open our intelligent companion. Choose your current emotional state, set your primary goals (such as stress relief, better sleep, or mindfulness), and MindWell will customize daily micro-practices and grounding somatic exercises tailored to your schedule.',
    tags: ['Onboarding', 'Setup'],
    readTime: '1 min read'
  },
  {
    id: 'gs-3',
    category: 'getting-started',
    question: 'Do I need to download a separate mobile app?',
    answer: 'No app download is required! MindWell functions as a lightweight, lightning-fast Progressive Web App (PWA) that you can bookmark or add directly to your home screen. Additionally, you can interact with MindWell natively through encrypted WhatsApp messaging for round-the-clock check-ins without eating up your phone storage.',
    tags: ['Mobile', 'PWA', 'WhatsApp'],
    readTime: '1 min read'
  },
  {
    id: 'gs-4',
    category: 'getting-started',
    question: 'How does the AI screening work?',
    answer: 'Our conversational AI employs validated clinical screening frameworks (including GAD-7 for anxiety and PHQ-9 for mood patterns) translated into warm, conversational dialogues. Through subtle linguistic markers and gentle self-reported prompts, MindWell gauges your emotional baseline and recommends appropriate somatic postures, breathing cycles, or telehealth consultations.',
    tags: ['Clinical', 'Screening', 'AI'],
    readTime: '2 min read'
  },
  {
    id: 'gs-5',
    category: 'getting-started',
    question: 'What languages does MindWell support?',
    answer: 'MindWell natively understands and converses in over 15 global languages—including English, Spanish, Hindi, French, German, Mandarin, and Portuguese. Our multilingual models maintain cultural nuance, empathetic tone, and localized idiomatic comfort so you can express your feelings naturally.',
    tags: ['Languages', 'Accessibility'],
    readTime: '1 min read'
  },

  // Our Care Team
  {
    id: 'ct-1',
    category: 'care-team',
    question: 'What credentials do your practitioners hold?',
    answer: 'Every human practitioner in our network is thoroughly vetted, licensed, and insured. Our clinical team consists of Board-Certified Psychiatrists (MD / DO), Licensed Clinical Psychologists (PhD / PsyD), Licensed Marriage & Family Therapists (LMFT), and certified Yoga Therapists accredited by the International Association of Yoga Therapists (IAYT). All professionals have a minimum of 5+ years of active clinical experience.',
    tags: ['Credentials', 'Licensing', 'Trust'],
    readTime: '2 min read'
  },
  {
    id: 'ct-2',
    category: 'care-team',
    question: 'Psychiatrist vs. Psychologist: What is the difference?',
    answer: 'Psychiatrists are licensed medical doctors (MD/DO) who specialize in mental health, neurobiology, and psychiatric evaluation; they are authorized to diagnose conditions, order medical labs, and prescribe medication. Psychologists (PhD/PsyD) and licensed therapists specialize in psychotherapy, Cognitive Behavioral Therapy (CBT), somatic experiencing, and emotional regulation. MindWell offers both, allowing you to choose the care modality that best aligns with your healing journey.',
    tags: ['Psychiatry', 'Therapy', 'Guide'],
    readTime: '2 min read'
  },
  {
    id: 'ct-3',
    category: 'care-team',
    question: 'Can MindWell practitioners prescribe medication?',
    answer: 'Yes. When you schedule a 1-on-1 telehealth consultation with one of our licensed Psychiatrists, they can conduct a comprehensive psychiatric evaluation and prescribe or adjust FDA-approved psychiatric medications when clinically appropriate and legally permitted in your jurisdiction. Controlled substances remain strictly regulated under local tele-prescribing statutes.',
    tags: ['Medication', 'Prescription', 'Psychiatry'],
    readTime: '2 min read'
  },
  {
    id: 'ct-4',
    category: 'care-team',
    question: 'How do I choose the right specialist for me?',
    answer: 'MindWell makes finding the right clinician simple. In our Dashboard, you can filter providers by clinical focus (e.g. panic disorders, grief, burn-out, ADHD, trauma-informed care), therapeutic style, spoken languages, and scheduling availability. Alternatively, our AI companion can guide a quick 2-minute matching assessment to pair you with specialists matching your unique preferences.',
    tags: ['Matching', 'Therapists'],
    readTime: '1 min read'
  },

  // Pricing & Booking
  {
    id: 'pb-1',
    category: 'pricing-booking',
    question: 'How much do consultations cost?',
    answer: 'We believe premium mental health care should be predictable and transparent. The MindWell AI companion, breathing exercises, and yoga posture library are 100% free forever. If you choose to book private telehealth consultations: a 45-minute psychotherapy session is $45 (or local equivalent), and comprehensive 60-minute psychiatric evaluations are $95. We never charge recurring subscription lock-ins.',
    tags: ['Pricing', 'Transparency', 'No Subscriptions'],
    readTime: '1 min read'
  },
  {
    id: 'pb-2',
    category: 'pricing-booking',
    question: 'How do I book a consultation?',
    answer: 'Booking takes under two minutes. Navigate to the Consultations section in your Dashboard or tell the AI chatbot: "I want to speak with a therapist." Choose your specialist, select an open slot from their live calendar, and confirm with one-click payment. You will immediately receive calendar invites, SMS/WhatsApp reminders, and a secure telehealth video link.',
    tags: ['Booking', 'Calendar'],
    readTime: '1 min read'
  },
  {
    id: 'pb-3',
    category: 'pricing-booking',
    question: 'Do you offer student or hardship discounts?',
    answer: 'Yes! We are committed to barrier-free mental health support. Enrolled university and college students receive a 30% reduction on all clinical therapy sessions upon verifying a valid .edu email address. We also reserve a designated quota of sliding-scale community subsidized sessions each month for individuals facing financial hardship.',
    tags: ['Students', 'Discounts', 'Equity'],
    readTime: '1 min read'
  },
  {
    id: 'pb-4',
    category: 'pricing-booking',
    question: 'What happens after my consultation?',
    answer: 'Following your session, your therapist uploads a personalized Care Summary to your encrypted dashboard. This includes key takeaways, recommended somatic yoga poses to practice, targeted breathing cycles, and optional homework. Your AI companion also checks in with you 24 hours later to help you ground the insights gained during your conversation.',
    tags: ['Aftercare', 'Follow-up'],
    readTime: '2 min read'
  },

  // Privacy & Safety
  {
    id: 'ps-1',
    category: 'privacy-safety',
    question: 'Is my data and conversation confidential?',
    answer: 'Your privacy is sacred to us. MindWell is fully compliant with HIPAA (Health Insurance Portability and Accountability Act), GDPR, and SOC-2 Type II standards. All chat messages, mood journals, and personal health data are safeguarded with AES-256 encryption at rest and TLS 1.3 in transit. We strictly guarantee that your personal reflections are never sold to data brokers or used to train public generative models.',
    tags: ['Security', 'HIPAA', 'Encryption'],
    readTime: '2 min read'
  },
  {
    id: 'ps-2',
    category: 'privacy-safety',
    question: 'How do you handle crisis situations and emergencies?',
    answer: 'MindWell is designed for preventative mental wellness, daily regulation, and routine clinical care—it is NOT an emergency crisis intervention service. If our safety system detects expressions of acute self-harm, suicidal ideation, or severe crisis, the conversation immediately surfaces localized emergency hotlines (such as the 988 Suicide & Crisis Lifeline in North America or 112 in Europe), crisis text lines, and direct emergency routing prompts.',
    tags: ['Crisis', 'Emergency Protocol', 'Safety'],
    readTime: '2 min read'
  },

  // General
  {
    id: 'gen-1',
    category: 'general',
    question: 'How is MindWell different from other wellness apps?',
    answer: 'Unlike generic meditation apps that offer one-way audio tracks, MindWell creates an interactive, empathetic feedback loop. By combining real-time AI conversation with embodied somatic yoga science, WhatsApp immediacy, and seamless hand-off to licensed human doctors, MindWell bridges the gap between passive mindfulness and comprehensive clinical support.',
    tags: ['Differentiation', 'Holistic Care'],
    readTime: '2 min read'
  },
  {
    id: 'gen-2',
    category: 'general',
    question: 'Who created MindWell?',
    answer: 'MindWell was co-founded by an interdisciplinary collective of clinical neuropsychologists, certified Iyengar and Ashtanga yoga masters, and patient-first biomedical engineers. Our mission is to make evidence-based emotional regulation and somatic release as accessible and natural as sending a message to a trusted friend.',
    tags: ['Founders', 'Mission'],
    readTime: '1 min read'
  },
  {
    id: 'gen-3',
    category: 'general',
    question: 'How can I get in touch with customer support?',
    answer: 'Our dedicated support team is available 24/7. You can reach out directly by emailing support@mindwell.care, via our WhatsApp support hotline at +1 (800) 555-WELL, or by clicking the "Chat with us" button in our footer. Typical response times are under 15 minutes.',
    tags: ['Support', 'Contact'],
    readTime: '1 min read'
  }
];
