
import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { resumeData, socialLinks, profileImage } from './constants';
import Background3D from './components/Background3D';
import Section from './components/Section';
import Chatbot from './components/Chatbot';

// FIX: Declare the global 'lucide' variable to resolve TypeScript errors.
declare var lucide: any;

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href');
  if (targetId && targetId.startsWith('#')) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    lucide.createIcons();
  }, [isOpen]);

  const closeMenuAndScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    handleNavClick(e);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-primary/80 backdrop-blur-sm border-b border-secondary/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="text-2xl font-bold text-accent tracking-wider">RD</a>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} onClick={handleNavClick} className="text-subtle hover:text-light px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">{link.label}</a>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="inline-flex items-center justify-center p-2 rounded-md text-subtle hover:text-light hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <i data-lucide={isOpen ? 'x' : 'menu'} className="block h-6 w-6"></i>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} onClick={closeMenuAndScroll} className="text-subtle hover:text-light block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">{link.label}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => (
  <div className="relative h-screen flex flex-col justify-center items-center text-center text-light px-4">
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      </Canvas>
    </div>
    <div className="relative z-10 animate-fade-in-up">
      <img src={profileImage} alt="Rahul Dodke" className="w-36 h-36 object-cover rounded-full mx-auto mb-6 border-4 border-accent shadow-lg animate-pulse-glow" />
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-light to-accent py-2">
        {resumeData.name}
      </h1>
      <p className="mt-4 text-xl md:text-2xl text-accent font-medium">
        Data Scientist & Software Engineer
      </p>
      <a href="#contact" onClick={handleNavClick} className="mt-8 inline-block bg-accent text-primary font-bold py-3 px-8 rounded-full hover:bg-light transition-all duration-300 transform hover:scale-105">
        Get In Touch
      </a>
      <div className="flex justify-center space-x-6 mt-8">
        {socialLinks.map((link, index) => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-light hover:text-accent transition-transform duration-300 hover:scale-125 animate-float" style={{ animationDelay: `${index * 200}ms` }}>
            <i data-lucide={link.icon} className="w-8 h-8"></i>
          </a>
        ))}
      </div>
    </div>
    <a href="#about" onClick={handleNavClick} className="absolute bottom-10 z-10 text-light animate-bounce">
      <i data-lucide="arrow-down-circle" className="w-10 h-10"></i>
    </a>
  </div>
);

const About: React.FC<{id: string}> = ({ id }) => (
  <Section title="About Me" id={id}>
    <div className="max-w-3xl mx-auto text-center">
      <p className="text-lg text-subtle mb-4 animate-slide-in-left">
        I am a passionate and results-driven Data Scientist & Software Engineer with a strong foundation in machine learning, data analysis, and software development. My journey in tech has been fueled by a relentless curiosity and a desire to solve complex problems by uncovering hidden patterns in data.
      </p>
      <p className="text-lg text-subtle animate-slide-in-right" style={{ animationDelay: '200ms' }}>
        With experience ranging from building predictive models in Python to developing scalable backend systems, I thrive in collaborative environments where I can leverage my skills to build innovative, data-centric solutions. I am constantly exploring new technologies and methodologies to stay at the forefront of the ever-evolving world of data science.
      </p>
    </div>
  </Section>
);

