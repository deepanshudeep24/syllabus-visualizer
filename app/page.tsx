'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Building2,
  Calculator,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Globe2,
  Languages,
  Laptop,
  Landmark,
  MapPin,
  Search,
  Sigma,
  Sparkles,
} from 'lucide-react';

type Group = { title: string; topics: string[] };
type Subject = {
  name: string;
  short: string;
  icon: typeof Brain;
  color: string;
  meta: string;
  groups: Group[];
};

const tier1: Subject[] = [
  {
    name: 'General Intelligence & Reasoning',
    short: 'Reasoning',
    icon: Brain,
    color: '#6658d9',
    meta: '25 questions · 50 marks · 15 minutes',
    groups: [
      {
        title: 'Analogies & classification',
        topics: [
          'Semantic analogy',
          'Symbolic / number analogy',
          'Figural analogy',
          'Semantic classification',
          'Symbolic / number classification',
          'Figural classification',
        ],
      },
      {
        title: 'Series & operations',
        topics: [
          'Semantic series',
          'Number series',
          'Figural series',
          'Numerical operations',
          'Symbolic operations',
          'Trends',
        ],
      },
      {
        title: 'Visual reasoning',
        topics: [
          'Space orientation',
          'Space visualization',
          'Venn diagrams',
          'Pattern folding & unfolding',
          'Figural pattern completion',
          'Embedded figures',
        ],
      },
      {
        title: 'Applied reasoning',
        topics: [
          'Problem solving',
          'Coding & decoding',
          'Word building',
          'Drawing inferences',
          'Critical thinking',
          'Emotional intelligence',
          'Social intelligence',
        ],
      },
      {
        title: 'Matching & indexing',
        topics: [
          'Indexing',
          'Address matching',
          'Date & city matching',
          'Centre code / roll number classification',
          'Letter / number coding',
        ],
      },
    ],
  },
  {
    name: 'General Awareness',
    short: 'Awareness',
    icon: Globe2,
    color: '#078a70',
    meta: '25 questions · 50 marks · 15 minutes',
    groups: [
      {
        title: 'Current awareness',
        topics: [
          'Current events',
          'Everyday observations',
          'Scientific aspects of daily experience',
          'Application of awareness to society',
        ],
      },
      {
        title: 'India & neighbouring countries',
        topics: [
          'History',
          'Culture',
          'Geography',
          'Economic scene',
          'General policy',
          'Scientific research',
        ],
      },
    ],
  },
  {
    name: 'Quantitative Aptitude',
    short: 'Quant',
    icon: Calculator,
    color: '#d36a2e',
    meta: '25 questions · 50 marks · 15 minutes',
    groups: [
      {
        title: 'Numbers & arithmetic',
        topics: [
          'Whole numbers',
          'Decimals & fractions',
          'Percentages',
          'Ratio & proportion',
          'Square roots',
          'Averages',
          'Interest',
          'Profit & loss',
          'Discount',
          'Partnership',
          'Mixture & alligation',
          'Time & distance',
          'Time & work',
        ],
      },
      {
        title: 'Algebra & geometry',
        topics: [
          'Algebraic identities',
          'Elementary surds',
          'Linear equation graphs',
          'Triangles & centres',
          'Congruence & similarity',
          'Circles, chords & tangents',
        ],
      },
      {
        title: 'Mensuration & trigonometry',
        topics: [
          'Quadrilaterals & polygons',
          'Prism, cone & cylinder',
          'Sphere & hemisphere',
          'Pyramid & parallelepiped',
          'Trigonometric ratios',
          'Degree & radian measures',
          'Standard identities',
          'Heights & distances',
        ],
      },
      {
        title: 'Data interpretation',
        topics: ['Histogram', 'Frequency polygon', 'Bar diagram', 'Pie chart'],
      },
    ],
  },
  {
    name: 'English Comprehension',
    short: 'English',
    icon: Languages,
    color: '#bd4774',
    meta: '25 questions · 50 marks · 15 minutes',
    groups: [
      {
        title: 'English comprehension',
        topics: [
          'Understanding correct English',
          'Basic comprehension',
          'Writing ability',
        ],
      },
    ],
  },
];

