import React, { useState } from 'react';
import { createChecklist, addItem } from '../api';
import { useNavigate } from 'react-router-dom';

export default function ChecklistForm(){
  const nav = useNavigate();
  const [form, setForm] = useState({flight_number:'',date:'',filed_by:'',filing_time:'',departure_location:'',departure_time:'',arrival_location:'',est_arrival_time:''});
  const initialChecks = ['Check Digital Sky for airspace clearance','WINDY DATA- at 0m alt, at 100m alt','Anemometer wind speed & Wind Direction','Inform the GC to power up the aircraft','Choose the respective mission','Write and read the mission','Reconfirm UAV heading and WP heading','Check WP numbering & altitudes'];
  const [checks] = useState(initialChecks);
  const [status,setStatus] = useState({}); const [comments,setComments] = useState({});

  const handleSubmit = async ()=>{
    if(!form.flight_number){ alert('Enter flight number'); return; }
    try{
      const checklist = await createChecklist(form);
      for(let i=0;i<checks.length;i++){ await addItem(checklist.id,{check_text:checks[i],status:status[i]||'Pending',comment:comments[i]||'',sequence:i}); }
      nav('/');
    }catch(e){ console.error(e); alert('Error creating checklist'); }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-4">Create Preflight Checklist</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input placeholder="Flight number" value={form.flight_number} onChange={e=>setForm({...form,flight_number:e.target.value})} className="border p-2 rounded" />
        <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="border p-2 rounded" />
        <input placeholder="Filed by" value={form.filed_by} onChange={e=>setForm({...form,filed_by:e.target.value})} className="border p-2 rounded" />
        <input type="time" value={form.filing_time} onChange={e=>setForm({...form,filing_time:e.target.value})} className="border p-2 rounded" />
        <input placeholder="Departure location" value={form.departure_location} onChange={e=>setForm({...form,departure_location:e.target.value})} className="border p-2 rounded" />
        <input type="time" value={form.departure_time} onChange={e=>setForm({...form,departure_time:e.target.value})} className="border p-2 rounded" />
        <input placeholder="Arrival location" value={form.arrival_location} onChange={e=>setForm({...form,arrival_location:e.target.value})} className="border p-2 rounded" />
        <input type="time" value={form.est_arrival_time} onChange={e=>setForm({...form,est_arrival_time:e.target.value})} className="border p-2 rounded" />
      </div>
      <h3 className="font-semibold mb-2">Checks</h3>
      <div className="overflow-auto max-h-64 mb-4">
        <table className="min-w-full border">
          <thead className="bg-gray-50"><tr><th className="p-2 border">Check</th><th className="p-2 border">Status</th><th className="p-2 border">Comment</th></tr></thead>
          <tbody>
            {checks.map((c,i)=>(
              <tr key={i} className="hover:bg-gray-50">
                <td className="border p-2 align-top">{c}</td>
                <td className="border p-2">
                  <select className="w-full border p-1 rounded" value={status[i]||''} onChange={e=>setStatus({...status,[i]:e.target.value})}>
                    <option value="">--Select--</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Not Required">Not Required</option>
                  </select>
                </td>
                <td className="border p-2">
                  <input className="w-full border p-1 rounded" value={comments[i]||''} onChange={e=>setComments({...comments,[i]:e.target.value})} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right"><button onClick={handleSubmit} className="bg-sky-600 text-white px-4 py-2 rounded shadow">Save Checklist</button></div>
    </div>
  );
}
