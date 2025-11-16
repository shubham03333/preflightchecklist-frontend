import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ChecklistList from './pages/ChecklistList';
import ChecklistView from './pages/ChecklistView';
import ChecklistForm from './pages/ChecklistForm';
import ChecklistEdit from './pages/ChecklistEdit';
import './index.css';
export default function App(){ return (<BrowserRouter><div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6"><div className="max-w-6xl mx-auto"><header className="flex items-center justify-between mb-6"><h1 className="text-3xl font-extrabold text-sky-700">Preflight Checklists</h1><nav className="flex gap-3"><Link className="text-sky-600" to="/">List</Link><Link className="text-sky-600" to="/new">New</Link></nav></header><Routes><Route path="/" element={<ChecklistList />} /><Route path="/new" element={<ChecklistForm />} /><Route path="/:id" element={<ChecklistView />} /><Route path="/:id/edit" element={<ChecklistEdit />} /></Routes></div></div></BrowserRouter>); }
