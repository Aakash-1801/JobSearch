import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import './Postjobform.css';

const typeOptions = ['Job', 'Internship', 'Summer Internship'];
const modeOptions = ['Remote', 'Onsite', 'Hybrid', 'inOffice'];
const tagOptions = ['Teamwork', 'Agile', 'Leadership', 'Problem-solving', 'Other'];
const techOptions = ['React', 'Node.js', 'MongoDB', 'Python', 'Other'];
const professionOptions = ['Student', 'Working Professional', 'Female Only'];

function PostJobForm() {
  const { state } = useUser();
  const [form, setForm] = useState({
    opportunity: '',
    company: state.displayname,
    description: '',
    type: '',
    branch: '',
    category: '',
    technologies: [],
    tags: [],
    customTag: '',
    customTech: '',
    proffession: '',
    eligibility: '',
    location: '',
    mode: '',
    duration: '',
    stipend: '',
    annual_salary_min: '',
    annual_salary_max: '',
    work_details: '',
    last_date: '',
    logo_url: '',
    contact_email: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    if (form[field].includes(value)) {
      setForm(prev => ({ ...prev, [field]: prev[field].filter(item => item !== value) }));
    } else {
      setForm(prev => ({ ...prev, [field]: [...prev[field], value] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.annual_salary_max && form.annual_salary_min &&
        parseInt(form.annual_salary_max) < parseInt(form.annual_salary_min)) {
      return setMessage('Max salary must be greater than or equal to min salary');
    }

    const finalForm = {
      ...form,
      tags: form.customTag ? [...form.tags, form.customTag] : form.tags,
      technologies: form.customTech ? [...form.technologies, form.customTech] : form.technologies
    };
    const token = sessionStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/opportunity/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(finalForm)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Opportunity posted successfully!');
        setForm({ ...form, tags: [], technologies: [], customTag: '', customTech: '' });
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error');
    }
  };

  return (
    <div className="job-post-form">
      <h2>Post a Career Opportunity</h2>
      <form onSubmit={handleSubmit}>
        <label>Opportunity *</label>
        <input name="opportunity" value={form.opportunity} onChange={handleChange} required />

        <label>Company *</label>
        <input name="company" value={state.displayname} readOnly />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} />

        <label>Type *</label>
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          {typeOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>

        <label>Branch</label>
        <input name="branch" value={form.branch} onChange={handleChange} />

        <label>Category</label>
        <input name="category" value={form.category} onChange={handleChange} />

        <label>Technologies</label>
        <div className="checkbox-group">
          {techOptions.map(opt => (
            <label key={opt}>
              <input
                type="checkbox"
                value={opt}
                checked={form.technologies.includes(opt)}
                onChange={(e) => handleArrayChange(e, 'technologies')}
              />
              {opt}
            </label>
          ))}
        </div>
        {form.technologies.includes('Other') && (
          <input
            name="customTech"
            placeholder="Enter other technology"
            value={form.customTech}
            onChange={handleChange}
          />
        )}

        <label>Tags</label>
        <div className="checkbox-group">
          {tagOptions.map(opt => (
            <label key={opt}>
              <input
                type="checkbox"
                value={opt}
                checked={form.tags.includes(opt)}
                onChange={(e) => handleArrayChange(e, 'tags')}
              />
              {opt}
            </label>
          ))}
        </div>
        {form.tags.includes('Other') && (
          <input
            name="customTag"
            placeholder="Enter other tag"
            value={form.customTag}
            onChange={handleChange}
          />
        )}

        <label>Profession</label>
        <select name="proffession" value={form.proffession} onChange={handleChange}>
          <option value="">Select</option>
          {professionOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>

        <label>Eligibility</label>
        <input name="eligibility" value={form.eligibility} onChange={handleChange} />

        <label>Location *</label>
        <input name="location" value={form.location} onChange={handleChange} required />

        <label>Mode</label>
        <select name="mode" value={form.mode} onChange={handleChange}>
          <option value="">Select Mode</option>
          {modeOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>

        <label>Duration</label>
        <input name="duration" value={form.duration} onChange={handleChange} />

        {form.type === 'Internship' && (
          <>
            <label>Stipend</label>
            <input name="stipend" value={form.stipend} onChange={handleChange} />
          </>
        )}

        <label>Minimum Salary (₹)</label>
        <input name="annual_salary_min" type="number" value={form.annual_salary_min} onChange={handleChange} />

        <label>Maximum Salary (₹)</label>
        <input name="annual_salary_max" type="number" value={form.annual_salary_max} onChange={handleChange} />

        <label>Work Details</label>
        <textarea name="work_details" value={form.work_details} onChange={handleChange} />

        <label>Last Date to Apply</label>
        <input name="last_date" type="date" value={form.last_date} onChange={handleChange} />

        <label>Logo URL(Plese provide valid URL to your company logo)</label>
        <input name="logo_url" type="url" value={form.logo_url} onChange={handleChange} />

        <label>Contact Email</label>
        <input name="contact_email" type="email" value={form.contact_email} onChange={handleChange} />

        <button type="submit">Submit Opportunity</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}

export default PostJobForm;