import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Check, 
  CheckCircle2, 
  CreditCard, 
  Info, 
  RotateCcw, 
  Ticket,
  AlertTriangle
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: 'Booking' | 'Payment' | 'Refund' | 'System';
  priority: 'Critical' | 'High' | 'Normal';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Booking Received',
    message: 'Aayush Sharma booked 2 seats on Kathmandu → Pokhara for tomorrow.',
    time: '2m ago',
    read: false,
    category: 'Booking',
    priority: 'Normal'
  },
  {
    id: '2',
    title: 'Payment Failed',
    message: 'Payment of NPR 2,500 for CUS-8924 failed to process.',
    time: '1h ago',
    read: false,
    category: 'Payment',
    priority: 'High'
  },
  {
    id: '3',
    title: 'Refund Processed',
    message: 'Refund of NPR 1,200 for cancelled ticket has been successfully processed.',
    time: '3h ago',
    read: true,
    category: 'Refund',
    priority: 'Normal'
  },
  {
    id: '4',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight at 2:00 AM NPT.',
    time: '1d ago',
    read: true,
    category: 'System',
    priority: 'Normal'
  }
];

export default function NotificationDropdown({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'All' | 'Unread'>('All');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the dropdown is open and the click is outside our dropdownRef
      // Note: We also check if the click wasn't on the bell toggle button itself 
      // (which is outside this component but toggles the state)
      // The bell toggle button should have a specific class or we can just let 
      // the parent's toggle handle it. If we stop propagation in the parent, we are fine.
      // But typically checking if it's inside is enough if the parent button toggles correctly.
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Prevent closing if they just clicked the bell icon which toggles it anyway.
        // We can do this by checking if the clicked element is part of the bell button.
        const target = event.target as Element;
        if (!target.closest('.notification-toggle-btn')) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const filteredNotifications = notifications.filter(n => 
    activeTab === 'All' ? true : !n.read
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getCategoryIcon = (category: string, priority: string) => {
    let iconColor = 'text-neutral-500';
    let bgColor = 'bg-neutral-100';

    if (priority === 'Critical' || priority === 'High') {
      iconColor = 'text-[#D96B62]';
      bgColor = 'bg-[#D96B62]/10';
    }

    switch (category) {
      case 'Booking': return <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bgColor}`}><Ticket className={`w-4 h-4 ${iconColor}`} /></div>;
      case 'Payment': return <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bgColor}`}><CreditCard className={`w-4 h-4 ${iconColor}`} /></div>;
      case 'Refund': return <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bgColor}`}><RotateCcw className={`w-4 h-4 ${iconColor}`} /></div>;
      case 'System': return <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bgColor}`}><Info className={`w-4 h-4 ${iconColor}`} /></div>;
      default: return <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bgColor}`}><Bell className={`w-4 h-4 ${iconColor}`} /></div>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile closing */}
          <div 
            className="fixed inset-0 z-40 hidden sm:block md:hidden" 
            onClick={onClose}
          />
          
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute top-14 right-2 sm:right-6 w-[360px] bg-white rounded-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-neutral-200/60 z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-neutral-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[13px] font-medium text-[#7A1D1B] hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              
              {/* Tabs */}
              <div className="flex items-center gap-2 bg-neutral-100/80 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('All')}
                  className={`flex-1 text-[13px] font-semibold py-1.5 rounded-lg transition-colors ${
                    activeTab === 'All' 
                      ? 'bg-white text-neutral-900 shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('Unread')}
                  className={`flex-1 text-[13px] font-semibold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    activeTab === 'Unread' 
                      ? 'bg-white text-neutral-900 shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Unread
                  {unreadCount > 0 && (
                    <span className="bg-[#D96B62] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full pb-2">
              {filteredNotifications.length > 0 ? (
                <div className="flex flex-col">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`px-5 py-4 flex gap-3 hover:bg-neutral-50 cursor-pointer transition-colors border-l-2 ${
                        notification.read 
                          ? 'border-transparent' 
                          : notification.priority === 'High' || notification.priority === 'Critical' 
                            ? 'border-[#D96B62] bg-[#D96B62]/[0.02]' 
                            : 'border-[#7A1D1B] bg-neutral-50/50'
                      }`}
                      onClick={() => {
                        setNotifications(notifications.map(n => 
                          n.id === notification.id ? { ...n, read: true } : n
                        ));
                      }}
                    >
                      {getCategoryIcon(notification.category, notification.priority)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className={`text-[14px] font-bold truncate ${notification.read ? 'text-neutral-700' : 'text-neutral-900'}`}>
                            {notification.title}
                          </p>
                          <span className="text-[12px] font-medium text-neutral-400 shrink-0 mt-0.5">
                            {notification.time}
                          </span>
                        </div>
                        <p className={`text-[13px] leading-relaxed line-clamp-2 ${notification.read ? 'text-neutral-500' : 'text-neutral-600'}`}>
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-10 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h4 className="text-[15px] font-bold text-neutral-900 mb-1">You're all caught up</h4>
                  <p className="text-[13px] text-neutral-500">
                    {activeTab === 'Unread' 
                      ? "No new notifications right now." 
                      : "You don't have any notifications."}
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-neutral-100 bg-neutral-50/50">
                <button className="w-full py-2.5 text-[13px] font-bold text-neutral-700 hover:text-[#7A1D1B] bg-white border border-neutral-200 hover:border-[#7A1D1B]/30 rounded-xl transition-all shadow-sm">
                  View All Notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
