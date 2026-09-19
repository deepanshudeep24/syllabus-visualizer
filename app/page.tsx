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

type StagePattern = {
  rows: string[][];
  total?: string[];
  negativeMarking: string;
  questionType: string;
  language: string;
  timeSummary: string;
};
type Stage = {
  key: string;
  label: string;
  sublabel: string;
  subjects: Subject[];
  pattern: StagePattern;
};
type StateExamConfig = { fullName: string; interviewMarks: string; stages: Stage[] };

const stateExamData: Record<string, StateExamConfig> = {
  UPPSC: {
    fullName: 'UPPSC PCS',
    interviewMarks: '100 marks personality test after Mains',
    stages: [
      {
        key: 'prelims',
        label: 'Prelims',
        sublabel: 'Objective',
        pattern: {
          rows: [
            ['General Studies Paper I', '150', '200', '2 hours'],
            ['CSAT Paper II (qualifying)', '100', '200', '2 hours'],
          ],
          negativeMarking: '1.33 marks for correct, 1/3 deducted per wrong answer',
          questionType: 'Objective, multiple choice',
          language: 'Hindi & English',
          timeSummary: 'Merit decided by GS Paper I only',
        },
        subjects: [
          {
            name: 'General Studies (Paper I)',
            short: 'GS Paper I',
            icon: Globe2,
            color: '#6658d9',
            meta: '150 questions · 200 marks · counts for merit',
            groups: [
              {
                title: 'Current affairs & history',
                topics: [
                  'Current events of national & international importance',
                  'History of India',
                  'Indian National Movement',
                  'Growth of nationalism',
                  'Attainment of independence',
                ],
              },
              {
                title: 'Geography, polity & society',
                topics: [
                  'India & world geography',
                  'Indian polity & governance',
                  'Panchayati Raj & public policy',
                  'Economic & social development',
                  'Environmental ecology & climate change',
                  'General science',
                ],
              },
            ],
          },
          {
            name: 'General Studies (Paper II) — CSAT',
            short: 'CSAT',
            icon: Calculator,
            color: '#078a70',
            meta: '100 questions · 200 marks · qualifying (33%)',
            groups: [
              {
                title: 'Elementary mathematics',
                topics: [
                  'Number systems',
                  'Average, ratio & percentage',
                  'Profit, loss & interest',
                  'Time, speed & distance',
                  'Algebra & polynomials',
                  'Set theory',
                  'Geometry & mensuration',
                  'Statistics & data',
                ],
              },
              {
                title: 'Language & comprehension',
                topics: [
                  'General English comprehension',
                  'General Hindi (सामान्य हिंदी)',
                  'Reasoning & logical ability',
                ],
              },
            ],
          },
        ],
      },
      {
        key: 'mains',
        label: 'Mains',
        sublabel: 'Descriptive',
        pattern: {
          rows: [
            ['General Hindi', '—', '150', '3 hours'],
            ['Essay', '—', '150', '3 hours'],
            ['General Studies I', '—', '200', '3 hours'],
            ['General Studies II', '—', '200', '3 hours'],
            ['General Studies III', '—', '200', '3 hours'],
            ['General Studies IV', '—', '200', '3 hours'],
            ['General Studies V (UP)', '—', '200', '3 hours'],
            ['General Studies VI (UP)', '—', '200', '3 hours'],
          ],
          total: ['Total', '—', '1500 marks', '—'],
          negativeMarking: 'Not applicable — descriptive papers',
          questionType: 'Conventional / descriptive',
          language: 'Hindi, English or Urdu',
          timeSummary: 'Interview: 100 marks after Mains',
        },
        subjects: [
          {
            name: 'General Hindi & Essay',
            short: 'Hindi & Essay',
            icon: Languages,
            color: '#d36a2e',
            meta: '150 + 150 marks · 3 hours each',
            groups: [
              {
                title: 'Essay (700 words, one topic per section)',
                topics: [
                  'Literature & culture',
                  'Social sphere',
                  'Political sphere',
                  'Science, environment & technology',
                  'Economic sphere',
                  'Agriculture, industry & trade',
                  'National & international events',
                  'Natural calamities',
                  'National development programmes',
                ],
              },
              {
                title: 'General Hindi',
                topics: ['Comprehension', 'Grammar & usage', 'Composition & letter writing'],
              },
            ],
          },
          {
            name: 'General Studies I',
            short: 'GS I',
            icon: Landmark,
            color: '#bd4774',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'History & culture',
                topics: [
                  'History of Indian culture, art & architecture',
                  'Modern Indian history (1757–1947)',
                  'The freedom struggle',
                  'Post-independence consolidation',
                  'World history (French & Industrial Revolution, World Wars, Nazism/Fascism)',
                ],
              },
              {
                title: 'Society & geography',
                topics: [
                  'Indian society, women & population issues',
                  'Poverty, urbanization & economic reforms',
                  'Social empowerment, communalism & secularism',
                  'Distribution of natural resources & industry location',
                  'Physical geography (earthquakes, cyclones, glaciers)',
                  'Oceanic resources & human migration',
                  'Population settlements & smart cities',
                ],
              },
            ],
          },
          {
            name: 'General Studies II',
            short: 'GS II',
            icon: Building2,
            color: '#2675b8',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'Polity & constitution',
                topics: [
                  'Indian Constitution: evolution & amendments',
                  'Union-state relations & Finance Commission',
                  'Separation of powers & dispute redressal',
                  'Parliament & state legislatures',
                  'Executive, judiciary & PIL',
                  'Statutory bodies & NITI Aayog',
                ],
              },
              {
                title: 'Governance & international relations',
                topics: [
                  'Government policies & e-governance',
                  'Role of NGOs & self-help groups',
                  'Welfare schemes & social sector',
                  'Poverty, health & education',
                  'Civil services in a democracy',
                  'India & neighbouring countries',
                  'International institutions & current affairs',
                ],
              },
            ],
          },
          {
            name: 'General Studies III',
            short: 'GS III',
            icon: Calculator,
            color: '#8060a8',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'Economy',
                topics: [
                  'Economic planning & NITI Aayog',
                  'Poverty, unemployment & inclusive growth',
                  'Government budgeting',
                  'Agriculture, irrigation & food security',
                  'Land reforms & infrastructure',
                  'Liberalization & globalization',
                ],
              },
              {
                title: 'Science, security & environment',
                topics: [
                  'Science & technology developments',
                  'ICT, space & biotechnology',
                  'Environmental security & disaster management',
                  'Internal & international security',
                  'Defence organizations',
                  'Agriculture & allied fields',
                ],
              },
            ],
          },
          {
            name: 'General Studies IV',
            short: 'GS IV',
            icon: Brain,
            color: '#9a651b',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'Ethics & values',
                topics: [
                  'Ethics & human interface',
                  'Attitude & emotional intelligence',
                  'Aptitude for civil service',
                  'Moral thinkers & philosophers',
                  'Probity in governance',
                  'Case studies',
                ],
              },
            ],
          },
          {
            name: 'General Studies V — Uttar Pradesh',
            short: 'GS V (UP)',
            icon: MapPin,
            color: '#6658d9',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'UP history & culture',
                topics: [
                  'History, civilization & ancient cities of UP',
                  'Architecture & heritage of UP',
                  'Freedom struggles (pre & post 1857)',
                  'Eminent personalities of UP',
                  'Rural, urban & tribal social structure',
                ],
              },
              {
                title: 'UP governance & administration',
                topics: [
                  'Political system: Governor, CM, state assembly',
                  'Public Service Commission & judiciary',
                  'Local self-government & Panchayati Raj',
                  'Good governance, RTI & Lokayukta',
                  'Law & order, health & education',
                  'Welfare schemes, tourism & innovation',
                ],
              },
            ],
          },
          {
            name: 'General Studies VI — UP Economy',
            short: 'GS VI (UP)',
            icon: Landmark,
            color: '#078a70',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'UP economy',
                topics: [
                  'Overview of UP economy & state budget',
                  'Trade, commerce & industries',
                  'Government schemes & investment',
                  'Public finance & One District One Product',
                  'Energy resources & demography',
                  'Agricultural commercialization',
                ],
              },
              {
                title: 'UP geography & environment',
                topics: [
                  'Physiography, climate & drainage',
                  'National parks & wildlife sanctuaries',
                  'Transport & power infrastructure',
                  'Pollution & environmental issues',
                  'Natural resources & ecosystems',
                  'Science & technology in UP',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  BPSC: {
    fullName: 'BPSC CCE',
    interviewMarks: '120 marks personality test after Mains',
    stages: [
      {
        key: 'prelims',
        label: 'Prelims',
        sublabel: 'Objective',
        pattern: {
          rows: [['General Studies', '150', '150', '2 hours']],
          negativeMarking: '1/3 mark deducted per wrong answer; a mandatory 5th "not attempted" option',
          questionType: 'Objective, multiple choice',
          language: 'Hindi & English',
          timeSummary: 'Qualifying only — marks not carried to Mains',
        },
        subjects: [
          {
            name: 'General Studies',
            short: 'GS',
            icon: Globe2,
            color: '#6658d9',
            meta: '150 questions · 150 marks · qualifying',
            groups: [
              {
                title: 'History & current affairs',
                topics: [
                  'Current events (national & international)',
                  'History of India & Bihar',
                  'Indian National Movement',
                  'Bihar’s role in the freedom struggle',
                ],
              },
              {
                title: 'Geography, polity, science & reasoning',
                topics: [
                  'General geography of India & Bihar',
                  'Indian polity & economy',
                  'Post-independence economic changes in Bihar',
                  'General science',
                  'General mental ability & reasoning',
                ],
              },
            ],
          },
        ],
      },
      {
        key: 'mains',
        label: 'Mains',
        sublabel: 'Descriptive',
        pattern: {
          rows: [
            ['General Hindi (qualifying)', '—', '100', '3 hours'],
            ['General Studies I', '—', '300', '3 hours'],
            ['General Studies II', '—', '300', '3 hours'],
            ['Essay', '—', '300', '3 hours'],
            ['Optional subject (qualifying)', '—', '100', '2 hours'],
          ],
          total: ['Counted in merit', '—', '900 marks', '—'],
          negativeMarking: 'Not applicable — descriptive papers',
          questionType: 'Descriptive, plus a qualifying MCQ optional paper',
          language: 'Hindi (Devanagari), English or Urdu',
          timeSummary: 'Interview: 120 marks after Mains',
        },
        subjects: [
          {
            name: 'General Hindi',
            short: 'Hindi',
            icon: Languages,
            color: '#d36a2e',
            meta: '100 marks · 3 hours · qualifying (min. 30%)',
            groups: [
              {
                title: 'Language skills',
                topics: [
                  'Essay writing (30 marks)',
                  'Grammar (30 marks)',
                  'Sentence composition (25 marks)',
                  'Précis writing (15 marks)',
                ],
              },
            ],
          },
          {
            name: 'General Studies I',
            short: 'GS I',
            icon: Landmark,
            color: '#bd4774',
            meta: '300 marks · 3 hours',
            groups: [
              {
                title: 'Modern history & culture',
                topics: [
                  'Modern history of India, with special reference to Bihar',
                  'Spread of Western & technical education in Bihar',
                  'Bihar’s role in the freedom struggle',
                  'Santhal Uprising, 1857 Rebellion & Birsa Movement',
                  'Champaran Satyagraha & Quit India Movement (1942)',
                  'Indian art & culture: Mauryan/Pal art, Patna Kalam painting',
                ],
              },
              {
                title: 'Current affairs & data interpretation',
                topics: [
                  'Current events of national & international importance',
                  'Statistical analysis, graphs & diagrams',
                  'Identifying deficiencies & inconsistencies in data',
                ],
              },
            ],
          },
          {
            name: 'General Studies II',
            short: 'GS II',
            icon: Building2,
            color: '#2675b8',
            meta: '300 marks · 3 hours',
            groups: [
              {
                title: 'Polity, economy & geography',
                topics: [
                  'Indian political system & its functioning in Bihar',
                  'Planning process in India',
                  'Physical, economic & social geography of India & Bihar',
                ],
              },
              {
                title: 'Science & technology',
                topics: [
                  'Role of science & technology in India’s development',
                  'Applied science & technology impact on Bihar',
                ],
              },
            ],
          },
          {
            name: 'Essay',
            short: 'Essay',
            icon: FileText,
            color: '#8060a8',
            meta: '300 marks · 3 hours',
            groups: [
              {
                title: 'Essay themes',
                topics: [
                  'Moral & philosophical essay',
                  'Hypothetical essay',
                  'Social, economic, political & administrative issues',
                  'Self-reliant India & Digital India',
                  'Problems & possibilities of Bihar',
                  'Popular proverbs & sayings of Bihar',
                ],
              },
            ],
          },
          {
            name: 'Optional Subject',
            short: 'Optional',
            icon: BookOpen,
            color: '#9a651b',
            meta: '100 marks · 2 hours · MCQ, qualifying',
            groups: [
              {
                title: 'Choose one subject',
                topics: [
                  'Agriculture',
                  'Animal Husbandry & Veterinary Science',
                  'Anthropology',
                  'Botany',
                  'Chemistry',
                  'Civil Engineering',
                  'Commerce & Accountancy',
                  'Economics',
                  'Electrical Engineering',
                  'Geography',
                  'Geology',
                  'History',
                  'Labour & Social Welfare',
                  'Law',
                  'Management',
                  'Mathematics',
                  'Mechanical Engineering',
                  'Philosophy',
                  'Physics',
                  'Political Science & International Relations',
                  'Psychology',
                  'Public Administration',
                  'Sociology',
                  'Statistics',
                  'Zoology',
                  'Language & literature (Hindi, English, Urdu, Sanskrit & more)',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  RPSC: {
    fullName: 'RPSC RAS',
    interviewMarks: '100 marks personality test after Mains',
    stages: [
      {
        key: 'prelims',
        label: 'Prelims',
        sublabel: 'Objective',
        pattern: {
          rows: [['General Studies & General Science', '150', '200', '3 hours']],
          negativeMarking: '1/3 mark deducted; a mandatory 5th "not attempted" option',
          questionType: 'Objective, multiple choice',
          language: 'Hindi & English',
          timeSummary: 'Qualifying only — marks not carried to Mains',
        },
        subjects: [
          {
            name: 'General Studies & General Science',
            short: 'GS',
            icon: Globe2,
            color: '#6658d9',
            meta: '150 questions · 200 marks',
            groups: [
              {
                title: 'History, culture & geography',
                topics: [
                  'History, art, culture & heritage of Rajasthan',
                  'Indian history (ancient to modern)',
                  'Geography of world & India',
                  'Geography of Rajasthan',
                ],
              },
              {
                title: 'Polity, economy & governance',
                topics: [
                  'Indian Constitution, political system & governance',
                  'Political & administrative system of Rajasthan',
                  'Economic concepts & Indian economy',
                  'Economy of Rajasthan',
                ],
              },
              {
                title: 'Science, reasoning & current affairs',
                topics: [
                  'Science & technology',
                  'Reasoning & mental ability',
                  'Basic numeracy & data analysis',
                  'Current affairs with reference to Rajasthan',
                ],
              },
            ],
          },
        ],
      },
      {
        key: 'mains',
        label: 'Mains',
        sublabel: 'Descriptive',
        pattern: {
          rows: [
            ['General Studies I', '—', '200', '3 hours'],
            ['General Studies II', '—', '200', '3 hours'],
            ['General Studies III', '—', '200', '3 hours'],
            ['General Hindi & English', '—', '200', '3 hours'],
          ],
          total: ['Total', '—', '800 marks', '—'],
          negativeMarking: 'Not applicable — descriptive papers',
          questionType: 'Descriptive (short, medium & long answers)',
          language: 'Hindi & English',
          timeSummary: 'Min. 10% per paper & 15% aggregate to qualify · Interview: 100 marks',
        },
        subjects: [
          {
            name: 'General Studies I',
            short: 'GS I',
            icon: Landmark,
            color: '#bd4774',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'History',
                topics: [
                  'History, art & culture of Rajasthan',
                  'Peasant & tribal movements, integration of Rajasthan',
                  'Indian history: ancient to post-independence',
                  'Freedom movement & socio-religious reform',
                  'Modern world history up to 1991',
                ],
              },
              {
                title: 'Economics, sociology & management',
                topics: [
                  'Indian economy: growth, agriculture & industry',
                  'Public finance & banking reforms',
                  'Economy of Rajasthan & Viksit Rajasthan 2047',
                  'Sociology: caste, class & social issues',
                  'Management concepts & organizational behaviour',
                  'Accounting & auditing basics',
                ],
              },
            ],
          },
          {
            name: 'General Studies II',
            short: 'GS II',
            icon: Brain,
            color: '#2675b8',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'Administrative ethics',
                topics: [
                  'Ethics & human values',
                  'Ethics in public administration',
                  'Gandhian ethics & the Bhagwad Geeta',
                  'Moral thinkers & philosophers',
                  'AI versus conscience in administrative decisions',
                ],
              },
              {
                title: 'Science & earth science',
                topics: [
                  'Chemistry, physics & biology in everyday life',
                  'Computer science, ICT & emerging technologies',
                  'Space & defence technology',
                  'Physiography & climate of world, India & Rajasthan',
                  'Natural resources & geo-heritage sites',
                ],
              },
            ],
          },
          {
            name: 'General Studies III',
            short: 'GS III',
            icon: Building2,
            color: '#8060a8',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'Polity & governance',
                topics: [
                  'Constitution: origin, structure & amendments',
                  'Parliament, judiciary & federalism',
                  'Dynamics of Indian polity & internal security',
                  'Rajasthan state politics & governance',
                  'Panchayati Raj & e-governance',
                  'India’s foreign policy & global platforms',
                ],
              },
              {
                title: 'Public administration & law',
                topics: [
                  'Concepts, issues & dynamics of public administration',
                  'State & district administration',
                  'Behaviour, leadership & communication at workplace',
                  'Contemporary legal issues (RTI, IT Act, IPC/BNS)',
                  'Land laws of Rajasthan',
                ],
              },
            ],
          },
          {
            name: 'General Hindi & English',
            short: 'Hindi & English',
            icon: Languages,
            color: '#9a651b',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'Language & essay',
                topics: [
                  'Samanya Hindi — grammar, précis & letter writing (90 marks)',
                  'General English — grammar, comprehension & composition (70 marks)',
                  'Essay in Hindi or English, 600 words (40 marks)',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  MPPSC: {
    fullName: 'MPPSC SSE',
    interviewMarks: '185 marks personality test after Mains',
    stages: [
      {
        key: 'prelims',
        label: 'Prelims',
        sublabel: 'Objective',
        pattern: {
          rows: [
            ['General Studies (Paper I)', '100', '300', '2 hours'],
            ['General Aptitude Test / CSAT (Paper II)', '100', '300', '2 hours'],
          ],
          negativeMarking: '1/3 mark deducted per wrong answer',
          questionType: 'Objective, multiple choice',
          language: 'Hindi & English',
          timeSummary: 'Must pass both papers to qualify for Mains',
        },
        subjects: [
          {
            name: 'General Studies (Paper I)',
            short: 'GS Paper I',
            icon: Globe2,
            color: '#6658d9',
            meta: '100 questions · 300 marks · 2 hours',
            groups: [
              {
                title: 'History & culture',
                topics: [
                  'Ancient Indian knowledge tradition & Vedic era',
                  'Social, religious & administrative history of India',
                  'Independence struggle & national movement',
                  'History, culture & literature of Madhya Pradesh',
                  'Major dynasties, tribes & freedom movement in MP',
                  'Tourist places & world heritage sites in MP',
                ],
              },
              {
                title: 'Geography, polity & economy',
                topics: [
                  'Physical geography of India & natural resources',
                  'Geography of Madhya Pradesh (rivers, climate, minerals)',
                  'Constitutional system of India & MP',
                  'Panchayati Raj & good governance in MP',
                  'Economy of India & Madhya Pradesh',
                  'ODOP, Atma Nirbhar MP & financial institutions',
                ],
              },
              {
                title: 'Science, environment & current affairs',
                topics: [
                  'General science & Indian achievements in space tech',
                  'Human body, nutrition & health programmes',
                  'Environment, biodiversity & disaster management',
                  'Information & communication technology',
                  'Tribes of Madhya Pradesh: heritage & welfare programs',
                  'International, national & MP current events',
                ],
              },
            ],
          },
          {
            name: 'General Aptitude Test (Paper II) — CSAT',
            short: 'CSAT',
            icon: Calculator,
            color: '#078a70',
            meta: '100 questions · 300 marks · 2 hours',
            groups: [
              {
                title: 'Reasoning & comprehension',
                topics: [
                  'Comprehension',
                  'Communication skill',
                  'Logical reasoning & analytical ability',
                  'Decision making & problem solving',
                  'General mental ability',
                ],
              },
              {
                title: 'Numeracy & Hindi',
                topics: [
                  'Basic numeracy (Class X level)',
                  'Data interpretation (charts, graphs, tables)',
                  'Hindi language comprehension (Class X level)',
                ],
              },
            ],
          },
        ],
      },
      {
        key: 'mains',
        label: 'Mains',
        sublabel: 'Descriptive',
        pattern: {
          rows: [
            ['General Studies I', '—', '300', '3 hours'],
            ['General Studies II', '—', '300', '3 hours'],
            ['General Studies III', '—', '300', '3 hours'],
            ['General Studies IV', '—', '200', '3 hours'],
            ['General Hindi', '—', '200', '2 hours'],
            ['Hindi Essay', '—', '100', '2.5 hours'],
          ],
          total: ['Total', '—', '1400 marks', '—'],
          negativeMarking: 'Not applicable — descriptive papers',
          questionType: 'Descriptive (very short, short & long answers, plus a case study in Paper IV)',
          language: 'Hindi or English (Papers V & VI in Hindi only)',
          timeSummary: 'Min. 40% per paper (UR category) · Interview: 185 marks',
        },
        subjects: [
          {
            name: 'General Studies I',
            short: 'GS I',
            icon: Landmark,
            color: '#bd4774',
            meta: '300 marks · 3 hours',
            groups: [
              {
                title: 'History',
                topics: [
                  'India: Harappan civilization to 18th century A.D.',
                  'Sultanate & Mughal administration',
                  'Pre-historic & major dynasties of Madhya Pradesh',
                  'British colonial impact, peasant & tribal revolts',
                  'MP’s contribution to the freedom struggle',
                  'Formation & reorganization of Madhya Pradesh',
                  'Princely states & tribal heroes of MP',
                ],
              },
              {
                title: 'Geography',
                topics: [
                  'Physiographic divisions & climate of India',
                  'Agriculture, irrigation & water resources',
                  'Natural resources, industries & disasters',
                  'Remote sensing, GIS & GPS applications',
                  'Physiographic divisions of Madhya Pradesh',
                  'Rivers, soils, crops & industries of MP',
                ],
              },
            ],
          },
          {
            name: 'General Studies II',
            short: 'GS II',
            icon: Building2,
            color: '#2675b8',
            meta: '300 marks · 3 hours',
            groups: [
              {
                title: 'Constitution, governance & MP administration',
                topics: [
                  'Formation, amendments & basic structure of the Constitution',
                  'Fundamental Rights, Duties & DPSP',
                  'Election Commission, CAG, UPSC, MPPSC & NITI Aayog',
                  'Reorganization & administration of Madhya Pradesh',
                  'Governor, CM, state legislature & MP High Court',
                  'District administration & Panchayati Raj in MP',
                ],
              },
              {
                title: 'Sociology',
                topics: [
                  'Indian society: family, kinship & caste system',
                  'Cultural diversity & unity in India',
                  'Rural & urban sociology, Panchayati Raj',
                  'Industrialization, globalization & population',
                  'Human resource development & welfare schemes',
                  'Tribes of Madhya Pradesh: social structure & culture',
                ],
              },
            ],
          },
          {
            name: 'General Studies III',
            short: 'GS III',
            icon: Calculator,
            color: '#8060a8',
            meta: '300 marks · 3 hours',
            groups: [
              {
                title: 'Economy',
                topics: [
                  'Fundamentals of the Indian economy & Viksit Bharat @2047',
                  'Fiscal policy, taxation & foreign trade',
                  'Overview of Madhya Pradesh economy',
                  'Atma Nirbhar MP, ODOP & tribal economy',
                  'Statistics, data analysis & probability',
                ],
              },
              {
                title: 'Science, technology & public health',
                topics: [
                  'General science & biotechnology',
                  'Computer science & artificial intelligence',
                  'E-governance & digital initiatives',
                  'Patents & intellectual property rights',
                ],
              },
            ],
          },
          {
            name: 'General Studies IV',
            short: 'GS IV',
            icon: Brain,
            color: '#9a651b',
            meta: '200 marks · 3 hours',
            groups: [
              {
                title: 'Philosophy, psychology & public administration',
                topics: ['Philosophy', 'Psychology', 'Public administration', 'Case study'],
              },
              {
                title: 'Management & personality',
                topics: ['Management', 'Personality development', 'Case study'],
              },
            ],
          },
          {
            name: 'General Hindi',
            short: 'Hindi',
            icon: Languages,
            color: '#d36a2e',
            meta: '200 marks · 2 hours · Hindi medium only',
            groups: [
              {
                title: 'सामान्य हिंदी एवं व्याकरण',
                topics: ['Comprehension (गद्यांश)', 'Grammar (व्याकरण)', 'Translation', 'Letter & official writing'],
              },
            ],
          },
          {
            name: 'Hindi Essay',
            short: 'Hindi Essay',
            icon: FileText,
            color: '#6658d9',
            meta: '100 marks · 2.5 hours · Hindi medium only',
            groups: [
              {
                title: 'हिन्दी निबंध एवं प्रारूप लेखन',
                topics: [
                  'First essay, 1000 words (50 marks)',
                  'Second essay, 500 words (20 marks)',
                  'Draft writing, 500 words (15 marks)',
                  'Report writing, 250 words (15 marks)',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

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
              : stateExamData[stateBody]
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
      ) : stateExamData[stateBody] ? (
        <StateWorkspace
          key={stateBody}
          config={stateExamData[stateBody]}
          bodyName={stateBody}
          examName={stateExam}
        />
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

function StateWorkspace({
  config,
  bodyName,
  examName,
}: {
  config: StateExamConfig;
  bodyName: string;
  examName: string;
}) {
  const [stageKey, setStageKey] = useState(config.stages[0].key);
  const [view, setView] = useState<'syllabus' | 'pattern'>('syllabus');
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const stage = config.stages.find((s) => s.key === stageKey) ?? config.stages[0];
  const totalMarks = stage.pattern.rows.reduce((sum, row) => {
    const marks = parseInt(row[2].replace(/[^0-9]/g, ''), 10);
    return sum + (Number.isNaN(marks) ? 0 : marks);
  }, 0);
  const visible = useMemo(
    () =>
      stage.subjects.filter(
        (s) =>
          (filter === 'All' || s.short === filter) &&
          `${s.name} ${s.groups.flatMap((g) => [g.title, ...g.topics]).join(' ')}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [stage, filter, query],
  );

  return (
    <section className="workspace">
      <div className="topline">
        <div>
          <nav>
            {bodyName} <ChevronRight /> <b>{examName}</b>
          </nav>
          <h1>
            {config.fullName} <em>Syllabus</em>
          </h1>
          <p>Official syllabus, organized into papers and topic clusters.</p>
        </div>
      </div>
      <div className="stats">
        <div>
          <b>{config.stages.length}</b>
          <span>Examination stages</span>
        </div>
        <div>
          <b>{stage.subjects.length}</b>
          <span>Papers in {stage.label}</span>
        </div>
        <div>
          <b>{totalMarks || '—'}</b>
          <span>{stage.label} marks</span>
        </div>
        <div>
          <b>{config.interviewMarks.split(' ')[0]}</b>
          <span>Interview marks</span>
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
            <small>Papers and topics</small>
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
          {config.stages.map((s) => (
            <button
              className={stageKey === s.key ? 'active' : ''}
              onClick={() => {
                setStageKey(s.key);
                setFilter('All');
              }}
              key={s.key}
            >
              {s.label}
              <small>{s.sublabel}</small>
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
            {['All', ...stage.subjects.map((s) => s.short)].map((x) => (
              <button
                className={filter === x ? 'active' : ''}
                onClick={() => setFilter(x)}
                key={x}
              >
                {x === 'All' ? 'All papers' : x}
              </button>
            ))}
          </div>
          <div className="sectionhead">
            <div>
              <small>{stage.label}</small>
              <h2>{stage.label} syllabus</h2>
            </div>
            <p>{stage.pattern.timeSummary}</p>
          </div>
          <div className="grid">
            {visible.map((s) => (
              <SubjectCard subject={s} key={s.name} />
            ))}
            {!visible.length && (
              <div className="empty">
                <Search />
                <b>No matching topics</b>
                <span>Try another search or paper.</span>
              </div>
            )}
          </div>
        </>
      ) : (
        <StatePatternPanel stage={stage} />
      )}
    </section>
  );
}

function StatePatternPanel({ stage }: { stage: Stage }) {
  return (
    <section className="pattern-panel">
      <div className="pattern-heading">
        <div>
          <small>{stage.label} · EXAM PATTERN</small>
          <h2>{stage.label} paper structure</h2>
        </div>
        <span>
          <Clock />
          {stage.pattern.timeSummary}
        </span>
      </div>
      <div className="pattern-table" role="table">
        <div className="pattern-row pattern-header" role="row">
          <span>Paper</span>
          <span>Questions</span>
          <span>Marks</span>
          <span>Time</span>
        </div>
        {stage.pattern.rows.map((row, index) => (
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
        {stage.pattern.total && (
          <div className="pattern-total">
            <span>{stage.pattern.total[0]}</span>
            <b>{stage.pattern.total[1]}</b>
            <b>{stage.pattern.total[2]}</b>
            <b>{stage.pattern.total[3]}</b>
          </div>
        )}
      </div>
      <div className="pattern-notes">
        <div>
          <b>Negative marking</b>
          <span>{stage.pattern.negativeMarking}</span>
        </div>
        <div>
          <b>Question type</b>
          <span>{stage.pattern.questionType}</span>
        </div>
        <div>
          <b>Language</b>
          <span>{stage.pattern.language}</span>
        </div>
      </div>
    </section>
  );
}
