'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Brain, Calculator, Check, ChevronRight, Clock, FileText, Globe2, GraduationCap, Languages, Laptop, Landmark, RotateCcw, Search, Sigma, Sparkles } from 'lucide-react';

type Group = { title: string; topics: string[] };
type Subject = { name: string; short: string; icon: typeof Brain; color: string; meta: string; groups: Group[] };

const tier1: Subject[] = [
  { name:'General Intelligence & Reasoning', short:'Reasoning', icon:Brain, color:'#6658d9', meta:'25 questions · 50 marks · 15 minutes', groups:[
    { title:'Analogies & classification', topics:['Semantic analogy','Symbolic / number analogy','Figural analogy','Semantic classification','Symbolic / number classification','Figural classification'] },
    { title:'Series & operations', topics:['Semantic series','Number series','Figural series','Numerical operations','Symbolic operations','Trends'] },
    { title:'Visual reasoning', topics:['Space orientation','Space visualization','Venn diagrams','Pattern folding & unfolding','Figural pattern completion','Embedded figures'] },
    { title:'Applied reasoning', topics:['Problem solving','Coding & decoding','Word building','Drawing inferences','Critical thinking','Emotional intelligence','Social intelligence'] },
    { title:'Matching & indexing', topics:['Indexing','Address matching','Date & city matching','Centre code / roll number classification','Letter / number coding'] }
  ]},
  { name:'General Awareness', short:'Awareness', icon:Globe2, color:'#078a70', meta:'25 questions · 50 marks · 15 minutes', groups:[
    { title:'Current awareness', topics:['Current events','Everyday observations','Scientific aspects of daily experience','Application of awareness to society'] },
    { title:'India & neighbouring countries', topics:['History','Culture','Geography','Economic scene','General policy','Scientific research'] }
  ]},
  { name:'Quantitative Aptitude', short:'Quant', icon:Calculator, color:'#d36a2e', meta:'25 questions · 50 marks · 15 minutes', groups:[
    { title:'Numbers & arithmetic', topics:['Whole numbers','Decimals & fractions','Percentages','Ratio & proportion','Square roots','Averages','Interest','Profit & loss','Discount','Partnership','Mixture & alligation','Time & distance','Time & work'] },
    { title:'Algebra & geometry', topics:['Algebraic identities','Elementary surds','Linear equation graphs','Triangles & centres','Congruence & similarity','Circles, chords & tangents'] },
    { title:'Mensuration & trigonometry', topics:['Quadrilaterals & polygons','Prism, cone & cylinder','Sphere & hemisphere','Pyramid & parallelepiped','Trigonometric ratios','Degree & radian measures','Standard identities','Heights & distances'] },
    { title:'Data interpretation', topics:['Histogram','Frequency polygon','Bar diagram','Pie chart'] }
  ]},
  { name:'English Comprehension', short:'English', icon:Languages, color:'#bd4774', meta:'25 questions · 50 marks · 15 minutes', groups:[
    { title:'English comprehension', topics:['Understanding correct English','Basic comprehension','Writing ability'] }
  ]}
];

