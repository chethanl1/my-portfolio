import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  summary = 'Full-Stack Senior Developer with 7+ years of expertise in building scalable enterprise solutions using Angular, Node.js, Java, and AWS cloud services. Proven track record of optimizing system performance and architecting microservices.';  mobileMenuOpen = false;
  stats = [
    { label: 'Years Experience', value: '7+' },
    { label: 'Scalability & Reliability', value: 'Design' },
    { label: 'Cloud Expertise', value: 'AWS' }];

  skills = [
    { category: 'Frontend', items: ['Angular', 'TypeScript', 'JavaScript', 'Karma/Jasmine', 'Tailwind CSS'] },
    { category: 'Backend & APIs', items: ['Node.js', 'Java', 'Spring Boot', 'PostgreSQL', 'REST APIs'] },
    { category: 'Databases', items: ['PostgreSQL', 'SQL', 'MongoDB'] },
    { category: 'Cloud & DevOps', items: ['AWS Lambda', 'Docker', 'Kubernetes', 'Step Functions', 'S3'] },
    { category: 'Message Queues', items: ['Kafka', 'RabbitMQ'] },
    { category: 'Tools & Collaboration', items: ['Git', 'Jira', 'Postman', 'SwaggerAPI'] }
  ];

  experience = [
    {
      company: 'Siemens Technology and Services Pvt. Ltd.',
      role: 'Senior Software Engineer',
      period: 'JULY 2021 - PRESENT',
      summary: 'Leading development for COMPAS (Electrical Domain) and DepoFinity (EV Infrastructure).',
      points: [
        'Architected microservices with Angular, Node.js, and Java.',
        'Deployed containerized apps on AWS via Docker/K8s.',
        'Built serverless workloads using Lambda & Step Functions.',
        'Optimized DB queries, reducing average query time.'
      ],
      tech: ['Angular', 'Node.js', 'Java','TypeScript', 'AWS', 'Docker', 'PostgreSQL', 'Kafka', 'RabbitMQ', 'SwaggerAPI', 'Agile']
    },
    {
      company: 'Teamlease (Client: Siemens)',
      role: 'Software Engineer',
      period: 'APRIL 2019 - JUNE 2021',
      summary: 'Specialized in Electric Charger Management and Dispatch applications.',
      points: [
        'Developed DepoFinity (EV Charger Management App).',
        'Implemented scalable RESTful APIs for data integration.',
        'Collaborated in Agile teams for high-impact features.'
      ],
      tech: ['TypeScript', 'Angular', 'Java', 'Node.js', 'Agile']
    },
    {
      company: 'Manpower (Client: Siemens)',
      role: 'Software Engineer',
      period: 'OCT 2018 - MARCH 2019',
      summary: 'Developed Blockchain PoC for industrial circuit breaker tracking.',
      points: [
        'Built blockchain proof-of-concept using Ethereum/Solidity.',
        'Developed Angular real-time transaction visualization.',
        'Integrated MongoDB for off-chain persistence.'
      ],
      tech: ['Ethereum', 'Solidity', 'Blockchain', 'Angular', 'MongoDB']
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

  ngOnInit() {
    // Initial setup if needed
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