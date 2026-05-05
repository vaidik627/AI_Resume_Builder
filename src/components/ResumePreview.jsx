import React from 'react';

// ─── Shared helpers ───────────────────────────────────────────────────────────

const Bullets = ({ text, color = '#000', size = '12px' }) => {
  if (!text) return null;
  const lines = text.split('\n').filter(l => l.trim());
  if (!lines.length) return null;
  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} style={{ display: 'flex', gap: '5px', alignItems: 'flex-start', marginBottom: '1px' }}>
          <span style={{ flexShrink: 0, fontSize: size, lineHeight: '1.5', color }}>•</span>
          <span style={{ fontSize: size, lineHeight: '1.5', color }}>{line.replace(/^[•\-–]\s*/, '')}</span>
        </div>
      ))}
    </div>
  );
};

const contactStr = (p, sep = ' | ') =>
  [p.phone, p.location, p.email, p.linkedin, p.github].filter(Boolean).join(sep);

const joinSkills = (cats) => (cats || []).map(s => s.items).filter(Boolean).join(', ');

const EduRow = ({ uni, deg, yr, gpa, color, italic }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{uni}</div>
      <div style={{ fontSize: '13px', color: '#444', fontStyle: italic ? 'italic' : 'normal' }}>{deg}</div>
    </div>
    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px', fontSize: '13px', color: color || '#555' }}>
      <div>{yr}</div>
      {gpa && <div>GPA: {gpa}</div>}
    </div>
  </div>
);

