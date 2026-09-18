import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  GitBranch,
  Globe,
  Mail,
  Menu,
  Sparkles,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  automationCategories,
  blogPosts,
  caseStudies,
  demoWorkflow,
  industryProfiles,
  navItems,
  portfolioItems,
  sprintStages,
  technologyStack,
  workflowSteps,
  bookingUrl,
} from './data/site'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function SiteShell({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 22)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#050b0a] text-slate-100">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'border-b border-white/10 bg-[#060b0a]/85 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="STRADEXI home">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-400/40 bg-emerald-500/10 text-sm font-semibold text-emerald-300">
              SX
            </div>
            <span className="text-lg font-semibold tracking-[0.18em] text-white">STRADEXI</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm text-slate-300 transition hover:text-white ${isActive ? 'text-white' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-500/15"
            >
              BOOK A CALL
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-[#070d0c]/95 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 text-sm ${isActive ? 'bg-white/5 text-white' : 'text-slate-300'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200"
              >
                BOOK A CALL
              </a>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10 bg-[#030807]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr] lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-400/40 bg-emerald-500/10 text-sm font-semibold text-emerald-300">
                SX
              </div>
              <span className="text-lg font-semibold tracking-[0.18em] text-white">STRADEXI</span>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              STRADEXI designs and deploys intelligent workflow systems that eliminate repetitive operational work across staffing, logistics, recruiting, and other B2B operations.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Navigate</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Industry</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/industries/healthcare-staffing" className="transition hover:text-white">Healthcare staffing</Link></li>
              <li><Link to="/industries/logistics" className="transition hover:text-white">Logistics</Link></li>
              <li><Link to="/case-studies" className="transition hover:text-white">Case studies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Connect</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a href="https://www.linkedin.com/in/sanjana-jaat-281224408" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                  <Globe size={14} /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/sanjanajaat23-commits" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                  <GitBranch size={14} /> GitHub
                </a>
              </li>
              <li>
                <a href="mailto:sanjanajaat23@gmail.com" className="inline-flex items-center gap-2 transition hover:text-white">
                  <Mail size={14} /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-emerald-300">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base text-slate-300">{description}</p>
    </div>
  )
}

function WorkflowPipeline({ steps, activeIndex = -1, compact = false }: { steps: string[]; activeIndex?: number; compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-7'}`}>
      {steps.map((step, index) => (
        <div
          key={step}
          className={`pipeline-node flex items-center justify-center rounded-xl p-3 text-center text-[10px] font-semibold tracking-[0.18em] text-slate-100 ${
            activeIndex === index ? 'border border-emerald-400/60 bg-emerald-500/10 text-emerald-200' : 'border border-white/10'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  )
}

function HomePage() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((value) => (value + 1) % workflowSteps.length)
    }, 1200)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <section className="fade-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.22),transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-22 lg:pt-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-emerald-200">
              <Sparkles size={12} /> Premium workflow systems
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.07em] text-white sm:text-5xl lg:text-7xl">
              Your Business Has Too Much Work That Should Be Automated.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
              STRADEXI designs and deploys intelligent workflow systems that eliminate repetitive operational work across staffing, logistics, recruiting, and other B2B operations.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                BUILD MY AUTOMATION <ArrowRight size={16} />
              </a>
              <Link
                to="/systems"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/50 hover:text-emerald-100"
              >
                SEE THE SYSTEM <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }} className="mx-auto mt-14 max-w-6xl rounded-[28px] border border-white/10 bg-[#07110f]/85 p-5 shadow-[0_30px_80px_rgba(7,17,15,0.55)] backdrop-blur-sm sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
              <span>Automation pipeline</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live</span>
            </div>
            <WorkflowPipeline steps={workflowSteps} activeIndex={activeStep} />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeader
              eyebrow="The real bottleneck"
              title="Your team isn't slow. Your systems are."
              description="Teams lose time because information is repeatedly copied, checked, moved, entered, emailed, and followed up manually. That operational friction accumulates faster than most teams realize."
            />
          </div>
          <div className="glass-panel rounded-[28px] border border-white/10 p-6">
            <div className="mb-5 flex items-center justify-between text-sm text-slate-300">
              <span className="font-medium text-white">Operational mess</span>
              <span className="inline-flex items-center gap-2 text-emerald-200"><Zap size={14} /> High-friction</span>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              {['Copied', 'Checked', 'Moved', 'Entered', 'Emailed', 'Followed up manually'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
                  <span>{item}</span>
                  <span className="text-emerald-300">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-[28px] border border-emerald-400/20 bg-emerald-500/5 p-6 sm:p-8">
          <div className="mb-8 flex items-center justify-between gap-2">
            <h3 className="text-xl font-semibold text-white sm:text-2xl">Unified automated workflow</h3>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-200">Operational layer</span>
          </div>
          <WorkflowPipeline
            steps={['Candidate applies', 'Resume parsed', 'AI screening', 'Credential check', 'Job matching', 'Recruiter alert', 'Follow-up', 'ATS updated']}
            activeIndex={4}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Live demo"
          title="LIVE AUTOMATION LAB"
          description="Compare the manual process with the deployed system and watch the workflow execute in sequence."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Manual workflow</p>
            <div className="space-y-3">
              {[
                'Candidate applies',
                'Recruiter opens resume',
                'Resume reviewed manually',
                'Spreadsheet updated',
                'Recruiter searches jobs',
                'Email sent',
                'ATS updated',
              ].map((step) => (
                <div key={step} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-300">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-300">•</span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          <AutomationLab />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Delivery model"
          title="From messy process to deployed system."
          description="A structured sprint helps turn low-visibility operational work into an automated, measurable system."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {sprintStages.map((stage) => (
            <div key={stage.number} className="rounded-[28px] border border-white/10 bg-[#07100f] p-5">
              <div className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">{stage.number}</div>
              <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{stage.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Workflow categories"
          title="Automation that matches how your business actually runs."
          description="The best automations aren’t isolated AI features. They are end-to-end operational systems built around real handoffs, exceptions, and decisions."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {automationCategories.map((category) => (
            <div key={category.title} className="rounded-[24px] border border-white/10 bg-[#07100f] p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                <Workflow size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="ROI model"
          title="Illustrative estimate"
          description="Use this as a planning guide. Actual results depend on workflow complexity, automation coverage, and implementation."
        />
        <RoiCalculator />
      </section>
    </>
  )
}

function AutomationLab() {
  const workflow = [
    'Candidate Applies',
    'Resume Parsed',
    'AI Screening',
    'Credential Check',
    'Job Matching',
    'Recruiter Alert',
    'Follow-up',
    'ATS Updated',
  ]
  const [currentStep, setCurrentStep] = useState(-1)

  const runWorkflow = () => {
    setCurrentStep(-1)
    let stepIndex = 0
    const timer = window.setInterval(() => {
      setCurrentStep(stepIndex)
      stepIndex += 1
      if (stepIndex > workflow.length - 1) {
        window.clearInterval(timer)
      }
    }, 500)
  }

  return (
    <div className="rounded-[28px] border border-emerald-400/20 bg-[#08110f] p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">STRADEXI workflow</p>
        <button
          type="button"
          onClick={runWorkflow}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200"
        >
          RUN WORKFLOW
        </button>
      </div>
      <div className="space-y-3">
        {workflow.map((step, index) => (
          <div
            key={step}
            className={`flex items-center justify-between rounded-xl border px-3 py-3 text-sm transition ${
              index <= currentStep ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-100' : 'border-white/10 bg-white/[0.02] text-slate-300'
            }`}
          >
            <span>{step}</span>
            {index <= currentStep && <CheckCircle2 size={16} className="text-emerald-300" />}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-dashed border-white/10 bg-black/20 p-3 text-xs uppercase tracking-[0.18em] text-slate-400">
        Simulated/demo data
      </div>
    </div>
  )
}

function RoiCalculator() {
  const [employees, setEmployees] = useState(24)
  const [hoursPerWeek, setHoursPerWeek] = useState(14)
  const [hourlyRate, setHourlyRate] = useState(38)
  const [automationShare, setAutomationShare] = useState(72)

  const values = useMemo(() => {
    const weeklyManualHours = employees * hoursPerWeek
    const potentialHoursAutomated = weeklyManualHours * (automationShare / 100)
    const monthlyLaborCapacity = potentialHoursAutomated * 4.33

    return {
      weeklyManualHours,
      potentialHoursAutomated,
      monthlyLaborCapacity,
      monthlyLaborValue: monthlyLaborCapacity * hourlyRate,
    }
  }, [automationShare, employees, hourlyRate, hoursPerWeek])

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="glass-panel rounded-[28px] border border-white/10 p-5">
        <div className="space-y-6">
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Employees performing task</span>
            <input type="range" min="1" max="200" value={employees} onChange={(event) => setEmployees(Number(event.target.value))} className="w-full accent-emerald-400" />
            <span className="mt-2 block text-right text-sm text-emerald-200">{employees}</span>
          </label>
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Hours spent per week</span>
            <input type="range" min="1" max="40" value={hoursPerWeek} onChange={(event) => setHoursPerWeek(Number(event.target.value))} className="w-full accent-emerald-400" />
            <span className="mt-2 block text-right text-sm text-emerald-200">{hoursPerWeek}</span>
          </label>
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Average hourly cost</span>
            <input type="range" min="20" max="120" value={hourlyRate} onChange={(event) => setHourlyRate(Number(event.target.value))} className="w-full accent-emerald-400" />
            <span className="mt-2 block text-right text-sm text-emerald-200">${hourlyRate}</span>
          </label>
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Percentage of work that can be automated</span>
            <input type="range" min="10" max="95" value={automationShare} onChange={(event) => setAutomationShare(Number(event.target.value))} className="w-full accent-emerald-400" />
            <span className="mt-2 block text-right text-sm text-emerald-200">{automationShare}%</span>
          </label>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Weekly manual hours" value={`${values.weeklyManualHours.toFixed(0)} hrs`} />
          <StatCard label="Potential hours automated" value={`${values.potentialHoursAutomated.toFixed(0)} hrs`} />
          <StatCard label="Estimated monthly labor capacity" value={`${values.monthlyLaborCapacity.toFixed(0)} hrs`} />
        </div>
        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-100">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">Illustrative monthly labor value</span>
            <span className="text-xl font-semibold text-white">${values.monthlyLaborValue.toFixed(0)}</span>
          </div>
        </div>
        <p className="mt-5 text-sm text-slate-400">
          Illustrative estimate — actual results depend on workflow complexity, automation coverage, and implementation.
        </p>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}

function SystemsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Systems"
        title="Operational design built for real-world complexity."
        description="We build systems that unify data capture, workflow logic, exceptions, human approvals, and downstream updates so operations can actually scale."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {automationCategories.map((category) => (
          <div key={category.title} className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300"><Workflow size={20} /></div>
            <h3 className="text-xl font-semibold text-white">{category.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function IndustriesOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Industries"
        title="Automation for high-variability operational work."
        description="From healthcare staffing to logistics, the goal is the same: reduce repetitive work without compromising service quality."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <IndustryCard slug="healthcare-staffing" title="Healthcare Staffing" description="Automate candidate intake, resume extraction, screening, matching, credential workflows, recruiter alerts, and follow-up." workflow={industryProfiles.healthcareStaffing.workflow} />
        <IndustryCard slug="logistics" title="Logistics" description="Connect shipment updates, exception detection, TMS updates, operations alerts, customer notifications, and reporting." workflow={industryProfiles.logistics.workflow} />
      </div>
    </div>
  )
}

function IndustryCard({ slug, title, description, workflow }: { slug: string; title: string; description: string; workflow: string[] }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <Link to={`/industries/${slug}`} className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-emerald-200">
          View system <ArrowUpRight size={14} />
        </Link>
      </div>
      <p className="text-sm text-slate-300">{description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {workflow.map((step) => (
          <span key={step} className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
            {step}
          </span>
        ))}
      </div>
    </div>
  )
}

function IndustryDetailPage() {
  const { slug } = useParams()
  const profile = slug === 'healthcare-staffing' ? industryProfiles.healthcareStaffing : industryProfiles.logistics

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-2 text-sm text-slate-300">
        <Link to="/industries" className="transition hover:text-white">Industries</Link>
        <ChevronDown size={14} className="rotate-[-90deg]" />
        <span>{profile.title}</span>
      </div>
      <SectionHeader
        eyebrow="Industry workflow"
        title={profile.title}
        description={profile.description}
      />
      <div className="mt-10 rounded-[28px] border border-white/10 bg-[#08110f] p-6">
        <WorkflowPipeline steps={profile.workflow} activeIndex={4} />
      </div>
    </div>
  )
}

function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="How it works"
        title="A focused sprint from process mapping to deployment."
        description="The goal is to replace manual operational drag with one durable system that can absorb scale without needing constant intervention."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {sprintStages.map((stage) => (
          <div key={stage.number} className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
            <div className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">{stage.number}</div>
            <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{stage.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TechnologyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Technology"
        title="Technical credibility for serious workflow systems."
        description="We build with modern data, orchestration, and integration patterns without making unsupported claims or overselling a stack."
      />
      <div className="mt-10 flex flex-wrap gap-3">
        {technologyStack.map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-[#08110f] px-3 py-2 text-sm text-slate-200">{item}</span>
        ))}
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[30px] border border-white/10 bg-[#08110f] p-6">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 text-2xl font-semibold text-emerald-300">
            SJ
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white">Sanjana Jaat</h2>
          <p className="mt-2 text-base text-emerald-200">Full-Stack Developer · AI Engineer</p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <a href="https://www.linkedin.com/in/sanjana-jaat-281224408" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white"><Globe size={15} /> LinkedIn</a>
            <a href="https://github.com/sanjanajaat23-commits" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white"><GitBranch size={15} /> GitHub</a>
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="About"
            title="Building systems that reduce the most repetitive operational work."
            description="STRADEXI exists to help businesses deploy practical, durable automation where the real drag is: handoffs, exceptions, updates, and repeated coordination."
          />
        </div>
      </div>
    </div>
  )
}

function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    work_email: '',
    company: '',
    role: '',
    industry: '',
    current_process: '',
    biggest_time_sink: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.detail || 'Unable to send inquiry.')
      }

      setSuccessMessage(payload.message || 'Inquiry successfully submitted.')
      setForm({
        name: '',
        work_email: '',
        company: '',
        role: '',
        industry: '',
        current_process: '',
        biggest_time_sink: '',
      })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Show us the process your team hates doing."
            description="Tell us where the manual drag is in your workflows and we’ll assess what could be systemized."
          />
        </div>

        <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(value) => handleChange('name', value)} />
            <Field label="Work email" type="email" value={form.work_email} onChange={(value) => handleChange('work_email', value)} />
            <Field label="Company" value={form.company} onChange={(value) => handleChange('company', value)} />
            <Field label="Role" value={form.role} onChange={(value) => handleChange('role', value)} />
            <Field label="Industry" value={form.industry} onChange={(value) => handleChange('industry', value)} />
            <Field label="Current process" value={form.current_process} onChange={(value) => handleChange('current_process', value)} />
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-slate-300">Biggest time sink</label>
              <textarea
                value={form.biggest_time_sink}
                onChange={(event) => handleChange('biggest_time_sink', event.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-[#0a1413] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/50"
                placeholder="Describe the recurring bottleneck."
              />
            </div>
          </div>
          {errorMessage && <p className="mt-4 text-sm text-red-300">{errorMessage}</p>}
          {successMessage && <p className="mt-4 text-sm text-emerald-300">{successMessage}</p>}
          <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? 'Sending...' : 'Submit inquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block text-sm text-slate-300">
      <span className="mb-2 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-[#0a1413] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/50"
      />
    </label>
  )
}

function DemoPage() {
  const [demoData, setDemoData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchDemo = async () => {
      try {
        const response = await fetch(`${API_URL}/api/demo/recruitment`)
        const payload = await response.json()
        setDemoData(payload)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDemo()
  }, [])

  const runDemo = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/demo/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflow: 'recruitment', steps: demoWorkflow.recruitment.steps }),
      })
      const payload = await response.json()
      setDemoData({ ...payload, simulated_data: payload.simulated_data })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const chartData = [
    { name: 'Step 1', value: 14 },
    { name: 'Step 2', value: 28 },
    { name: 'Step 3', value: 42 },
    { name: 'Step 4', value: 60 },
    { name: 'Step 5', value: 74 },
    { name: 'Step 6', value: 89 },
    { name: 'Step 7', value: 98 },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Demo"
        title="LIVE DEMO ENVIRONMENT"
        description="The environment uses simulated/demo data only. This is a representative workflow status screen, not a production operating system."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Workflow status</p>
              <p className="mt-2 text-2xl font-semibold text-white">{demoData?.simulated_data?.workflow_status || 'Processing'}</p>
            </div>
            <button type="button" onClick={runDemo} disabled={loading} className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-emerald-200 disabled:opacity-60">
              {loading ? 'Running...' : 'Run demo'}
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Completed steps" value={String(demoData?.completed_steps ?? 6)} />
            <MetricCard label="Time saved estimate" value={demoData?.time_saved_estimate || '6.2 hours / week'} />
            <MetricCard label="Exceptions handled" value={String(demoData?.simulated_data?.exceptions_handled ?? 3)} />
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#07110f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="value" stroke="#34d399" fill="url(#areaFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-3 text-xl font-semibold text-white">{value}</p>
    </div>
  )
}

function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Portfolio"
        title="Product-oriented builds and workflow systems."
        description="The work below is presented as portfolio product builds, without invented client metrics or false outcomes."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {caseStudies.map((caseStudy) => (
          <div key={caseStudy.title} className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-emerald-300">Case study</p>
            <h3 className="text-xl font-semibold text-white">{caseStudy.title}</h3>
            <p className="mt-4 text-sm text-slate-300">{caseStudy.summary}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {portfolioItems.map((item) => (
          <div key={item.title} className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-4 text-sm text-slate-300">{item.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.technologies.map((technology) => (
                <span key={technology} className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">{technology}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Blog"
        title="Field notes on intelligent operations."
        description="Practical ideas for building systems that reduce friction without overengineering the foundation."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.title} className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-emerald-300">{post.category}</p>
            <h3 className="text-xl font-semibold text-white">{post.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{post.summary}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/contacts`, { credentials: 'include' })
        setIsAuthenticated(response.ok)
      } catch {
        setIsAuthenticated(false)
      }
    }

    check()
  }, [])

  if (isAuthenticated === null) return <div className="mx-auto max-w-7xl px-4 py-16 text-slate-300">Checking access...</div>
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: 'admin', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.detail || 'Login failed.')
      }
      navigate('/admin/inbox')
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed.')
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-white/10 bg-[#08110f] p-6">
        <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white">Admin login</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Username</span>
            <input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} className="w-full rounded-2xl border border-white/10 bg-[#0a1413] px-4 py-3 text-white focus:border-emerald-400/50" />
          </label>
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Password</span>
            <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-2xl border border-white/10 bg-[#0a1413] px-4 py-3 text-white focus:border-emerald-400/50" />
          </label>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950">Log in</button>
        </form>
      </div>
    </div>
  )
}

function AdminInboxPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/contacts`, { credentials: 'include' })
        if (!response.ok) throw new Error('Unauthorized')
        const payload = await response.json()
        setContacts(payload.contacts || [])
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load inquiries.')
      }
    }

    load()
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Admin inbox"
        title="Submitted contact inquiries"
        description="This inbox displays contact requests submitted through the public inquiry form."
      />
      {error ? <p className="mt-6 text-sm text-red-300">{error}</p> : null}
      <div className="mt-10 space-y-4">
        {contacts.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-[#08110f] p-6 text-slate-300">No inquiries yet.</div>
        ) : (
          contacts.map((contact) => (
            <article key={contact.id} className="rounded-[24px] border border-white/10 bg-[#08110f] p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{contact.name}</h3>
                  <p className="text-sm text-slate-300">{contact.work_email}</p>
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{contact.industry}</div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <p className="text-sm text-slate-300"><span className="text-slate-500">Company:</span> {contact.company}</p>
                <p className="text-sm text-slate-300"><span className="text-slate-500">Role:</span> {contact.role}</p>
                <p className="text-sm text-slate-300 md:col-span-2"><span className="text-slate-500">Current process:</span> {contact.current_process}</p>
                <p className="text-sm text-slate-300 md:col-span-2"><span className="text-slate-500">Biggest time sink:</span> {contact.biggest_time_sink}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteShell>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/systems" element={<SystemsPage />} />
            <Route path="/industries" element={<IndustriesOverviewPage />} />
            <Route path="/industries/:slug" element={<IndustryDetailPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/inbox" element={<AdminRoute><AdminInboxPage /></AdminRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </SiteShell>
    </BrowserRouter>
  )
}

export default App
