import React, { useState } from 'react';
import { X, Mail, Send, Users } from 'lucide-react';
import { Student, EmailData } from '../types';

interface EmailModalProps {
  recipients: Student[];
  onClose: () => void;
  onSend: (emailData: EmailData) => void;
}

export default function EmailModal({ recipients, onClose, onSend }: EmailModalProps) {
  const [subject, setSubject] = useState('Job Opportunity - TECH-ENGINE');
  const [body, setBody] = useState(`Dear Candidate,

We have reviewed your profile and are impressed with your skills and experience. We would like to discuss potential opportunities that align with your background.

Please let us know your availability for a brief conversation this week.

Best regards,
HR Team
TECH-ENGINE`);

  const handleSend = () => {
    const emailData: EmailData = {
      recipients: recipients.map(r => r.email),
      subject,
      body
    };
    onSend(emailData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-[#805da3]" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Compose Email</h2>
              <p className="text-sm text-gray-500">
                Sending to {recipients.length} recipient{recipients.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipients */}
        <div className="p-6 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
          <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
            {recipients.map((recipient) => (
              <div key={recipient.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">{recipient.name}</span>
                <span className="text-xs text-gray-500">{recipient.email}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Email Content */}
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent outline-none"
              placeholder="Enter email subject"
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="body"
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#805da3] focus:border-transparent outline-none resize-none"
              placeholder="Enter your message"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            {recipients.length} recipient{recipients.length > 1 ? 's' : ''}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              className="flex items-center gap-2 px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c] transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}