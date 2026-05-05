import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TEMPLATES } from '../utils/templateConfig';

// Each thumbnail renders a unique mini layout matching that template's real style
const THUMBS = {
  1: () => (  // Classic: centered, bold uppercase name, thick section underlines
    <div style={{ padding: '8px 10px', fontFamily: 'Georgia, serif', fontSize: '6px' }}>
      <div style={{ textAlign: 'center', borderBottom: '1.5px solid #111', paddingBottom: '4px', marginBottom: '5px' }}>
        <div style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>John Doe</div>
        <div style={{ color: '#666', fontSize: '5px' }}>john@email.com • linkedin • github</div>
      </div>
      {['EDUCATION','SKILLS','EXPERIENCE'].map(s => (
        <div key={s} style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '5.5px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #111', paddingBottom: '1px', marginBottom: '3px', letterSpacing: '0.5px' }}>{s}</div>
          <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '1px', width: s==='SKILLS'?'95%':'80%' }} />
          {s==='EXPERIENCE' && <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '1px', width: '70%', marginTop: '2px' }} />}
        </div>
      ))}
    </div>
  ),
  2: () => (  // Academic: serif, small-caps, centered
    <div style={{ padding: '8px 10px', fontFamily: 'Georgia, serif', fontSize: '6px' }}>
      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <div style={{ fontSize: '9px', fontWeight: 'bold', letterSpacing: '1px' }}>John Doe</div>
        <div style={{ color: '#555', fontSize: '5px' }}>john@email.com ✦ linkedin</div>
      </div>
      {['Education','Experience','Projects','Skills'].map(s => (
        <div key={s} style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '6px', fontWeight: 'bold', fontVariant: 'small-caps', borderBottom: '1px solid #888', paddingBottom: '1px', marginBottom: '3px' }}>{s}</div>
          <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '1px', width: '85%' }} />
        </div>
      ))}
    </div>
  ),
  3: () => (  // Technical: name left / contact right split
    <div style={{ padding: '8px 10px', fontFamily: 'Arial, sans-serif', fontSize: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #111', paddingBottom: '4px', marginBottom: '5px' }}>
        <div style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase' }}>John Doe</div>
        <div style={{ textAlign: 'right', fontSize: '4.5px', color: '#555', lineHeight: '1.6' }}><div>john@email</div><div>+91 999</div></div>
      </div>
      {['EDUCATION','SKILLS','EXPERIENCE'].map(s => (
        <div key={s} style={{ marginBottom: '5px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'3px', fontSize:'5px', fontWeight:'bold', textTransform:'uppercase', marginBottom:'3px' }}>
            <span style={{ width:'2px', height:'8px', background:'#111', display:'inline-block', borderRadius:'1px' }}/>
            {s}
          </div>
          <div style={{ borderLeft: '2px solid #aaa', paddingLeft: '4px' }}>
            <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '1px', width: '80%' }} />
          </div>
        </div>
      ))}
    </div>
  ),
  4: () => (  // Modern Teal: left-aligned, teal headers
    <div style={{ padding: '8px 10px', fontFamily: 'Arial, sans-serif', fontSize: '6px' }}>
      <div style={{ marginBottom: '6px' }}>
        <div style={{ fontSize: '10px', fontWeight: '800' }}>John Doe</div>
        <div style={{ color: '#0d9488', fontSize: '5px' }}>john@email.com | linkedin</div>
      </div>
      {['EDUCATION','SKILLS','EXPERIENCE'].map(s => (
        <div key={s} style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '5.5px', fontWeight: 'bold', textTransform: 'uppercase', color: '#0d9488', borderBottom: '1.5px solid #0d9488', paddingBottom: '1px', marginBottom: '3px' }}>{s}</div>
          {s==='SKILLS'
            ? <div style={{ display:'flex', gap:'2px' }}>{['React','Python','SQL'].map(t=><span key={t} style={{ fontSize:'4px', padding:'1px 4px', borderRadius:'8px', border:'0.5px solid #0d9488', color:'#0d9488' }}>{t}</span>)}</div>
            : <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '1px', width: '80%' }} />}
        </div>
      ))}
    </div>
  ),
  5: () => (  // Clean CS: centered name, thin rule
    <div style={{ padding: '8px 10px', fontFamily: '"Helvetica Neue", Arial, sans-serif', fontSize: '6px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3px' }}>
        <div style={{ fontSize: '9px', fontWeight: 'bold' }}>John Doe</div>
        <div style={{ color: '#777', fontSize: '5px' }}>john@email.com | linkedin | github</div>
      </div>
      <div style={{ borderTop: '1px solid #666', margin: '4px 0' }} />
      {['EDUCATION','TECHNICAL SKILLS','WORK EXPERIENCE'].map(s => (
        <div key={s} style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '5px', fontWeight: '600', textTransform: 'uppercase', color: '#555', borderBottom: '0.5px solid #ccc', paddingBottom: '1px', marginBottom: '3px' }}>{s}</div>
          <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '1px', width: '85%' }} />
        </div>
      ))}
    </div>
  ),
  6: () => (  // Corporate Blue: spaced uppercase name, blue accents
    <div style={{ padding: '8px 10px', fontFamily: 'Arial, sans-serif', fontSize: '6px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2px' }}>
        <div style={{ fontSize: '8px', fontWeight: 'bold', letterSpacing: '3px', textTransform: 'uppercase' }}>JOHN  DOE</div>
        <div style={{ color: '#1d4ed8', fontSize: '5px', marginTop: '2px' }}>john@email.com | linkedin</div>
      </div>
      <div style={{ borderTop: '1.5px solid #1d4ed8', margin: '4px 0' }} />
      {['EDUCATION','CORE SKILLS','PROFESSIONAL EXPERIENCE'].map(s => (
        <div key={s} style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', textTransform: 'uppercase', color: '#1d4ed8', borderBottom: '1.5px solid #1d4ed8', paddingBottom: '1px', marginBottom: '3px' }}>{s}</div>
          <div style={{ height: '3px', background: '#dbeafe', borderRadius: '1px', width: '80%' }} />
        </div>
      ))}
    </div>
  ),
  7: () => (  // Minimal Blue: centered section headers with side rules
    <div style={{ padding: '8px 10px', fontFamily: 'Arial, sans-serif', fontSize: '6px' }}>
      <div style={{ marginBottom: '6px' }}>
        <div style={{ fontSize: '10px', fontWeight: '700' }}>John Doe</div>
        <div style={{ color: '#888', fontSize: '5px' }}>john@email.com | linkedin</div>
        <div style={{ width: '20px', height: '2px', background: '#2563eb', borderRadius: '1px', marginTop: '3px' }} />
      </div>
      {['Education','Skills','Experience'].map(s => (
        <div key={s} style={{ marginBottom: '5px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'3px', marginBottom:'3px' }}>
            <div style={{ flex:1, height:'0.5px', background:'#e2e8f0' }} />
            <div style={{ fontSize:'5px', fontWeight:'700', textTransform:'uppercase', color:'#2563eb', letterSpacing:'0.5px' }}>{s}</div>
            <div style={{ flex:1, height:'0.5px', background:'#e2e8f0' }} />
          </div>
          {s==='Skills'
            ? <div style={{ display:'flex', gap:'2px' }}>{['React','Python'].map(t=><span key={t} style={{ fontSize:'4px', padding:'1px 4px', borderRadius:'3px', background:'#eff6ff', color:'#2563eb' }}>{t}</span>)}</div>
            : <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '1px', width: '80%' }} />}
        </div>
      ))}
    </div>
  ),
  8: () => (  // Formal: serif, centered, small-caps
    <div style={{ padding: '8px 10px', fontFamily: 'Georgia, serif', fontSize: '6px' }}>
      <div style={{ textAlign: 'center', borderBottom: '1.5px solid #222', paddingBottom: '4px', marginBottom: '5px' }}>
        <div style={{ fontSize: '9px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>John Doe</div>
        <div style={{ color: '#666', fontSize: '5px', marginTop: '2px' }}>john@email.com ✦ linkedin</div>
      </div>
      {['Education','Skills & Expertise','Professional Experience'].map(s => (
        <div key={s} style={{ marginBottom: '5px' }}>
          <div style={{ fontVariant:'small-caps', fontSize:'6px', fontWeight:'bold', borderBottom:'0.5px solid #555', paddingBottom:'1px', marginBottom:'3px', textAlign:'center' }}>{s}</div>
          <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '1px', width: '85%', margin:'0 auto' }} />
        </div>
      ))}
    </div>
  ),
  9: () => (  // Student: green accent, education first
    <div style={{ padding: '8px 10px', fontFamily: 'Arial, sans-serif', fontSize: '6px' }}>
      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <div style={{ fontSize: '9px', fontWeight: 'bold' }}>John Doe</div>
        <div style={{ color: '#777', fontSize: '5px' }}>john@email.com | linkedin</div>
      </div>
      {['EDUCATION','SKILLS','PROJECTS','EXPERIENCE'].map(s => (
        <div key={s} style={{ marginBottom: '4px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', textTransform: 'uppercase', color: '#059669', borderBottom: '1.5px solid #059669', paddingBottom: '1px', marginBottom: '2px' }}>{s}</div>
          {s==='SKILLS'
            ? <div style={{ display:'flex', gap:'2px' }}>{['Python','ML'].map(t=><span key={t} style={{ fontSize:'4px', padding:'1px 3px', borderRadius:'8px', background:'#f0fdf4', color:'#059669', border:'0.5px solid #bbf7d0' }}>{t}</span>)}</div>
            : <div style={{ height: '2.5px', background: '#e5e7eb', borderRadius: '1px', width: '75%' }} />}
        </div>
      ))}
    </div>
  ),
  10: () => (  // Jake Ryan: bold centered, small-caps, serif
    <div style={{ padding: '8px 10px', fontFamily: '"Times New Roman", serif', fontSize: '6px' }}>
      <div style={{ textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '5px' }}>
        <div style={{ fontSize: '11px', fontWeight: '900' }}>JAKE RYAN</div>
        <div style={{ color: '#444', fontSize: '5px', marginTop: '2px' }}>555-123 | jake@email | linkedin</div>
      </div>
      {['Education','Experience','Projects','Technical Skills'].map(s => (
        <div key={s} style={{ marginBottom: '5px' }}>
          <div style={{ fontVariant:'small-caps', fontSize:'6.5px', fontWeight:'bold', borderBottom:'1px solid #000', paddingBottom:'1px', marginBottom:'3px' }}>{s}</div>
          <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '1px', width: s==='Technical Skills'?'95%':'80%' }} />
          {s==='Experience' && <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '1px', width: '65%', marginTop: '2px' }} />}
        </div>
      ))}
    </div>
  ),
};

