import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  name = 'Chethan L | Senior Software Engineer';
  location = 'Bengaluru, India';
  email = 'chethanl3079@gmail.com';
  phone = '+91-9663308432';
  summary = 'Senior Full-Stack Engineer with 7+ years building high-performance enterprise systems at Siemens. Specialized in Node.js, Java Spring Boot, and AWS microservices architecture. Reduced query times by 60%, maintained 99.9% uptime across production apps, and delivered 15+ scalable solutions serving thousands of users.';
  resumeUrl = 'ChethanL_FullStack_Developer_7Years_Experience.pdf';
  linkedInUrl = 'https://www.linkedin.com/in/chethan-l-fullstack-developer/';
  heroTitle = { line1: 'Full-Stack', line2: 'Developer', line3: 'Cloud & Microservices Expert' };
  availabilityBadge = 'Available for New Opportunities';
  sections = {
    techStack: {
      badge: 'Stack Compatibility',
      icon: '🎯',
      title: 'Perfect Fit For Teams Using',
      subtitle: "If your tech stack matches below, let's talk - I can contribute from day one",
      cta: { title: '🔥 Ideal for High-Traffic, Scalable Systems', subtitle: 'Startups to enterprise - I build for scale from day one' }
    },
    skills: {
      badge: 'Expertise',
      title: 'Technical Arsenal',
      subtitle: 'A comprehensive stack designed for modern, scalable, and high-performance applications.'
    },
    experience: {
      badge: 'Experience',
      title: 'Professional Journey'
    },
    projects: {
      badge: 'Portfolio',
      title: 'Featured Projects',
      subtitle: 'Enterprise-scale applications built with modern architecture'
    },
    footer: {
      title: "Let's Build the Future",
      subtitle: 'Have a complex technical challenge? Let\'s discuss how my 7 years of full-stack expertise can help your team scale.',
      copyright: '© 2026 {{name}} • Architected with Precision'
    }
  };
  mobileMenuOpen = false;
  showScrollTop = false;
  stats = [
    { icon: '💼', label: 'Years Experience', value: '7+' },
    // { icon: '🚀', label: 'REST APIs Delivered', value: '50+' },
    { icon: '⚡', label: 'System Uptime', value: '99.9%' },
    { icon: '☁️', label: 'Cloud Services', value: 'AWS' },
  ];

  skills = [
    { category: '🎨 Frontend', items: ['Angular', 'TypeScript', 'JavaScript', 'Karma/Jasmine', 'Tailwind CSS'] },
    { category: '⚙️ Backend & APIs', items: ['Node.js', 'Java', 'Spring Boot', 'NestJS', 'REST APIs', 'Mocha & chai', 'JUnit & Mockito'] },
    { category: '🗄️ Databases', items: ['PostgreSQL', 'SQL', 'MongoDB'] },
    { category: '☁️ Cloud & DevOps', items: ['AWS Lambda', 'EC2', 'RDS', 'ECR', 'EKS', 'Docker', 'Kubernetes', 'Step Functions', 'S3'] },
    { category: '📨 Message Queues', items: ['Kafka', 'RabbitMQ'] },
    { category: '🛠️ Tools & Collaboration', items: ['Git', 'Jira', 'Postman', 'SwaggerAPI'] }
  ];

  techStackMatch = [
    {
      icon: '⚙️',
      title: 'Backend',
      bgColor: 'bg-green-50',
      items: ['Node.js & Express', 'Java Spring boot', 'NestJS & TypeScript', 'REST APIs']
    },
    {
      icon: '🎨',
      title: 'Frontend',
      bgColor: 'bg-blue-50',
      items: [ 'Angular & TypeScript', 'Tailwind CSS']
    },
    {
      icon: '☁️',
      title: 'Cloud',
      bgColor: 'bg-orange-50',
      items: ['AWS (EC2, S3, ECR, EKS, Lambda, Step Functions)', 'Docker & Kubernetes', 'CI/CD Pipelines']
    },
    {
      icon: '🗄️',
      title: 'Database',
      bgColor: 'bg-purple-50',
      items: ['PostgreSQL & MySQL', 'MongoDB & Redis']
    },
    {
      icon: '🏗️',
      title: 'Architecture',
      bgColor: 'bg-yellow-50',
      items: ['Microservices', 'Event-Driven Systems', 'Serverless & APIs']
    },
    {
      icon: '🚀',
      title: 'DevOps',
      bgColor: 'bg-red-50',
      items: ['GitHub Actions', 'GitLab CI']
    }
  ];

  experience = [
    {
      company: 'Siemens Technology and Services Pvt. Ltd.',
      role: 'Software Engineer',
      period: 'JULY 2021 - PRESENT',
      products: ['COMPAS (Electrical Products and Sales Domain)', 'DepoFinity (Electric Charger Management and Dispatch Application)'],
      summary: 'Architecting scalable enterprise solutions in microservices architecture, driving innovation through 4x hackathon wins.',
      points: [
        'Architected and delivered 25+ scalable solutions using Node.js, Java, and PostgreSQL in a microservices architecture, collaborating with cross-functional product teams in Agile environments.',
        'Deployed and managed 15+ containerized applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime and scalability.',
        'Built and optimized 30+ serverless workloads using AWS Lambda (with layers) and Step Functions within the Serverless Framework, integrating with API Gateway, CodeBuild, S3, and CodeCommit.',
        'Implemented reliable messaging using RabbitMQ and Apache Kafka for lossless inter-service communication across 10+ microservices.',
        'Defined 20+ KPIs and integrated them into interactive dashboards for real-time monitoring and data-driven decisions.',
        'Developed comprehensive test suites achieving 95%+ code coverage including unit (Node.js: Mocha/Chai), component, and API tests.',
        'Drove code quality via 200+ pull request reviews, improving design and engineering standards across the team.',
        'Optimized performance by refining database queries and code, reduced average query time by 60% and improved load handling by 45% through NFR testing.',
        'Contributed to architecture and design for reliability, scalability, and performance across 5+ new and existing systems.'
      ],
      recognition: '4x Hackathon Winner for innovative product features',
      tech: ['Node.js', 'Java Spring Boot', 'PostgreSQL', 'AWS Lambda', 'Docker', 'Kubernetes', 'RabbitMQ', 'Kafka', 'Mocha/Chai']
    },
    {
      company: 'Teamlease Services Pvt. Ltd.',
      client: 'Siemens Technology and Services Pvt. Ltd.',
      role: 'Software Engineer',
      period: 'APRIL 2019 - JUNE 2021',
      products: ['DepoFinity (Electric Charger Management and Dispatch Application)'],
      summary: 'Developed enterprise-grade EV infrastructure solutions with scalable APIs and high-impact feature delivery.',
      points: [
        'Developed and maintained 8+ enterprise applications using TypeScript, Java Spring Boot, Node.js, and PostgreSQL.',
        'Designed and implemented 15+ scalable RESTful APIs enabling seamless data integration across client applications.',
        'Collaborated in Agile teams of 6-8 developers to prioritize and deliver 40+ high-impact features within sprint timelines while maintaining code quality and stakeholder alignment.'
      ],
      tech: ['TypeScript', 'Java Spring Boot', 'Node.js', 'PostgreSQL', 'REST APIs', 'Agile']
    },
    {
      company: 'Manpower Services Pvt. Ltd.',
      client: 'Siemens Technology and Services Pvt. Ltd.',
      role: 'Software Engineer',
      period: 'OCTOBER 2018 - MARCH 2019',
      products: ['Circuit Breaker (Blockchain-based web application)'],
      summary: 'Pioneered blockchain proof-of-concept for industrial asset tracking using Ethereum and smart contracts.',
      points: [
        'Developed a blockchain proof-of-concept using Ethereum, Solidity, and Node.js, demonstrating feasibility for enterprise use cases with 3+ smart contracts.',
        'Configured a Ganache private blockchain network with 10+ nodes for secure smart contract development and testing.',
        'Integrated MongoDB for off-chain data persistence, managing 5000+ transaction records.',
        'Implemented wallet setup in Brave browser for seamless contract deployment and transaction execution, conducting 100+ test transactions.'
      ],
      tech: ['Ethereum', 'Solidity', 'Node.js', 'MongoDB', 'Blockchain', 'Ganache']
    }
  ];

  projects = [
    {
      role: 'Senior Software Engineer',
      tag: 'Industrial Configurator',
      name: 'COMPAS',
      desc: 'High-performance configuration engine managing global pricing logic for Siemens Electrical products.',
      highlights: ['Microservices Design', 'PostgreSQL Optimization', 'Agile Strategy'],
      metrics: ['Serverless Lambda Layers', 'Zero-Loss Syncing'],
      tech: ['Angular', 'Node.js', 'Java', 'AWS']
    },
    {
      role: 'Software Engineer',
      tag: 'EV Infrastructure',
      name: 'DepoFinity',
      desc: 'Real-time Electric Charger Management and Dispatching Application for global sustainable infrastructure.',
      highlights: ['Serverless (AWS Lambda)', 'Step Functions', 'Real-time Integration'],
      metrics: ['-40% Query Latency', 'NFR Load Validated'],
      tech: ['TypeScript', 'Angular', 'Node.js', 'Serverless']
    },
    {
      role: 'Software Engineer',
      tag: 'Web3 / IoT Tracking',
      name: 'Circuit Breaker',
      desc: 'Blockchain-based industrial tracking solution utilizing smart contracts for transparent asset lifecycle.',
      highlights: ['Ethereum / Solidity', 'Ganache Private Chain', 'Real-time Viz'],
      metrics: ['Smart Contract PoC', 'Off-chain Persistence'],
      tech: ['Ethereum', 'Solidity', 'Node.js', 'MongoDB']
    }
  ];

  education = [
    {
      degree: 'Bachelor of Engineering',
      branch: 'Electronics & Communication',
      college: 'Bapuji Institute of Engineering and Technology (BIET)',
      university: 'Visvesvaraya Technological University (VTU)',
      period: 'Aug 2013 - June 2017'
    }
  ];

  certifications = [
    {
      title: 'Software Development Course',
      provider: 'J Spiders',
      date: 'April 2018'
    }
  ];

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.mobileMenuOpen = false; // Close mobile menu after navigation
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 300;
    this.animateOnScroll();
  }

  ngOnInit() {
  }

  animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animate, .skill-card, .timeline-item, .project-card');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      if (isVisible) {
        element.classList.add('animate-in');
      }
    });
  }



  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => observer.observe(el));

    // Stagger animations for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      (card as HTMLElement).style.transitionDelay = `${index * 100}ms`;
      observer.observe(card);
    });

    // Stagger animations for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      (item as HTMLElement).style.transitionDelay = `${index * 150}ms`;
      observer.observe(item);
    });

    // Stagger animations for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      (card as HTMLElement).style.transitionDelay = `${index * 200}ms`;
      observer.observe(card);
    });
  }
}