const tier2: Subject[] = [
  {
    name: 'Mathematical Abilities',
    short: 'Maths',
    icon: Calculator,
    color: '#6658d9',
    meta: 'Paper I · 30 questions',
    groups: [
      {
        title: 'Numbers & arithmetic',
        topics: [
          'Whole numbers, decimals & fractions',
          'Percentage, ratio & proportion',
          'Simple & compound interest',
          'Profit, loss & discount',
          'Partnership',
          'Mixture & alligation',
          'Time, distance & work',
        ],
      },
      {
        title: 'Algebra & geometry',
        topics: [
          'Algebraic identities & surds',
          'Linear equation graphs',
          'Triangles and centres',
          'Congruence & similarity',
          'Circles, chords & tangents',
        ],
      },
      {
        title: 'Mensuration & trigonometry',
        topics: [
          '2D and 3D figures',
          'Trigonometric ratios',
          'Complementary angles',
          'Heights & distances',
          'Standard identities',
        ],
      },
      {
        title: 'Statistics & probability',
        topics: [
          'Tables and graphs',
          'Mean, median & mode',
          'Standard deviation',
          'Simple probability',
        ],
      },
    ],
  },
  {
    name: 'Reasoning & General Intelligence',
    short: 'Reasoning',
    icon: Brain,
    color: '#078a70',
    meta: 'Paper I · 30 questions',
    groups: [
      {
        title: 'Verbal & non-verbal',
        topics: [
          'Analogies',
          'Symbolic operations',
          'Series',
          'Space orientation',
          'Classification',
          'Venn diagrams',
          'Drawing inferences',
          'Pattern folding',
          'Embedded figures',
          'Critical thinking',
          'Problem solving',
          'Coding & decoding',
          'Social & emotional intelligence',
        ],
      },
    ],
  },
  {
    name: 'English Language & Comprehension',
    short: 'English',
    icon: Languages,
    color: '#d36a2e',
    meta: 'Paper I · 45 questions',
    groups: [
      {
        title: 'Language usage',
        topics: [
          'Vocabulary & grammar',
          'Sentence structure',
          'Synonyms, homonyms & antonyms',
          'Spot the error',
          'Fill in the blanks',
          'Spellings',
          'Idioms & phrases',
          'One-word substitution',
          'Sentence improvement',
        ],
      },
      {
        title: 'Grammar & comprehension',
        topics: [
          'Active / passive voice',
          'Direct / indirect narration',
          'Sentence shuffling',
          'Cloze passage',
          'Comprehension passages',
        ],
      },
    ],
  },
  {
    name: 'General Awareness',
    short: 'Awareness',
    icon: Globe2,
    color: '#bd4774',
    meta: 'Paper I · 25 questions',
    groups: [
      {
        title: 'India, neighbours & current events',
        topics: [
          'History',
          'Culture',
          'Geography',
          'Economic scene',
          'General policy',
          'Scientific research',
          'Current events & everyday science',
        ],
      },
    ],
  },
  {
    name: 'Computer Knowledge',
    short: 'Computer',
    icon: Laptop,
    color: '#2675b8',
    meta: 'Paper I · 20 questions · qualifying',
    groups: [
      {
        title: 'Computer basics',
        topics: [
          'Computer organization & CPU',
          'Input / output devices',
          'Memory & backup devices',
          'Ports & Windows Explorer',
          'Keyboard shortcuts',
        ],
      },
      {
        title: 'Software, internet & security',
        topics: [
          'Windows OS',
          'MS Word, Excel & PowerPoint',
          'Web browsing & search',
          'Email & e-banking',
          'Networking devices & protocols',
          'Cyber threats & prevention',
        ],
      },
    ],
  },
  {
    name: 'Statistics',
    short: 'Statistics',
    icon: Sigma,
    color: '#8060a8',
    meta: 'Paper II · selected posts only',
    groups: [
      {
        title: 'Descriptive statistics',
        topics: [
          'Data collection & presentation',
          'Central tendency',
          'Dispersion',
          'Moments, skewness & kurtosis',
        ],
      },
      {
        title: 'Probability & inference',
        topics: [
          'Correlation & regression',
          'Probability theory',
          'Random variables & distributions',
          'Sampling theory',
          'Statistical inference',
          'Analysis of variance',
        ],
      },
      {
        title: 'Applied statistics',
        topics: ['Time series analysis', 'Index numbers'],
      },
    ],
  },
  {
    name: 'Finance & Economics',
    short: 'Finance',
    icon: Landmark,
    color: '#9a651b',
    meta: 'Paper III · selected posts only',
    groups: [
      {
        title: 'Finance & accounts',
        topics: [
          'Accounting principles',
          'Single and double entry',
          'Journal, ledger & trial balance',
          'Final accounts & balance sheet',
          'Depreciation & inventory',
          'Bills of exchange',
        ],
      },
      {
        title: 'Economics & governance',
        topics: [
          'CAG & Finance Commission',
          'Microeconomics',
          'Demand, supply, production & costs',
          'Market structures',
          'Indian economy',
          'Economic reforms since 1991',
          'Money, banking & fiscal policy',
          'IT in governance',
        ],
      },
    ],
  },
];