const tier2: Subject[] = [
  { name:'Mathematical Abilities', short:'Maths', icon:Calculator, color:'#6658d9', meta:'Paper I · 30 questions', groups:[
    { title:'Numbers & arithmetic', topics:['Whole numbers, decimals & fractions','Percentage, ratio & proportion','Simple & compound interest','Profit, loss & discount','Partnership','Mixture & alligation','Time, distance & work'] },
    { title:'Algebra & geometry', topics:['Algebraic identities & surds','Linear equation graphs','Triangles and centres','Congruence & similarity','Circles, chords & tangents'] },
    { title:'Mensuration & trigonometry', topics:['2D and 3D figures','Trigonometric ratios','Complementary angles','Heights & distances','Standard identities'] },
    { title:'Statistics & probability', topics:['Tables and graphs','Mean, median & mode','Standard deviation','Simple probability'] }
  ]},
  { name:'Reasoning & General Intelligence', short:'Reasoning', icon:Brain, color:'#078a70', meta:'Paper I · 30 questions', groups:[{ title:'Verbal & non-verbal', topics:['Analogies','Symbolic operations','Series','Space orientation','Classification','Venn diagrams','Drawing inferences','Pattern folding','Embedded figures','Critical thinking','Problem solving','Coding & decoding','Social & emotional intelligence'] }] },
  { name:'English Language & Comprehension', short:'English', icon:Languages, color:'#d36a2e', meta:'Paper I · 45 questions', groups:[
    { title:'Language usage', topics:['Vocabulary & grammar','Sentence structure','Synonyms, homonyms & antonyms','Spot the error','Fill in the blanks','Spellings','Idioms & phrases','One-word substitution','Sentence improvement'] },
    { title:'Grammar & comprehension', topics:['Active / passive voice','Direct / indirect narration','Sentence shuffling','Cloze passage','Comprehension passages'] }
  ]},
  { name:'General Awareness', short:'Awareness', icon:Globe2, color:'#bd4774', meta:'Paper I · 25 questions', groups:[{ title:'India, neighbours & current events', topics:['History','Culture','Geography','Economic scene','General policy','Scientific research','Current events & everyday science'] }] },
  { name:'Computer Knowledge', short:'Computer', icon:Laptop, color:'#2675b8', meta:'Paper I · 20 questions · qualifying', groups:[
    { title:'Computer basics', topics:['Computer organization & CPU','Input / output devices','Memory & backup devices','Ports & Windows Explorer','Keyboard shortcuts'] },
    { title:'Software, internet & security', topics:['Windows OS','MS Word, Excel & PowerPoint','Web browsing & search','Email & e-banking','Networking devices & protocols','Cyber threats & prevention'] }
  ]},
  { name:'Statistics', short:'Statistics', icon:Sigma, color:'#8060a8', meta:'Paper II · selected posts only', groups:[
    { title:'Descriptive statistics', topics:['Data collection & presentation','Central tendency','Dispersion','Moments, skewness & kurtosis'] },
    { title:'Probability & inference', topics:['Correlation & regression','Probability theory','Random variables & distributions','Sampling theory','Statistical inference','Analysis of variance'] },
    { title:'Applied statistics', topics:['Time series analysis','Index numbers'] }
  ]},
  { name:'Finance & Economics', short:'Finance', icon:Landmark, color:'#9a651b', meta:'Paper III · selected posts only', groups:[
    { title:'Finance & accounts', topics:['Accounting principles','Single and double entry','Journal, ledger & trial balance','Final accounts & balance sheet','Depreciation & inventory','Bills of exchange'] },
    { title:'Economics & governance', topics:['CAG & Finance Commission','Microeconomics','Demand, supply, production & costs','Market structures','Indian economy','Economic reforms since 1991','Money, banking & fiscal policy','IT in governance'] }
  ]}
];