const Experience: React.FC<{id: string}> = ({ id }) => (
  <Section title="Experience" id={id}>
    <div className="relative">
       <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-0.5 bg-secondary"></div>
      <div className="space-y-12">
        {resumeData.experience.map((job, index) => (
          <div key={index} className={`relative pl-12 md:pl-0 opacity-0 ${index % 2 === 0 ? 'md:mr-auto animate-slide-in-left' : 'md:ml-auto animate-slide-in-right'}`} style={{ animationDelay: `${index * 150}ms` }}>
             <div className="absolute left-4 top-1 -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-primary md:left-1/2"></div>
             <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto md:text-right md:pl-12'}`}>
                <div className={`bg-secondary p-6 rounded-lg shadow-lg ${index % 2 !== 0 ? 'md:text-left' : ''}`}>
                  <p className="text-accent font-semibold">{job.date}</p>
                  <p className="text-sm text-subtle mb-2">{job.location}</p>
                  <h3 className="text-xl font-bold text-light">{job.role} - <span className="font-medium">{job.company}</span></h3>
                  <ul className="mt-2 list-disc list-inside text-subtle space-y-2 text-left">
                    {job.description.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const Skills: React.FC<{id: string}> = ({ id }) => (
  <Section title="Technical Skills" id={id}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {resumeData.skills.map((skillCategory, index) => (
        <div key={index} className="bg-secondary p-6 rounded-lg shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
          <h3 className="text-xl font-bold text-accent mb-4">{skillCategory.category}</h3>
          <div className="flex flex-wrap gap-2">
            {skillCategory.items.map((skill, i) => (
              <span key={i} className="bg-primary text-light text-sm font-medium px-3 py-1 rounded-full opacity-0 animate-fade-in-up" style={{ animationDelay: `${(index * 150) + (i * 100)}ms` }}>{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const Projects: React.FC<{id: string}> = ({ id }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    resumeData.projects.forEach(project => {
      project.tech.forEach(t => techSet.add(t));
    });
    return ['All', ...Array.from(techSet).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return resumeData.projects;
    }
    return resumeData.projects.filter(project =>
      project.tech.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <Section title="Projects" id={id}>
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
        {allTechs.map(tech => (
          <button
            key={tech}
            onClick={() => setActiveFilter(tech)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              activeFilter === tech
                ? 'bg-accent text-primary shadow-lg shadow-accent/50'
                : 'bg-secondary text-subtle hover:bg-accent/50 hover:text-light'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={activeFilter}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.name}
            className="bg-secondary rounded-lg shadow-lg flex flex-col transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-accent/50 hover:shadow-accent/20 animate-fade-in-up overflow-hidden"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <img src={project.imageUrl} alt={project.name} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-light">{project.name}</h3>
              <p className="text-accent text-sm font-medium mb-4">{project.tech.join(', ')}</p>
              <ul className="list-disc list-inside text-subtle space-y-2 flex-grow">
                {project.description.map((point, i) => <li key={i}>{point}</li>)}
              </ul>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="mt-4 text-accent font-semibold inline-flex items-center gap-2 hover:underline self-start">
                View Repository <i data-lucide="github" className="w-4 h-4"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const EducationAndCerts: React.FC<{id: string}> = ({ id }) => (
   <Section title="Education & Certifications" id={id}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold text-accent mb-6">Education</h3>
              {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-6 bg-secondary p-4 rounded-lg opacity-0 animate-fade-in-up" style={{animationDelay: `${100 + index * 150}ms`}}>
                      <h4 className="text-xl font-semibold text-light">{edu.degree}</h4>
                      <p className="text-subtle">{edu.institution}</p>
                      <p className="text-subtle">{edu.date}</p>
                      <p className="text-subtle">{edu.score}</p>
                  </div>
              ))}
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '150ms' }}>
               <h3 className="text-2xl font-bold text-accent mb-6">Certifications</h3>
               {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="mb-6 bg-secondary p-4 rounded-lg opacity-0 animate-fade-in-up" style={{animationDelay: `${250 + index * 150}ms`}}>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-light hover:underline inline-flex items-center gap-2">{cert.name} <i data-lucide="link" className="w-4 h-4"></i></a>
                      <p className="text-subtle">{cert.date}</p>
                  </div>
               ))}
               <h3 className="text-2xl font-bold text-accent mb-6 mt-8">Achievements</h3>
               <div className="bg-secondary p-4 rounded-lg opacity-0 animate-fade-in-up" style={{animationDelay: '550ms'}}>
                {resumeData.achievements.map((ach, index) => (
                    <p key={index} className="text-light flex items-center gap-2"><i data-lucide="award" className="text-accent w-5 h-5 flex-shrink-0"></i> {ach}</p>
                ))}
               </div>
          </div>
      </div>
   </Section>
);

const Contact: React.FC<{id: string}> = ({ id }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (status === 'success') {
      lucide.createIcons();
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setStatus('loading');
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
        console.log('Form submitted:', formData);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset status after a few seconds
        setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };
  
  return (
    <Section title="Get In Touch" id={id}>
      <div className="max-w-2xl mx-auto bg-secondary p-8 rounded-lg shadow-lg animate-fade-in-up">
        {status === 'success' ? (
          <div className="text-center p-8 bg-primary rounded-lg animate-subtle-fade-in">
              <i data-lucide="check-circle" className="w-16 h-16 text-accent mx-auto mb-4"></i>
              <h3 className="text-2xl font-bold text-light">Message Sent!</h3>
              <p className="text-subtle mt-2">Thank you for reaching out. I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-subtle mb-2">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full bg-primary text-light px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 ${errors.name ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-accent'}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                {errors.name && <p id="name-error" className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-subtle mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full bg-primary text-light px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 ${errors.email ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-accent'}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                {errors.email && <p id="email-error" className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-subtle mb-2">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className={`w-full bg-primary text-light px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 ${errors.message ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-accent'}`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined}></textarea>
              {errors.message && <p id="message-error" className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>
            <div className="text-center">
              <button type="submit" disabled={status === 'loading'} className="bg-accent text-primary font-bold py-3 px-8 rounded-full hover:bg-light transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait inline-flex items-center justify-center gap-2">
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i data-lucide="send" className="w-5 h-5"></i>
                  </>
                )}
              </button>
            </div>
             {status === 'error' && <p className="text-red-400 text-center mt-4">Something went wrong. Please try again later.</p>}
          </form>
        )}
      </div>
    </Section>
  );
};


const Footer: React.FC = () => (
  <footer className="bg-secondary py-8 px-4 text-center border-t border-primary/50">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-center space-x-6 mb-4">
        {socialLinks.map((link) => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-accent transition-transform duration-300 hover:scale-125">
            <i data-lucide={link.icon} className="w-6 h-6"></i>
          </a>
        ))}
      </div>
      <p className="text-subtle">&copy; {new Date().getFullYear()} Rahul Dodke. All Rights Reserved.</p>
    </div>
  </footer>
);

const App: React.FC = () => {
   useEffect(() => {
    // A single call to createIcons on mount, and then individual components will handle their dynamic icons.
    const timer = setTimeout(() => lucide.createIcons(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-primary text-light font-sans">
      <Navbar />
      <header>
        <Hero />
      </header>
      <main>
        <About id="about" />
        <Experience id="experience" />
        <Skills id="skills" />
        <Projects id="projects" />
        <EducationAndCerts id="education" />
        <Contact id="contact" />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;