export default function Home() {
  const [level, setLevel] = useState<'central' | 'state'>('central');
  const [stateName, setStateName] = useState('Uttar Pradesh');
  const [stateBody, setStateBody] = useState('UPPSC');
  const [stateExam, setStateExam] = useState('PCS');
  const [tier, setTier] = useState<'Tier I' | 'Tier II'>('Tier I');
  const [view, setView] = useState<'syllabus' | 'pattern'>('syllabus');
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const subjects = tier === 'Tier I' ? tier1 : tier2;
  const visible = useMemo(
    () =>
      subjects.filter(
        (s) =>
          (filter === 'All' || s.short === filter) &&
          `${s.name} ${s.groups.flatMap((g) => [g.title, ...g.topics]).join(' ')}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [subjects, filter, query],
  );
  const chooseLevel = (next: 'central' | 'state') => {
    setLevel(next);
    setTier('Tier I');
    setFilter('All');
    setQuery('');
  };

  return (
    <main>
      <header>
        <div className="brand">
          <span>
            <BookOpen size={21} />
          </span>
          Syllabus<b>Lens</b>
        </div>
        <div className="local-badge">
          <span />
          Your exam edge
        </div>
      </header>
      <section className="selector-area">
        <div className="selector-intro">
          <div className="eyebrow">
            <Sparkles size={14} />
            Official syllabus, made simple
          </div>
          <h1>
            Find your <em>exam syllabus.</em>
          </h1>
          <p>
            Choose the exam level and use the selectors below. The latest
            available syllabus opens automatically.
          </p>
        </div>
        <div className="level-toggle" aria-label="Exam level">
          <button
            className={level === 'central' ? 'active' : ''}
            onClick={() => chooseLevel('central')}
          >
            <Landmark />
            <span>
              <b>Central level</b>
              <small>SSC, UPSC, Railway & more</small>
            </span>
          </button>
          <button
            className={level === 'state' ? 'active' : ''}
            onClick={() => chooseLevel('state')}
          >
            <MapPin />
            <span>
              <b>State level</b>
              <small>State PSC, Police, TET & more</small>
            </span>
          </button>
        </div>
        <div className="selector-card">
          {level === 'central' ? (
            <>
              <SelectBox
                icon={Building2}
                label="Conducting body"
                value="SSC"
                options={[['SSC', 'Staff Selection Commission']]}
              />
              <SelectBox
                icon={FileText}
                label="Examination"
                value="CGL"
                options={[['CGL', 'Combined Graduate Level']]}
              />
              <SelectBox
                icon={Clock}
                label="Syllabus year"
                value="2026"
                options={[['2026', 'Latest official notification']]}
              />
            </>
          ) : (
            <>
              <SelectBox
                icon={MapPin}
                label="State"
                value={stateName}
                onChange={(value) => {
                  const body = stateOptions(value)[0][0];
                  setStateName(value);
                  setStateBody(body);
                  setStateExam(examOptions(body)[0][0]);
                }}
                options={[
                  ['Uttar Pradesh', 'Uttar Pradesh'],
                  ['Bihar', 'Bihar'],
                  ['Rajasthan', 'Rajasthan'],
                  ['Madhya Pradesh', 'Madhya Pradesh'],
                  ['Maharashtra', 'Maharashtra'],
                  ['West Bengal', 'West Bengal'],
                ]}
              />
              <SelectBox
                icon={Building2}
                label="Conducting body"
                value={stateBody}
                onChange={setStateBody}
                options={stateOptions(stateName)}
              />
              <SelectBox
                icon={FileText}
                label="Examination"
                value={stateExam}
                onChange={setStateExam}
                options={examOptions(stateBody)}
              />
            </>
          )}
        </div>
        <div className="selection-result">
          <Check />
          Selected:{' '}
          <b>
            {level === 'central' ? 'SSC CGL 2026' : `${stateBody} ${stateExam}`}
          </b>
          <span>
            {level === 'central'
              ? 'Latest syllabus loaded below'
              : 'Recent official syllabus will appear here when added'}
          </span>
        </div>
      </section>
      {level === 'central' ? (
        <section className="workspace">
          <div className="topline">
            <div>
              <nav>
                SSC <ChevronRight /> CGL <ChevronRight /> <b>2026</b>
              </nav>
              <h1>
                SSC CGL <em>2026</em>
              </h1>
              <p>
                Official syllabus, organized into subjects and topic clusters.
              </p>
            </div>
            <a href="/SSC-CGL-2026.pdf" target="_blank">
              <FileText />
              <span>
                <b>Official notification</b>
                <small>Pages 24–36 · PDF</small>
              </span>
              <ArrowRight />
            </a>
          </div>
          <div className="stats">
            <div>
              <b>2</b>
              <span>Examination tiers</span>
            </div>
            <div>
              <b>{tier === 'Tier I' ? 4 : 7}</b>
              <span>
                {tier === 'Tier I' ? 'Core subjects' : 'Papers & sections'}
              </span>
            </div>
            <div>
              <b>{tier === 'Tier I' ? 100 : '450+'}</b>
              <span>Questions</span>
            </div>
            <div>
              <b>{tier === 'Tier I' ? 200 : '690+'}</b>
              <span>Maximum marks</span>
            </div>
          </div>
          <div className="view-tabs" role="tablist" aria-label="Exam details">
            <button
              role="tab"
              aria-selected={view === 'syllabus'}
              className={view === 'syllabus' ? 'active' : ''}
              onClick={() => setView('syllabus')}
            >
              <BookOpen />
              <span>
                <b>Syllabus</b>
                <small>Subjects and topics</small>
              </span>
            </button>
            <button
              role="tab"
              aria-selected={view === 'pattern'}
              className={view === 'pattern' ? 'active' : ''}
              onClick={() => setView('pattern')}
            >
              <FileText />
              <span>
                <b>Exam pattern</b>
                <small>Questions, marks and time</small>
              </span>
            </button>
          </div>
          <div className="tools">
            <div className="tabs">
              {(['Tier I', 'Tier II'] as const).map((t) => (
                <button
                  className={tier === t ? 'active' : ''}
                  onClick={() => {
                    setTier(t);
                    setFilter('All');
                  }}
                  key={t}
                >
                  {t}
                  <small>{t === 'Tier I' ? 'Screening' : 'Mains'}</small>
                </button>
              ))}
            </div>
            {view === 'syllabus' && (
              <label>
                <Search />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search topics..."
                  aria-label="Search topics"
                />
              </label>
            )}
          </div>
          {view === 'syllabus' ? (
            <>
              <div className="filters">
                {['All', ...subjects.map((s) => s.short)].map((x) => (
                  <button
                    className={filter === x ? 'active' : ''}
                    onClick={() => setFilter(x)}
                    key={x}
                  >
                    {x === 'All' ? 'All subjects' : x}
                  </button>
                ))}
              </div>
              <div className="sectionhead">
                <div>
                  <small>{tier}</small>
                  <h2>
                    {tier === 'Tier I'
                      ? 'Foundation syllabus'
                      : 'Advanced syllabus'}
                  </h2>
                </div>
                <p>
                  {tier === 'Tier I'
                    ? 'All four subjects are compulsory.'
                    : 'Paper I is compulsory. Papers II and III apply only to selected posts.'}
                </p>
              </div>
              <div className="grid">
                {visible.map((s) => (
                  <SubjectCard subject={s} key={s.name} />
                ))}
                {!visible.length && (
                  <div className="empty">
                    <Search />
                    <b>No matching topics</b>
                    <span>Try another search or subject.</span>
                  </div>
                )}
              </div>
              <aside>
                <Clock />
                <div>
                  <b>Exam pattern note</b>
                  <p>
                    Tier I has a 15-minute sectional timer for each subject and
                    a penalty of 0.50 marks for every wrong answer. Tier II
                    rules vary by paper and section.
                  </p>
                </div>
              </aside>
            </>
          ) : (
            <ExamPattern tier={tier} />
          )}
        </section>
      ) : (
        <section className="state-empty">
          <div className="empty-icon">
            <MapPin />
          </div>
          <span>STATE LEVEL · COMING NEXT</span>
          <h2>
            {stateBody} {stateExam}
          </h2>
          <p>
            The selector is ready. Add the latest official notification to
            visualize this syllabus with the same subject-by-subject experience.
          </p>
          <div className="state-examples">
            <b>State-level exam examples</b>
            <div>
              <span>UPPSC PCS</span>
              <span>BPSC CCE</span>
              <span>RPSC RAS</span>
              <span>MPPSC SSE</span>
              <span>MPSC Rajyaseva</span>
              <span>WBPSC WBCS</span>
              <span>State Police SI</span>
              <span>State TET</span>
            </div>
          </div>
          <div className="year-placeholder">
            <span>Previous years</span>
            <button disabled>Year archive will appear here</button>
          </div>
        </section>
      )}
    </main>
  );
}

function SelectBox({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  options: string[][];
  onChange?: (value: string) => void;
}) {
  return (
    <label className="select-box">
      <span>
        <Icon />
      </span>
      <div>
        <small>{label}</small>
        <select value={value} onChange={(e) => onChange?.(e.target.value)}>
          {options.map(([v, description]) => (
            <option value={v} key={v}>
              {v} — {description}
            </option>
          ))}
        </select>
      </div>
      <ChevronRight />
    </label>
  );
}

function stateOptions(state: string) {
  const map: Record<string, string[][]> = {
    'Uttar Pradesh': [['UPPSC', 'Uttar Pradesh Public Service Commission']],
    Bihar: [['BPSC', 'Bihar Public Service Commission']],
    Rajasthan: [['RPSC', 'Rajasthan Public Service Commission']],
    'Madhya Pradesh': [['MPPSC', 'Madhya Pradesh Public Service Commission']],
    Maharashtra: [['MPSC', 'Maharashtra Public Service Commission']],
    'West Bengal': [['WBPSC', 'West Bengal Public Service Commission']],
  };
  return map[state] || [];
}
function examOptions(body: string) {
  const map: Record<string, string[][]> = {
    UPPSC: [['PCS', 'Provincial Civil Services']],
    BPSC: [['CCE', 'Combined Competitive Examination']],
    RPSC: [['RAS', 'Rajasthan Administrative Service']],
    MPPSC: [['SSE', 'State Service Examination']],
    MPSC: [['Rajyaseva', 'State Services Examination']],
    WBPSC: [['WBCS', 'West Bengal Civil Service']],
  };
  return map[body] || [];
}

function SubjectCard({ subject }: { subject: Subject }) {
  const [open, setOpen] = useState(false);
  const Icon = subject.icon;
  const count = subject.groups.reduce((n, g) => n + g.topics.length, 0);
  return (
    <article
      className="card"
      style={{ '--c': subject.color } as React.CSSProperties}
    >
      <div className="cardtop">
        <i>
          <Icon />
        </i>
        <div>
          <h3>{subject.name}</h3>
          <p>{subject.meta}</p>
        </div>
        <span>{count} topics</span>
      </div>
      <div className="groups">
        {(open ? subject.groups : subject.groups.slice(0, 2)).map((g) => (
          <div className="group" key={g.title}>
            <h4>{g.title}</h4>
            <div>
              {g.topics.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {subject.groups.length > 2 && (
        <button className="more" onClick={() => setOpen(!open)}>
          {open ? 'Show less' : `View ${subject.groups.length - 2} more groups`}
          <ChevronRight className={open ? 'turn' : ''} />
        </button>
      )}
    </article>
  );
}

function ExamPattern({ tier }: { tier: 'Tier I' | 'Tier II' }) {
  const rows =
    tier === 'Tier I'
      ? [
          ['General Intelligence & Reasoning', '25', '50', '15 min'],
          ['General Awareness', '25', '50', '15 min'],
          ['Quantitative Aptitude', '25', '50', '15 min'],
          ['English Comprehension', '25', '50', '15 min'],
        ]
      : [
          ['Paper I · Mathematical Abilities', '30', '90', '30 min section'],
          [
            'Paper I · Reasoning & General Intelligence',
            '30',
            '90',
            '30 min section',
          ],
          [
            'Paper I · English Language & Comprehension',
            '45',
            '135',
            '40 min subject',
          ],
          ['Paper I · General Awareness', '25', '75', '20 min subject'],
          ['Paper I · Computer Knowledge Test', '20', '60', '15 min'],
          ['Paper I · Data Entry Speed Test', '1 task', 'Qualifying', '15 min'],
          ['Paper II · Statistics', '100', '200', '2 hours'],
          ['Paper III · Finance & Economics', '100', '200', '2 hours'],
        ];
  return (
    <section className="pattern-panel">
      <div className="pattern-heading">
        <div>
          <small>{tier} · EXAM PATTERN</small>
          <h2>
            {tier === 'Tier I'
              ? 'Four subjects, one focused hour'
              : 'Paper-wise structure'}
          </h2>
        </div>
        <span>
          <Clock />
          {tier === 'Tier I' ? '60 minutes total' : 'Paper I: 2 hr 15 min'}
        </span>
      </div>
      <div className="pattern-table" role="table">
        <div className="pattern-row pattern-header" role="row">
          <span>Subject / paper</span>
          <span>Questions</span>
          <span>Marks</span>
          <span>Time</span>
        </div>
        {rows.map((row, index) => (
          <div className="pattern-row" role="row" key={row[0]}>
            <span>
              <i>{String(index + 1).padStart(2, '0')}</i>
              <b>{row[0]}</b>
            </span>
            <span data-label="Questions">{row[1]}</span>
            <span data-label="Marks">{row[2]}</span>
            <span data-label="Time">{row[3]}</span>
          </div>
        ))}
        {tier === 'Tier I' && (
          <div className="pattern-total">
            <span>Total</span>
            <b>100 questions</b>
            <b>200 marks</b>
            <b>60 minutes</b>
          </div>
        )}
      </div>
      <div className="pattern-notes">
        <div>
          <b>Negative marking</b>
          <span>
            {tier === 'Tier I'
              ? '0.50 mark for each wrong answer'
              : '1 mark in Paper I; 0.50 in Papers II & III'}
          </span>
        </div>
        <div>
          <b>Question type</b>
          <span>
            Objective, multiple choice{' '}
            {tier === 'Tier II' ? '(except DEST)' : ''}
          </span>
        </div>
        <div>
          <b>Language</b>
          <span>English & Hindi, except English section</span>
        </div>
      </div>
    </section>
  );
}