// ─── Template 10: FAANG / Jake Ryan — PRIMARY TEMPLATE ────────────────────────
// Matches LaTeX-style academic resume (Overleaf Jake Ryan style)
const Template10 = ({ data: { personalInfo: p, summary, education, skillCategories, experience, projects, certifications, achievements } }) => {
  const line1 = [p.phone, p.location].filter(Boolean).join(' ⋄ ');
  const line2 = [p.email, p.linkedin, p.github].filter(Boolean).join(' ⋄ ');
  const validSkills = skillCategories.filter(s => s.items && s.items.trim());
  const validEdu = education.filter(e => e.degree || e.university);
  const validExp = experience.filter(x => x.company || x.role);
  const validProj = projects.filter(x => x.title);

  return (
    <div style={{ fontFamily: '"Times New Roman", Georgia, serif', padding: '36px 48px 36px 48px', color: '#000', fontSize: '11.5px', lineHeight: '1.35' }}>

      {/* ── Name & Contact ── */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <div style={{ fontSize: '22px', fontWeight: 'bold', letterSpacing: '0.5px' }}>{p.fullName || 'Your Name'}</div>
        {line1 && <div style={{ fontSize: '11px', marginTop: '4px', color: '#111' }}>{line1}</div>}
        {line2 && <div style={{ fontSize: '11px', marginTop: '2px', color: '#111' }}>{line2}</div>}
      </div>

      {/* ── Objective ── */}
      {summary && summary.trim() && (
        <div style={{ marginBottom: '9px' }}>
          <T10Sec t="Objective" />
          <div style={{ fontSize: '11.5px', lineHeight: '1.6', textAlign: 'justify' }}>{summary}</div>
        </div>
      )}

      {/* ── Education ── */}
      {validEdu.length > 0 && (
        <div style={{ marginBottom: '9px' }}>
          <T10Sec t="Education" />
          {validEdu.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 'bold', fontSize: '12.5px' }}>{edu.degree}</div>
                {edu.university && <div style={{ fontSize: '11.5px' }}>{edu.university}</div>}
                {edu.cgpa && <div style={{ fontSize: '11.5px' }}>{/[%]/.test(edu.cgpa) || /percentage/i.test(edu.cgpa) ? `Percentage: ${edu.cgpa}` : `GPA: ${edu.cgpa}`}</div>}
              </div>
              {edu.gradYear && <div style={{ flexShrink: 0, marginLeft: '12px', fontSize: '11.5px' }}>{edu.gradYear}</div>}
            </div>
          ))}
        </div>
      )}

      {/* ── Skills — flex-based (no <table>: html2canvas renders tables incorrectly) ── */}
      {validSkills.length > 0 && (
        <div style={{ marginBottom: '9px' }}>
          <T10Sec t="Skills" />
          {validSkills.map((sc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', fontSize: '11.5px', lineHeight: '1.6', marginBottom: '1px' }}>
              <div style={{ fontWeight: 'bold', flexShrink: 0, width: '158px', paddingRight: '8px' }}>{sc.category}</div>
              <div style={{ flex: 1 }}>{sc.items}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Experience ── */}
      {validExp.length > 0 && (
        <div style={{ marginBottom: '9px' }}>
          <T10Sec t="Experience" />
          {validExp.map((x, i) => (
            <div key={i} style={{ marginBottom: '7px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontWeight: 'bold', fontSize: '12.5px' }}>
                  {x.role}{x.company ? ` — ` : ''}<span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>{x.company}</span>
                </div>
                <div style={{ flexShrink: 0, marginLeft: '12px', fontSize: '11.5px' }}>{x.duration}</div>
              </div>
              {x.location && <div style={{ fontSize: '11px', fontStyle: 'italic', color: '#333', marginTop: '1px' }}>{x.location}</div>}
              <div style={{ marginTop: '2px' }}>
                <Bullets text={x.description} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Projects ── */}
      {validProj.length > 0 && (
        <div style={{ marginBottom: '9px' }}>
          <T10Sec t="Projects" />
          {validProj.map((x, i) => (
            <div key={i} style={{ marginBottom: '6px' }}>
              <div style={{ fontSize: '11.5px', lineHeight: '1.55' }}>
                <b>{x.title}{x.technologies ? ` (${x.technologies})` : ''}</b>
                {x.description
                  ? ` ${x.description.trim().split('\n').map(l => l.replace(/^[•\-–]\s*/, '')).filter(Boolean).join(' ')}`
                  : ''}
              </div>
              {x.technologies && (
                <div style={{ fontSize: '11px', fontStyle: 'italic', color: '#222', marginTop: '1px' }}>
                  Tech: {x.technologies}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Certifications ── */}
      {certifications && certifications.trim() && (
        <div style={{ marginBottom: '9px' }}>
          <T10Sec t="Certifications" />
          <Bullets text={certifications} />
        </div>
      )}

      {/* ── Awards & Achievements ── */}
      {achievements && achievements.trim() && (
        <div style={{ marginBottom: '9px' }}>
          <T10Sec t="Awards & Achievements" />
          <Bullets text={achievements} />
        </div>
      )}
    </div>
  );
};

// FAANG-style section header: UPPERCASE BOLD + full-width rule to the right
const T10Sec = ({ t }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
    <div style={{ fontWeight: 'bold', fontSize: '13px', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{t.toUpperCase()}</div>
    <div style={{ flex: 1, borderTop: '1.5px solid #000' }} />
  </div>
);

// ─── Template 1: Classic ─────────────────────────────────────────────────────
const Template1 = ({ data: { personalInfo: p, summary, education, skillCategories, experience, projects, certifications, achievements } }) => (
  <div style={{ fontFamily: 'Georgia, serif', padding: '40px 50px', color: '#111', fontSize: '13px' }}>
    <div style={{ textAlign: 'center', borderBottom: '2px solid #111', paddingBottom: '10px', marginBottom: '16px' }}>
      <div style={{ fontSize: '26px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.fullName || 'Your Name'}</div>
      <div style={{ fontSize: '12px', color: '#444', marginTop: '5px' }}>{contactStr(p)}</div>
    </div>
    {summary && <Sec1 t="Objective"><div style={{ lineHeight: '1.6' }}>{summary}</div></Sec1>}
    {education.some(e => e.degree || e.university) && (
      <Sec1 t="Education">
        {education.filter(e => e.degree || e.university).map((e, i) => <EduRow key={i} uni={e.university} deg={e.degree} yr={e.gradYear} gpa={e.cgpa} />)}
      </Sec1>
    )}
    {skillCategories.some(s => s.items) && (
      <Sec1 t="Skills">
        {skillCategories.map((sc, i) => (
          <div key={i} style={{ lineHeight: '1.7' }}>{sc.category ? <><b>{sc.category}:</b> {sc.items}</> : sc.items}</div>
        ))}
      </Sec1>
    )}
    {experience.some(x => x.company) && (
      <Sec1 t="Experience">
        {experience.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b style={{ fontSize: '14px' }}>{x.role}</b>
              <span style={{ color: '#555' }}>{x.duration}</span>
            </div>
            <div style={{ fontStyle: 'italic', color: '#555', marginBottom: '3px' }}>{x.company}{x.location ? ` · ${x.location}` : ''}</div>
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec1>
    )}
    {projects.some(x => x.title) && (
      <Sec1 t="Projects">
        {projects.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <b style={{ fontSize: '14px' }}>{x.title}</b>{x.technologies && <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#555' }}> | {x.technologies}</span>}
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec1>
    )}
    {certifications && certifications.trim() && <Sec1 t="Certifications"><Bullets text={certifications} size="13px" /></Sec1>}
    {achievements && achievements.trim() && <Sec1 t="Awards & Achievements"><Bullets text={achievements} size="13px" /></Sec1>}
  </div>
);
const Sec1 = ({ t, children }) => (
  <div style={{ marginBottom: '14px' }}>
    <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1.5px solid #111', paddingBottom: '2px', marginBottom: '8px' }}>{t}</div>
    {children}
  </div>
);

// ─── Template 2: Academic ────────────────────────────────────────────────────
const Template2 = ({ data: { personalInfo: p, summary, education, skillCategories, experience, projects, certifications, achievements } }) => (
  <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', padding: '44px 52px', color: '#1a1a1a', fontSize: '13px' }}>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' }}>{p.fullName || 'Your Name'}</div>
      <div style={{ fontSize: '12px', color: '#555', marginTop: '5px' }}>{contactStr(p, ' ❖ ')}</div>
    </div>
    {summary && <Sec2 t="Objective"><div style={{ lineHeight: '1.6' }}>{summary}</div></Sec2>}
    {education.some(e => e.degree || e.university) && (
      <Sec2 t="Education">
        {education.filter(e => e.degree || e.university).map((e, i) => <EduRow key={i} uni={e.university} deg={e.degree} yr={e.gradYear} gpa={e.cgpa} />)}
      </Sec2>
    )}
    {skillCategories.some(s => s.items) && (
      <Sec2 t="Technical Skills">
        {skillCategories.map((sc, i) => <div key={i} style={{ lineHeight: '1.7' }}>{sc.category ? <><b>{sc.category}:</b> {sc.items}</> : sc.items}</div>)}
      </Sec2>
    )}
    {experience.some(x => x.company) && (
      <Sec2 t="Experience">
        {experience.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><b style={{ fontSize: '14px' }}>{x.role}</b><span style={{ color: '#555' }}>, <i>{x.company}</i></span></div>
              <span style={{ color: '#555', flexShrink: 0, marginLeft: '12px' }}>{x.duration}</span>
            </div>
            {x.location && <div style={{ fontSize: '12px', color: '#777', fontStyle: 'italic' }}>{x.location}</div>}
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec2>
    )}
    {projects.some(x => x.title) && (
      <Sec2 t="Projects">
        {projects.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <b style={{ fontSize: '14px' }}>{x.title}</b>{x.technologies && <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#555' }}> ({x.technologies})</span>}
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec2>
    )}
    {certifications && certifications.trim() && <Sec2 t="Certifications"><Bullets text={certifications} size="13px" /></Sec2>}
    {achievements && achievements.trim() && <Sec2 t="Awards & Achievements"><Bullets text={achievements} size="13px" /></Sec2>}
  </div>
);
const Sec2 = ({ t, children }) => (
  <div style={{ marginBottom: '14px' }}>
    <div style={{ fontSize: '13px', fontWeight: 'bold', fontVariant: 'small-caps', letterSpacing: '1px', borderBottom: '1px solid #888', paddingBottom: '2px', marginBottom: '8px' }}>{t}</div>
    {children}
  </div>
);

// ─── Template 3: Technical ───────────────────────────────────────────────────
const Template3 = ({ data: { personalInfo: p, summary, education, skillCategories, experience, projects, certifications, achievements } }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '36px 44px', color: '#111', fontSize: '13px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2.5px solid #111', paddingBottom: '10px', marginBottom: '16px' }}>
      <div style={{ fontSize: '28px', fontWeight: '900', textTransform: 'uppercase' }}>{p.fullName || 'Your Name'}</div>
      <div style={{ textAlign: 'right', fontSize: '12px', color: '#444', lineHeight: '1.8', flexShrink: 0, marginLeft: '20px' }}>
        {[p.email, p.phone, p.linkedin, p.github, p.location].filter(Boolean).map((v, i) => <div key={i}>{v}</div>)}
      </div>
    </div>
    {summary && <Sec3 t="Objective"><div style={{ lineHeight: '1.6' }}>{summary}</div></Sec3>}
    {education.some(e => e.degree || e.university) && (
      <Sec3 t="Education">
        {education.filter(e => e.degree || e.university).map((e, i) => <EduRow key={i} uni={e.university} deg={e.degree} yr={e.gradYear} gpa={e.cgpa} />)}
      </Sec3>
    )}
    {skillCategories.some(s => s.items) && (
      <Sec3 t="Skills">
        {skillCategories.map((sc, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', lineHeight: '1.7' }}>
            {sc.category && <b style={{ minWidth: '120px', flexShrink: 0 }}>{sc.category}:</b>}
            <span>{sc.items}</span>
          </div>
        ))}
      </Sec3>
    )}
    {experience.some(x => x.company) && (
      <Sec3 t="Experience">
        {experience.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px', borderLeft: '3px solid #555', paddingLeft: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b style={{ fontSize: '14px' }}>{x.role} — {x.company}</b>
              <span style={{ color: '#555', flexShrink: 0, marginLeft: '12px' }}>{x.duration}</span>
            </div>
            {x.location && <div style={{ fontSize: '12px', color: '#777' }}>{x.location}</div>}
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec3>
    )}
    {projects.some(x => x.title) && (
      <Sec3 t="Projects">
        {projects.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px', borderLeft: '3px solid #555', paddingLeft: '10px' }}>
            <b style={{ fontSize: '14px' }}>{x.title}</b>{x.technologies && <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#555' }}> · {x.technologies}</span>}
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec3>
    )}
    {certifications && certifications.trim() && <Sec3 t="Certifications"><Bullets text={certifications} size="13px" /></Sec3>}
    {achievements && achievements.trim() && <Sec3 t="Awards & Achievements"><Bullets text={achievements} size="13px" /></Sec3>}
  </div>
);
const Sec3 = ({ t, children }) => (
  <div style={{ marginBottom: '14px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
      <span style={{ display: 'inline-block', width: '3px', height: '14px', background: '#111', borderRadius: '2px', flexShrink: 0 }} />{t}
    </div>
    {children}
  </div>
);

// ─── Template 4: Modern Teal ─────────────────────────────────────────────────
const TL = '#0d9488';
const Template4 = ({ data: { personalInfo: p, summary, education, skillCategories, experience, projects, certifications, achievements } }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '36px 44px', color: '#111', fontSize: '13px' }}>
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '28px', fontWeight: '800' }}>{p.fullName || 'Your Name'}</div>
      <div style={{ fontSize: '12px', color: TL, marginTop: '4px' }}>{contactStr(p)}</div>
    </div>
    {summary && <Sec4 t="Objective"><div style={{ lineHeight: '1.6' }}>{summary}</div></Sec4>}
    {education.some(e => e.degree || e.university) && (
      <Sec4 t="Education">
        {education.filter(e => e.degree || e.university).map((e, i) => <EduRow key={i} uni={e.university} deg={e.degree} yr={e.gradYear} gpa={e.cgpa} color={TL} />)}
      </Sec4>
    )}
    {skillCategories.some(s => s.items) && (
      <Sec4 t="Skills">
        {skillCategories.filter(s => s.items && s.items.trim()).map((sc, i) => (
          <div key={i} style={{ marginBottom: '6px' }}>
            {sc.category && <div style={{ fontSize: '11.5px', fontWeight: 'bold', color: TL, marginBottom: '3px' }}>{sc.category}</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {sc.items.split(',').filter(s => s.trim()).map((s, j) => (
                <span key={j} style={{ fontSize: '11px', padding: '2px 9px', borderRadius: '20px', border: `1px solid ${TL}`, color: TL }}>{s.trim()}</span>
              ))}
            </div>
          </div>
        ))}
      </Sec4>
    )}
    {experience.some(x => x.company) && (
      <Sec4 t="Experience">
        {experience.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b style={{ fontSize: '14px' }}>{x.role}</b>
              <span style={{ color: '#555', flexShrink: 0, marginLeft: '12px' }}>{x.duration}</span>
            </div>
            <div style={{ fontStyle: 'italic', color: TL, marginBottom: '3px' }}>{x.company}{x.location ? ` · ${x.location}` : ''}</div>
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec4>
    )}
    {projects.some(x => x.title) && (
      <Sec4 t="Projects">
        {projects.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <b style={{ fontSize: '14px' }}>{x.title}</b>{x.technologies && <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#555' }}> · {x.technologies}</span>}
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec4>
    )}
    {certifications && certifications.trim() && <Sec4 t="Certifications"><Bullets text={certifications} size="13px" /></Sec4>}
    {achievements && achievements.trim() && <Sec4 t="Awards & Achievements"><Bullets text={achievements} size="13px" /></Sec4>}
  </div>
);
const Sec4 = ({ t, children }) => (
  <div style={{ marginBottom: '14px' }}>
    <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', color: TL, borderBottom: `2px solid ${TL}`, paddingBottom: '2px', marginBottom: '8px' }}>{t}</div>
    {children}
  </div>
);

// ─── Template 5: Clean CS ────────────────────────────────────────────────────
const Template5 = ({ data: { personalInfo: p, summary, education, skillCategories, experience, projects, certifications, achievements } }) => (
  <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', padding: '40px 50px', color: '#222', fontSize: '13px' }}>
    <div style={{ textAlign: 'center', marginBottom: '6px' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{p.fullName || 'Your Name'}</div>
      <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>{contactStr(p)}</div>
    </div>
    <div style={{ borderTop: '1.5px solid #555', margin: '12px 0' }} />
    {summary && <Sec5 t="Objective"><div style={{ lineHeight: '1.6' }}>{summary}</div></Sec5>}
    {education.some(e => e.degree || e.university) && (
      <Sec5 t="Education">
        {education.filter(e => e.degree || e.university).map((e, i) => <EduRow key={i} uni={e.university} deg={e.degree} yr={e.gradYear} gpa={e.cgpa} />)}
      </Sec5>
    )}
    {skillCategories.some(s => s.items) && (
      <Sec5 t="Technical Skills">
        {skillCategories.map((sc, i) => <div key={i} style={{ lineHeight: '1.7' }}>{sc.category ? <><b>{sc.category}:</b> {sc.items}</> : sc.items}</div>)}
      </Sec5>
    )}
    {experience.some(x => x.company) && (
      <Sec5 t="Work Experience">
        {experience.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b style={{ fontSize: '14px' }}>{x.role}, {x.company}</b>
              <span style={{ color: '#555', flexShrink: 0, marginLeft: '12px' }}>{x.duration}</span>
            </div>
            {x.location && <div style={{ fontSize: '12px', color: '#777' }}>{x.location}</div>}
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec5>
    )}
    {projects.some(x => x.title) && (
      <Sec5 t="Projects">
        {projects.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <b style={{ fontSize: '14px' }}>{x.title}</b>{x.technologies && <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#555' }}> | {x.technologies}</span>}
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec5>
    )}
    {certifications && certifications.trim() && <Sec5 t="Certifications"><Bullets text={certifications} size="13px" /></Sec5>}
    {achievements && achievements.trim() && <Sec5 t="Awards & Achievements"><Bullets text={achievements} size="13px" /></Sec5>}
  </div>
);
const Sec5 = ({ t, children }) => (
  <div style={{ marginBottom: '14px' }}>
    <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#444', borderBottom: '1px solid #ccc', paddingBottom: '2px', marginBottom: '8px' }}>{t}</div>
    {children}
  </div>
);

// ─── Template 6: Corporate Blue ──────────────────────────────────────────────
const BL = '#1d4ed8';
const Template6 = ({ data: { personalInfo: p, summary, education, skillCategories, experience, projects, certifications, achievements } }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '36px 50px', color: '#111', fontSize: '13px' }}>
    <div style={{ textAlign: 'center', marginBottom: '4px' }}>
      <div style={{ fontSize: '22px', fontWeight: 'bold', letterSpacing: '5px', textTransform: 'uppercase' }}>{p.fullName || 'YOUR NAME'}</div>
      <div style={{ fontSize: '12px', color: BL, marginTop: '4px' }}>{contactStr(p)}</div>
    </div>
    <div style={{ borderTop: `2px solid ${BL}`, margin: '10px 0 16px' }} />
    {summary && <Sec6 t="Objective"><div style={{ lineHeight: '1.6' }}>{summary}</div></Sec6>}
    {education.some(e => e.degree || e.university) && (
      <Sec6 t="Education">
        {education.filter(e => e.degree || e.university).map((e, i) => <EduRow key={i} uni={e.university} deg={e.degree} yr={e.gradYear} gpa={e.cgpa} color={BL} />)}
      </Sec6>
    )}
    {skillCategories.some(s => s.items) && (
      <Sec6 t="Core Skills">
        {skillCategories.map((sc, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', lineHeight: '1.7' }}>
            {sc.category && <b style={{ minWidth: '120px', flexShrink: 0, color: BL }}>{sc.category}:</b>}
            <span>{sc.items}</span>
          </div>
        ))}
      </Sec6>
    )}
    {experience.some(x => x.company) && (
      <Sec6 t="Professional Experience">
        {experience.map((x, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            {i > 0 && <div style={{ borderTop: '1px dashed #ccc', marginBottom: '8px' }} />}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b style={{ fontSize: '14px', color: BL }}>{x.role}</b>
              <span style={{ color: '#555', flexShrink: 0, marginLeft: '12px' }}>{x.duration}</span>
            </div>
            <div style={{ fontStyle: 'italic', color: '#555', marginBottom: '3px' }}>{x.company}{x.location ? ` · ${x.location}` : ''}</div>
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec6>
    )}
    {projects.some(x => x.title) && (
      <Sec6 t="Key Projects">
        {projects.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <b style={{ fontSize: '14px', color: BL }}>{x.title}</b>{x.technologies && <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#555' }}> · {x.technologies}</span>}
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec6>
    )}
    {certifications && certifications.trim() && <Sec6 t="Certifications"><Bullets text={certifications} size="13px" /></Sec6>}
    {achievements && achievements.trim() && <Sec6 t="Awards & Achievements"><Bullets text={achievements} size="13px" /></Sec6>}
  </div>
);
const Sec6 = ({ t, children }) => (
  <div style={{ marginBottom: '14px' }}>
    <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', color: BL, borderBottom: `2px solid ${BL}`, paddingBottom: '2px', marginBottom: '8px' }}>{t}</div>
    {children}
  </div>
);

// ─── Template 7: Minimal Blue ────────────────────────────────────────────────
const MB = '#2563eb';
const Template7 = ({ data: { personalInfo: p, summary, education, skillCategories, experience, projects, certifications, achievements } }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px 50px', color: '#111', fontSize: '13px' }}>
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '28px', fontWeight: '700' }}>{p.fullName || 'Your Name'}</div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{contactStr(p)}</div>
      <div style={{ width: '48px', height: '4px', background: MB, borderRadius: '2px', marginTop: '8px' }} />
    </div>
    {summary && <Sec7 t="Objective"><div style={{ lineHeight: '1.6' }}>{summary}</div></Sec7>}
    {education.some(e => e.degree || e.university) && (
      <Sec7 t="Education">
        {education.filter(e => e.degree || e.university).map((e, i) => <EduRow key={i} uni={e.university} deg={e.degree} yr={e.gradYear} gpa={e.cgpa} color={MB} />)}
      </Sec7>
    )}
    {skillCategories.some(s => s.items) && (
      <Sec7 t="Skills">
        {skillCategories.filter(s => s.items && s.items.trim()).map((sc, i) => (
          <div key={i} style={{ marginBottom: '6px' }}>
            {sc.category && <div style={{ fontSize: '11.5px', fontWeight: 'bold', color: MB, marginBottom: '3px' }}>{sc.category}</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {sc.items.split(',').filter(s => s.trim()).map((s, j) => (
                <span key={j} style={{ fontSize: '11px', padding: '2px 9px', borderRadius: '4px', background: '#eff6ff', color: MB }}>{s.trim()}</span>
              ))}
            </div>
          </div>
        ))}
      </Sec7>
    )}
    {experience.some(x => x.company) && (
      <Sec7 t="Experience">
        {experience.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b style={{ fontSize: '14px' }}>{x.role}</b>
              <span style={{ color: '#777', flexShrink: 0, marginLeft: '12px' }}>{x.duration}</span>
            </div>
            <div style={{ color: '#777', marginBottom: '3px' }}>{x.company}{x.location ? ` · ${x.location}` : ''}</div>
            <Bullets text={x.description} color="#374151" size="13px" />
          </div>
        ))}
      </Sec7>
    )}
    {projects.some(x => x.title) && (
      <Sec7 t="Projects">
        {projects.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <b style={{ fontSize: '14px' }}>{x.title}</b>{x.technologies && <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#777' }}> ({x.technologies})</span>}
            <Bullets text={x.description} color="#374151" size="13px" />
          </div>
        ))}
      </Sec7>
    )}
    {certifications && certifications.trim() && <Sec7 t="Certifications"><Bullets text={certifications} color="#374151" size="13px" /></Sec7>}
    {achievements && achievements.trim() && <Sec7 t="Awards & Achievements"><Bullets text={achievements} color="#374151" size="13px" /></Sec7>}
  </div>
);
const Sec7 = ({ t, children }) => (
  <div style={{ marginBottom: '14px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
      <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: MB }}>{t}</div>
      <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
    </div>
    {children}
  </div>
);

// ─── Template 8: Formal ──────────────────────────────────────────────────────
const Template8 = ({ data: { personalInfo: p, summary, education, skillCategories, experience, projects, certifications, achievements } }) => (
  <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', padding: '44px 54px', color: '#1a1a1a', fontSize: '13px' }}>
    <div style={{ textAlign: 'center', borderBottom: '2px solid #1a1a1a', paddingBottom: '12px', marginBottom: '20px' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '3px', textTransform: 'uppercase' }}>{p.fullName || 'Your Name'}</div>
      <div style={{ fontSize: '12px', color: '#555', marginTop: '6px' }}>{contactStr(p, ' ❖ ')}</div>
    </div>
    {summary && <Sec8 t="Objective"><div style={{ lineHeight: '1.6', textAlign: 'justify' }}>{summary}</div></Sec8>}
    {education.some(e => e.degree || e.university) && (
      <Sec8 t="Education">
        {education.filter(e => e.degree || e.university).map((e, i) => <EduRow key={i} uni={e.university} deg={e.degree} yr={e.gradYear} gpa={e.cgpa} />)}
      </Sec8>
    )}
    {skillCategories.some(s => s.items) && (
      <Sec8 t="Skills & Expertise">
        {skillCategories.map((sc, i) => <div key={i} style={{ lineHeight: '1.7', textAlign: 'center' }}>{sc.category ? <><b>{sc.category}:</b> {sc.items}</> : sc.items}</div>)}
      </Sec8>
    )}
    {experience.some(x => x.company) && (
      <Sec8 t="Professional Experience">
        {experience.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><b style={{ fontSize: '14px' }}>{x.role}</b> — <i>{x.company}</i></div>
              <span style={{ color: '#555', flexShrink: 0, marginLeft: '12px' }}>{x.duration}</span>
            </div>
            {x.location && <div style={{ fontSize: '12px', color: '#777', fontStyle: 'italic' }}>{x.location}</div>}
            <Bullets text={x.description} color="#374151" size="13px" />
          </div>
        ))}
      </Sec8>
    )}
    {projects.some(x => x.title) && (
      <Sec8 t="Projects">
        {projects.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <b style={{ fontSize: '14px' }}>{x.title}</b>{x.technologies && <i style={{ fontWeight: 'normal', fontSize: '12px', color: '#555' }}> ({x.technologies})</i>}
            <Bullets text={x.description} color="#374151" size="13px" />
          </div>
        ))}
      </Sec8>
    )}
    {certifications && certifications.trim() && <Sec8 t="Certifications"><Bullets text={certifications} color="#374151" size="13px" /></Sec8>}
    {achievements && achievements.trim() && <Sec8 t="Awards & Achievements"><Bullets text={achievements} color="#374151" size="13px" /></Sec8>}
  </div>
);
const Sec8 = ({ t, children }) => (
  <div style={{ marginBottom: '14px' }}>
    <div style={{ fontSize: '13px', fontWeight: 'bold', fontVariant: 'small-caps', borderBottom: '1px solid #555', paddingBottom: '2px', marginBottom: '8px', textAlign: 'center' }}>{t}</div>
    {children}
  </div>
);

// ─── Template 9: Student ─────────────────────────────────────────────────────
const GR = '#059669';
const Template9 = ({ data: { personalInfo: p, summary, education, skillCategories, experience, projects, certifications, achievements } }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '36px 44px', color: '#111', fontSize: '13px' }}>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <div style={{ fontSize: '26px', fontWeight: 'bold' }}>{p.fullName || 'Your Name'}</div>
      <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>{contactStr(p)}</div>
    </div>
    {summary && <Sec9 t="Objective"><div style={{ lineHeight: '1.6' }}>{summary}</div></Sec9>}
    {education.some(e => e.degree || e.university) && (
      <Sec9 t="Education">
        {education.filter(e => e.degree || e.university).map((e, i) => <EduRow key={i} uni={e.university} deg={e.degree} yr={e.gradYear} gpa={e.cgpa} color={GR} />)}
      </Sec9>
    )}
    {skillCategories.some(s => s.items) && (
      <Sec9 t="Skills">
        {skillCategories.filter(s => s.items && s.items.trim()).map((sc, i) => (
          <div key={i} style={{ marginBottom: '6px' }}>
            {sc.category && <div style={{ fontSize: '11.5px', fontWeight: 'bold', color: GR, marginBottom: '3px' }}>{sc.category}</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {sc.items.split(',').filter(s => s.trim()).map((s, j) => (
                <span key={j} style={{ fontSize: '11px', padding: '2px 9px', borderRadius: '20px', background: '#f0fdf4', color: GR, border: '1px solid #bbf7d0' }}>{s.trim()}</span>
              ))}
            </div>
          </div>
        ))}
      </Sec9>
    )}
    {projects.some(x => x.title) && (
      <Sec9 t="Projects">
        {projects.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <b style={{ fontSize: '14px' }}>{x.title}</b>{x.technologies && <span style={{ fontWeight: 'normal', fontSize: '12px', color: '#555' }}> | {x.technologies}</span>}
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec9>
    )}
    {experience.some(x => x.company) && (
      <Sec9 t="Experience / Internships">
        {experience.map((x, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b style={{ fontSize: '14px' }}>{x.role}</b>
              <span style={{ color: '#555', flexShrink: 0, marginLeft: '12px' }}>{x.duration}</span>
            </div>
            <div style={{ fontStyle: 'italic', color: GR, marginBottom: '3px' }}>{x.company}{x.location ? ` · ${x.location}` : ''}</div>
            <Bullets text={x.description} size="13px" />
          </div>
        ))}
      </Sec9>
    )}
    {certifications && certifications.trim() && <Sec9 t="Certifications"><Bullets text={certifications} size="13px" /></Sec9>}
    {achievements && achievements.trim() && <Sec9 t="Awards & Achievements"><Bullets text={achievements} size="13px" /></Sec9>}
  </div>
);
const Sec9 = ({ t, children }) => (
  <div style={{ marginBottom: '14px' }}>
    <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', color: GR, borderBottom: `2px solid ${GR}`, paddingBottom: '2px', marginBottom: '8px' }}>{t}</div>
    {children}
  </div>
);

// ─── Router ──────────────────────────────────────────────────────────────────
const MAP = { 1: Template1, 2: Template2, 3: Template3, 4: Template4, 5: Template5, 6: Template6, 7: Template7, 8: Template8, 9: Template9, 10: Template10 };

const ResumePreview = ({ templateId = 10, personalInfo, summary = '', education, skillCategories, experience, projects, certifications = '', achievements = '' }) => {
  const C = MAP[templateId] || Template10;
  return <C data={{ personalInfo, summary, education, skillCategories, experience, projects, certifications, achievements }} />;
};

export default ResumePreview;
