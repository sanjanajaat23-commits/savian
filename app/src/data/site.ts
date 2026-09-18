export type NavItem = {
  label: string
  to: string
}

export const navItems: NavItem[] = [
  { label: 'Systems', to: '/systems' },
  { label: 'Industries', to: '/industries' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Technology', to: '/technology' },
  { label: 'About', to: '/about' },
]

export const workflowSteps = [
  'NEW CANDIDATE',
  'AI EXTRACT',
  'SCREEN',
  'MATCH',
  'NOTIFY',
  'CRM UPDATE',
  'FOLLOW-UP',
]

export const automationCategories = [
  { title: 'Operations', description: 'Automate handoffs, approvals, exception handling, and operational triage across complex workflows.' },
  { title: 'Recruiting', description: 'Turn resume intake, screening, outreach, and coordination into a continuously monitored system.' },
  { title: 'Healthcare Staffing', description: 'Streamline candidate intake, verification, matching, and communication for high-volume staffing teams.' },
  { title: 'Logistics', description: 'Track exceptions, update TMS workflows, and notify stakeholders without manual spreadsheet chasing.' },
  { title: 'Sales / CRM', description: 'Connect people, process notes, and pipeline stages into a smoother revenue operation.' },
]

export const portfolioItems = [
  {
    title: 'AI Workflow Automation Platform',
    description: 'A workflow orchestration platform for designing, connecting, and executing operational automations with AI, HTTP, email, condition, and delay nodes.',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQLAlchemy', 'SQLite', 'Alembic'],
  },
  {
    title: 'NovaCRM AI',
    description: 'An AI-assisted CRM analytics project combining customer intelligence, structured data processing, predictive analysis, and business dashboards.',
    technologies: ['Python', 'Pandas', 'Scikit-Learn', 'SQL', 'Power BI', 'Excel'],
  },
  {
    title: 'NovaRAG',
    description: 'A retrieval-augmented generation platform for document ingestion, chunking, vector search, and grounded AI responses.',
    technologies: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'FAISS', 'Hugging Face', 'SQLite'],
  },
]

export const blogPosts = [
  {
    title: 'How operations teams accidentally create their own bottlenecks',
    category: 'Workflow design',
    summary: 'A practical look at where manual handoffs create drag across candidate intake, staffing coordination, and service execution.',
  },
  {
    title: 'Three automation patterns worth building before AI',
    category: 'Systems thinking',
    summary: 'Before adding AI to a workflow, teams usually need better orchestration, data quality, and exception handling.',
  },
  {
    title: 'Designing a workflow that scales without becoming brittle',
    category: 'Ops strategy',
    summary: 'Operational systems need clear routing, recoverable failures, and low-friction human intervention to stay useful.',
  },
]

export const caseStudies = [
  {
    title: 'Recruiting intake operations',
    summary: 'Rebuilt candidate processing and recruiter follow-up into a linked workflow with screening, alerts, and CRM update steps.',
  },
  {
    title: 'Exception-driven logistics coordination',
    summary: 'Connected shipment signals, exception handling, and customer updates into a single operational control layer.',
  },
  {
    title: 'Healthcare staffing coordination',
    summary: 'Accelerated credential review, scheduling coordination, and recruiter notifications without creating more spreadsheets.',
  },
]

export const technologyStack = [
  'Python',
  'FastAPI',
  'React',
  'TypeScript',
  'SQL',
  'LLM / AI',
  'RAG',
  'LangChain',
  'REST APIs',
  'Vector Search',
  'Workflow Automation',
  'Database Systems',
]

export const industryProfiles = {
  healthcareStaffing: {
    slug: 'healthcare-staffing',
    title: 'Healthcare Staffing',
    workflow: [
      'Candidate Applies',
      'Resume Parsed',
      'AI Screening',
      'Credential Check',
      'Job Matching',
      'Recruiter Alert',
      'Follow-up',
      'ATS Updated',
    ],
    description:
      'Automate candidate intake, resume extraction, screening, matching, credential workflows, recruiter alerts, and follow-up.',
  },
  logistics: {
    slug: 'logistics',
    title: 'Logistics',
    workflow: [
      'Shipment Update',
      'Data Received',
      'Exception Detected',
      'Operations Alert',
      'TMS Updated',
      'Customer Notification',
      'Dashboard Updated',
    ],
    description:
      'Connect shipment updates, exception detection, TMS updates, operations alerts, customer notifications, and reporting.',
  },
}

export const sprintStages = [
  { number: '01', title: 'DISCOVER', description: 'Map the current workflow.' },
  { number: '02', title: 'DESIGN', description: 'Identify automation opportunities.' },
  { number: '03', title: 'BUILD', description: 'Implement the workflow system.' },
  { number: '04', title: 'TEST', description: 'Validate edge cases and failure paths.' },
  { number: '05', title: 'DEPLOY', description: 'Put the automation into production.' },
]

export const demoWorkflow = {
  recruitment: {
    name: 'Recruitment workflow',
    steps: [
      'Candidate applies',
      'Resume parsed',
      'AI screening',
      'Credential check',
      'Job matching',
      'Recruiter alert',
      'Follow-up',
      'ATS updated',
    ],
  },
}

export const bookingUrl = 'https://cal.com/sanjana-jaat/15min'