const TemplateGallery = ({ selectedTemplate, onSelect }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Choose Template</h2>
          <p className="text-xs text-gray-400 mt-0.5">10 ATS-optimized designs — pick one to build with</p>
        </div>
        <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full font-medium">
          {TEMPLATES.find(t => t.id === selectedTemplate)?.name}
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
        {TEMPLATES.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const Thumb = THUMBS[template.id];
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`relative flex-shrink-0 w-[96px] rounded-xl border-2 transition-all overflow-hidden group
                ${isSelected
                  ? 'border-green-500 shadow-lg shadow-green-500/20 scale-[1.03]'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              title={template.name}
            >
              {/* Thumbnail */}
              <div className="w-full bg-white" style={{ aspectRatio: '3/4' }}>
                <Thumb />
              </div>

              {/* Label */}
              <div className={`px-1.5 py-1.5 text-center border-t ${isSelected ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
                <p className={`text-[10px] font-bold leading-tight ${isSelected ? 'text-green-700' : 'text-gray-800'}`}>
                  {template.name}
                </p>
                <p className="text-[8.5px] text-gray-400 leading-tight">{template.tags[0]}</p>
              </div>

              {isSelected && (
                <div className="absolute top-1 right-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 drop-shadow-sm bg-white rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateGallery;
