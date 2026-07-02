import React, { useState } from "react";
import { Key, Laptop, Smartphone, Activity, MapPin, Clock, LogOut, CheckCircle2, AlertCircle } from "lucide-react";

const activeSessions = [
  {
    id: "1",
    deviceType: "laptop",
    os: "Mac OS X",
    browser: "Chrome",
    ip: "103.111.12.45",
    location: "Kathmandu, Nepal",
    isCurrent: true,
    lastActive: "Active now"
  },
  {
    id: "2",
    deviceType: "smartphone",
    os: "iOS 16",
    browser: "Safari",
    ip: "103.111.45.12",
    location: "Pokhara, Nepal",
    isCurrent: false,
    lastActive: "2 hours ago"
  }
];

const loginHistory = [
  {
    id: "1",
    date: "2024-05-12T10:30:00Z",
    device: "Mac OS X • Chrome",
    location: "Kathmandu, Nepal",
    ip: "103.111.12.45",
    status: "success"
  },
  {
    id: "2",
    date: "2024-05-11T14:15:00Z",
    device: "iOS 16 • Safari",
    location: "Pokhara, Nepal",
    ip: "103.111.45.12",
    status: "success"
  },
  {
    id: "3",
    date: "2024-05-10T09:05:00Z",
    device: "Windows 11 • Edge",
    location: "Unknown Location",
    ip: "45.22.11.90",
    status: "failed"
  }
];

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[24px] font-bold text-neutral-900">Security & Access</h2>
        <p className="text-[14px] text-neutral-500 mt-2">
          Manage your password, monitor active sessions, and review login history.
        </p>
      </div>

      {/* Password Management */}
      <div className="bg-white rounded-[16px] border border-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#F8F1E3] rounded-full flex items-center justify-center shrink-0">
            <Key className="w-6 h-6 text-[#7A1D1B]" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-neutral-900">Change Password</h3>
            <p className="text-[14px] text-neutral-500 mt-1">Update your password to keep your account secure.</p>
          </div>
        </div>
        
        <div className="max-w-[480px] space-y-6">
          <div className="space-y-2">
            <label className="block text-[14px] font-semibold text-neutral-900">Current Password</label>
            <input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full h-[48px] px-4 rounded-[12px] border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#7A1D1B] focus:ring-1 focus:ring-[#7A1D1B] transition-colors" 
              placeholder="Enter your current password"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[14px] font-semibold text-neutral-900">New Password</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-[48px] px-4 rounded-[12px] border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#7A1D1B] focus:ring-1 focus:ring-[#7A1D1B] transition-colors" 
              placeholder="Enter new password"
            />
            <p className="text-[12px] text-neutral-500">Must be at least 8 characters long.</p>
          </div>

          <div className="space-y-2">
            <label className="block text-[14px] font-semibold text-neutral-900">Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[48px] px-4 rounded-[12px] border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#7A1D1B] focus:ring-1 focus:ring-[#7A1D1B] transition-colors" 
              placeholder="Confirm new password"
            />
          </div>

          <div className="pt-2">
            <button className="h-[48px] px-8 bg-[#7A1D1B] hover:bg-[#641715] text-white rounded-[12px] text-[14px] font-semibold transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-[16px] border border-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F8F1E3] rounded-full flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6 text-[#7A1D1B]" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-neutral-900">Active Sessions</h3>
              <p className="text-[14px] text-neutral-500 mt-1">Devices currently logged into your account.</p>
            </div>
          </div>
          <button className="h-[40px] px-4 border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-[12px] text-[14px] font-semibold transition-colors">
            Sign Out All Other Devices
          </button>
        </div>

        <div className="space-y-4">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-5 rounded-[12px] border border-neutral-100 bg-[#FAF7F2]/30 hover:bg-[#FAF7F2] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-neutral-100 shrink-0 mt-0.5">
                  {session.deviceType === 'laptop' ? (
                    <Laptop className="w-5 h-5 text-neutral-600" />
                  ) : (
                    <Smartphone className="w-5 h-5 text-neutral-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-[15px] font-bold text-neutral-900">{session.os}</h4>
                    {session.isCurrent && (
                      <span className="px-2.5 py-0.5 bg-[#F8F1E3] text-[#7A1D1B] text-[11px] font-bold uppercase tracking-wider rounded-full">Current Device</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-neutral-500">
                    <span>{session.browser}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="font-mono text-[12px]">{session.ip}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-neutral-500 mt-1">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {session.location}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {session.lastActive}</span>
                  </div>
                </div>
              </div>
              {!session.isCurrent && (
                <button className="h-[40px] px-4 text-neutral-500 hover:text-[#D32F2F] hover:bg-red-50 rounded-[8px] text-[13px] font-semibold transition-colors flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white rounded-[16px] border border-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <h3 className="text-[18px] font-bold text-neutral-900 mb-6">Recent Login Activity</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="px-4 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-4 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">Device</th>
                <th className="px-4 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">IP Address</th>
                <th className="px-4 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((log) => {
                const date = new Date(log.date);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                
                return (
                  <tr key={log.id} className="border-b border-neutral-100 last:border-0 hover:bg-[#FAF7F2]/50 transition-colors group">
                    <td className="px-4 py-4 h-[56px] text-[14px] text-neutral-700">
                      <span className="font-semibold text-neutral-900 block">{formattedDate}</span>
                      <span className="text-[13px] text-neutral-500">{formattedTime}</span>
                    </td>
                    <td className="px-4 py-4 h-[56px] text-[14px] text-neutral-900 font-medium">{log.device}</td>
                    <td className="px-4 py-4 h-[56px] text-[14px] text-neutral-600">{log.location}</td>
                    <td className="px-4 py-4 h-[56px] text-[13px] text-neutral-500 font-mono">{log.ip}</td>
                    <td className="px-4 py-4 h-[56px] text-right">
                      {log.status === 'success' ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F5] border border-neutral-200 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                          <span className="text-[12px] font-bold text-neutral-700 uppercase tracking-wider">Success</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDF4F4] border border-[#FDE7E6] rounded-full">
                          <AlertCircle className="w-3.5 h-3.5 text-[#D32F2F]" />
                          <span className="text-[12px] font-bold text-[#982F2F] uppercase tracking-wider">Failed</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
