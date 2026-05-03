import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Shield, Bell, Moon, Globe,
  HelpCircle, MessageCircle, FileText, ExternalLink, ChevronRight,
  Camera, Edit3, Save, X, Headphones, Send, Clock, CheckCircle2
} from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');

  // Account form state
  const [editing, setEditing] = useState(false);
  const [account, setAccount] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@school.co.uk',
    phone: '+44 7700 900123',
    school: 'Greenfield Academy',
    year: 'Year 6',
    parentEmail: 'parent.johnson@email.co.uk',
  });
  const [formData, setFormData] = useState({ ...account });

  // Help desk state
  const [helpMessage, setHelpMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSave = () => {
    setAccount({ ...formData });
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...account });
    setEditing(false);
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (helpMessage.trim()) {
      setSubmitted(true);
      setHelpMessage('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: <User size={18} /> },
    { id: 'helpdesk', label: 'Help Desk', icon: <Headphones size={18} /> },
  ];

  return (
    <div className="settings-page animate-slide-up">
      {/* Header */}
      <section className="settings-hero">
        <div className="settings-hero-shapes">
          <div className="s-shape s-shape-1" />
          <div className="s-shape s-shape-2" />
        </div>
        <div className="settings-hero-content">
          <div className="settings-hero-icon">
            <Shield size={36} />
          </div>
          <div>
            <h1>Settings</h1>
            <p>Manage your account and get help when you need it.</p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ═══ ACCOUNT INFO TAB ═══ */}
      {activeTab === 'account' && (
        <div className="settings-section-wrap">
          {/* Profile Card */}
          <div className="profile-card card-panel">
            <div className="profile-card-header">
              <div className="profile-big-avatar">
                <span>😊</span>
                <button className="avatar-edit-btn" title="Change avatar">
                  <Camera size={14} />
                </button>
              </div>
              <div className="profile-card-info">
                <h2>{account.name}</h2>
                <span className="profile-role-badge">Student • {account.year}</span>
                <span className="profile-school">{account.school}</span>
              </div>
              {!editing ? (
                <button className="edit-btn" onClick={() => setEditing(true)}>
                  <Edit3 size={16} />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>
                    <Save size={16} />
                    <span>Save</span>
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Account Details */}
          <div className="account-details card-panel">
            <h3 className="section-label">Account Information</h3>
            <div className="details-grid">
              <div className="detail-field">
                <div className="field-icon"><User size={18} /></div>
                <div className="field-content">
                  <label>Full Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <p>{account.name}</p>
                  )}
                </div>
              </div>

              <div className="detail-field">
                <div className="field-icon"><Mail size={18} /></div>
                <div className="field-content">
                  <label>Email Address</label>
                  {editing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <p>{account.email}</p>
                  )}
                </div>
              </div>

              <div className="detail-field">
                <div className="field-icon"><Phone size={18} /></div>
                <div className="field-content">
                  <label>Phone Number</label>
                  {editing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  ) : (
                    <p>{account.phone}</p>
                  )}
                </div>
              </div>

              <div className="detail-field">
                <div className="field-icon"><MapPin size={18} /></div>
                <div className="field-content">
                  <label>School</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.school}
                      onChange={e => setFormData({ ...formData, school: e.target.value })}
                    />
                  ) : (
                    <p>{account.school}</p>
                  )}
                </div>
              </div>

              <div className="detail-field">
                <div className="field-icon"><Globe size={18} /></div>
                <div className="field-content">
                  <label>Year Group</label>
                  {editing ? (
                    <select
                      value={formData.year}
                      onChange={e => setFormData({ ...formData, year: e.target.value })}
                    >
                      <option>Year 4</option>
                      <option>Year 5</option>
                      <option>Year 6</option>
                    </select>
                  ) : (
                    <p>{account.year}</p>
                  )}
                </div>
              </div>

              <div className="detail-field">
                <div className="field-icon"><Shield size={18} /></div>
                <div className="field-content">
                  <label>Parent / Guardian Email</label>
                  {editing ? (
                    <input
                      type="email"
                      value={formData.parentEmail}
                      onChange={e => setFormData({ ...formData, parentEmail: e.target.value })}
                    />
                  ) : (
                    <p>{account.parentEmail}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="preferences-card card-panel">
            <h3 className="section-label">Preferences</h3>
            <div className="pref-list">
              <div className="pref-item">
                <div className="pref-left">
                  <Bell size={18} />
                  <div>
                    <span className="pref-title">Push Notifications</span>
                    <span className="pref-desc">Get reminders for daily streaks and new quests</span>
                  </div>
                </div>
                <label className="pref-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="pref-slider" />
                </label>
              </div>
              <div className="pref-item">
                <div className="pref-left">
                  <Moon size={18} />
                  <div>
                    <span className="pref-title">Sound Effects</span>
                    <span className="pref-desc">Play sounds for correct answers and achievements</span>
                  </div>
                </div>
                <label className="pref-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="pref-slider" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ HELP DESK TAB ═══ */}
      {activeTab === 'helpdesk' && (
        <div className="settings-section-wrap">
          {/* Quick Help Links */}
          <div className="help-links-grid">
            <a href="#faq" className="help-link-card card-panel">
              <div className="help-link-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}>
                <HelpCircle size={24} />
              </div>
              <div className="help-link-text">
                <h4>FAQs</h4>
                <p>Find answers to common questions</p>
              </div>
              <ChevronRight size={18} className="help-arrow" />
            </a>
            <a href="#guide" className="help-link-card card-panel">
              <div className="help-link-icon" style={{ background: '#fce7f3', color: '#ec4899' }}>
                <FileText size={24} />
              </div>
              <div className="help-link-text">
                <h4>User Guide</h4>
                <p>Learn how to use FunLearn like a pro</p>
              </div>
              <ChevronRight size={18} className="help-arrow" />
            </a>
            <a href="#chat" className="help-link-card card-panel">
              <div className="help-link-icon" style={{ background: '#ede9fe', color: '#8b5cf6' }}>
                <MessageCircle size={24} />
              </div>
              <div className="help-link-text">
                <h4>Live Chat</h4>
                <p>Chat with our support team</p>
              </div>
              <ChevronRight size={18} className="help-arrow" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="contact-card card-panel">
            <h3 className="section-label">Contact Us</h3>
            <div className="contact-grid">
              <div className="contact-item">
                <div className="contact-icon"><Mail size={20} /></div>
                <div>
                  <span className="contact-label">Email Support</span>
                  <span className="contact-value">support@nexam.co.uk</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Phone size={20} /></div>
                <div>
                  <span className="contact-label">Phone Support</span>
                  <span className="contact-value">+44 800 123 4567</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Clock size={20} /></div>
                <div>
                  <span className="contact-label">Working Hours</span>
                  <span className="contact-value">Mon – Fri, 9AM – 6PM (GMT)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit a Ticket */}
          <div className="ticket-card card-panel">
            <h3 className="section-label">Submit a Support Ticket</h3>
            <p className="ticket-subtitle">Describe your issue and our team will get back to you within 24 hours.</p>

            {submitted && (
              <div className="ticket-success">
                <CheckCircle2 size={20} />
                <span>Your ticket has been submitted! We'll get back to you soon.</span>
              </div>
            )}

            <form className="ticket-form" onSubmit={handleSubmitTicket}>
              <div className="ticket-field">
                <label>Category</label>
                <select defaultValue="general">
                  <option value="general">General Enquiry</option>
                  <option value="account">Account Issue</option>
                  <option value="bug">Report a Bug</option>
                  <option value="billing">Billing & Subscription</option>
                  <option value="feedback">Feedback & Suggestions</option>
                </select>
              </div>
              <div className="ticket-field">
                <label>Your Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us what's going on..."
                  value={helpMessage}
                  onChange={e => setHelpMessage(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-ticket-btn" disabled={!helpMessage.trim()}>
                <Send size={16} />
                <span>Submit Ticket</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