export default function Home() {
  const [step,setStep]=useState(0);
  const [tier,setTier]=useState<'Tier I'|'Tier II'>('Tier I');
  const [filter,setFilter]=useState('All');
  const [query,setQuery]=useState('');
  const subjects=tier==='Tier I'?tier1:tier2;
  const visible=useMemo(()=>subjects.filter(s=>(filter==='All'||s.short===filter)&&`${s.name} ${s.groups.flatMap(g=>[g.title,...g.topics]).join(' ')}`.toLowerCase().includes(query.toLowerCase())),[subjects,filter,query]);
  const reset=()=>{setStep(0);setTier('Tier I');setFilter('All');setQuery('')};

  return <main>
    <header><div className="brand"><span><BookOpen size={21}/></span>Syllabus<b>Lens</b></div>{step===3&&<button className="change" onClick={reset}><RotateCcw size={15}/>Change exam</button>}</header>
    {step<3?<section className="picker">
      <div className="eyebrow"><Sparkles size={14}/>Official syllabus, made simple</div>
      <h1>What are you<br/><em>preparing for?</em></h1>
      <p>Choose your examination to explore every subject and topic in one clear view.</p>
      <div className="steps">{['Commission','Examination','Year'].map((x,i)=><div className={`${i<step?'done':''} ${i===step?'active':''}`} key={x}><span>{i<step?<Check size={14}/>:i+1}</span><small>{x}</small></div>)}</div>
      <div className="panel">
        {step===0&&<Choice icon={GraduationCap} count="Step 1 of 3" title="Select commission" help="Choose the recruiting body." label="SSC" sub="Staff Selection Commission" onClick={()=>setStep(1)}/>} 
        {step===1&&<Choice icon={FileText} count="Step 2 of 3" title="Select examination" help="Examinations available under SSC." label="CGL" sub="Combined Graduate Level" onClick={()=>setStep(2)}/>} 
        {step===2&&<Choice icon={FileText} count="Step 3 of 3" title="Select syllabus year" help="Choose the official notification to analyze." label="CGL 2026" sub="Official notification · 21 May 2026" onClick={()=>setStep(3)}/>} 
      </div>
      <div className="verified"><Check size={14}/>Content taken from the official SSC notification.</div>
    </section>:<section className="workspace">
      <div className="topline"><div><nav>SSC <ChevronRight/> CGL <ChevronRight/> <b>2026</b></nav><h1>SSC CGL <em>2026</em></h1><p>Official syllabus, organized into subjects and topic clusters.</p></div><a href="/SSC-CGL-2026.pdf" target="_blank"><FileText/><span><b>Official notification</b><small>Pages 24–36 · PDF</small></span><ArrowRight/></a></div>
      <div className="stats"><div><b>2</b><span>Examination tiers</span></div><div><b>{tier==='Tier I'?4:7}</b><span>{tier==='Tier I'?'Core subjects':'Papers & sections'}</span></div><div><b>{tier==='Tier I'?100:'450+'}</b><span>Questions</span></div><div><b>{tier==='Tier I'?200:'690+'}</b><span>Maximum marks</span></div></div>
      <div className="tools"><div className="tabs">{(['Tier I','Tier II'] as const).map(t=><button className={tier===t?'active':''} onClick={()=>{setTier(t);setFilter('All')}} key={t}>{t}<small>{t==='Tier I'?'Screening':'Mains'}</small></button>)}</div><label><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search topics..."/></label></div>
      <div className="filters">{['All',...subjects.map(s=>s.short)].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x==='All'?'All subjects':x}</button>)}</div>
      <div className="sectionhead"><div><small>{tier}</small><h2>{tier==='Tier I'?'Foundation syllabus':'Advanced syllabus'}</h2></div><p>{tier==='Tier I'?'All four subjects are compulsory.':'Paper I is compulsory. Papers II and III apply only to selected posts.'}</p></div>
      <div className="grid">{visible.map(s=><SubjectCard subject={s} key={s.name}/>)}{!visible.length&&<div className="empty"><Search/><b>No matching topics</b><span>Try another search or subject.</span></div>}</div>
      <aside><Clock/><div><b>Exam pattern note</b><p>Tier I has a 15-minute sectional timer for each subject and a penalty of 0.50 marks for every wrong answer. Tier II rules vary by paper and section.</p></div></aside>
    </section>}
  </main>
}

function Choice({icon:Icon,count,title,help,label,sub,onClick}:{icon:typeof GraduationCap;count:string;title:string;help:string;label:string;sub:string;onClick:()=>void}){return <><div className="panelTitle"><span><Icon/></span><div><small>{count}</small><h2>{title}</h2><p>{help}</p></div></div><button className="choice" onClick={onClick}><i>{label.slice(0,3)}</i><span><b>{label}</b><small>{sub}</small></span><ArrowRight/></button></>}

function SubjectCard({subject}:{subject:Subject}){const [open,setOpen]=useState(false);const Icon=subject.icon;const count=subject.groups.reduce((n,g)=>n+g.topics.length,0);return <article className="card" style={{'--c':subject.color} as React.CSSProperties}><div className="cardtop"><i><Icon/></i><div><h3>{subject.name}</h3><p>{subject.meta}</p></div><span>{count} topics</span></div><div className="groups">{(open?subject.groups:subject.groups.slice(0,2)).map(g=><div className="group" key={g.title}><h4>{g.title}</h4><div>{g.topics.map(t=><span key={t}>{t}</span>)}</div></div>)}</div>{subject.groups.length>2&&<button className="more" onClick={()=>setOpen(!open)}>{open?'Show less':`View ${subject.groups.length-2} more groups`}<ChevronRight className={open?'turn':''}/></button>}</article>}
