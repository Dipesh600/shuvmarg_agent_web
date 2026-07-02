import { X, MapPin, Calendar, Clock, User, Phone, Info } from "lucide-react";

interface BookingDetailsSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string | null;
}

export default function BookingDetailsSlideOver({ isOpen, onClose, bookingId }: BookingDetailsSlideOverProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[100] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-2xl z-[110] transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <div>
            <h2 className="text-[20px] font-bold text-neutral-900">Booking Details</h2>
            <p className="text-[14px] text-neutral-500">{bookingId}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Status Banner */}
          <div className="bg-green-50 border border-green-200 rounded-[12px] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              <span className="text-[14px] font-bold text-green-700">Confirmed</span>
            </div>
            <span className="text-[14px] font-bold text-neutral-900">NPR 1,600 (Paid)</span>
          </div>

          {/* Passenger Info */}
          <div>
            <h3 className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider mb-4">Passenger Information</h3>
            <div className="bg-neutral-50 rounded-[12px] p-4 border border-neutral-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-neutral-500" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-neutral-900">Aarav Sharma</div>
                  <div className="text-[13px] text-neutral-500">Primary Contact</div>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-200">
                <Phone className="w-4 h-4 text-neutral-400" />
                <span className="text-[14px] font-medium text-neutral-700">+977 9841234567</span>
              </div>
            </div>
          </div>

          {/* Trip Info */}
          <div>
            <h3 className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider mb-4">Trip Details</h3>
            <div className="bg-white rounded-[12px] border border-neutral-200 overflow-hidden">
              <div className="p-4 border-b border-neutral-100 space-y-4">
                
                <div className="flex gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-3 h-3 rounded-full border-[2px] border-[#7A1D1B]" />
                    <div className="w-px h-10 bg-neutral-200 my-1" />
                    <div className="w-3 h-3 rounded-full bg-[#7A1D1B]" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="text-[15px] font-bold text-neutral-900">Kathmandu</div>
                      <div className="text-[13px] text-neutral-500">Gongabu Bus Park</div>
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-neutral-900">Pokhara</div>
                      <div className="text-[13px] text-neutral-500">Tourist Bus Park</div>
                    </div>
                  </div>
                </div>

              </div>
              
              <div className="p-4 bg-neutral-50 flex gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <span className="text-[14px] font-medium text-neutral-700">Oct 24, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span className="text-[14px] font-medium text-neutral-700">07:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seat Info */}
          <div>
            <h3 className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider mb-4">Seat Allocation</h3>
            <div className="flex gap-2">
              <div className="bg-neutral-100 px-4 py-2 rounded-[8px] font-bold text-[14px] text-neutral-900 border border-neutral-200">A1</div>
              <div className="bg-neutral-100 px-4 py-2 rounded-[8px] font-bold text-[14px] text-neutral-900 border border-neutral-200">A2</div>
            </div>
          </div>
          
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-neutral-100 bg-white space-y-3">
          <button className="w-full h-12 bg-[#7A1D1B] hover:bg-[#5C1414] text-white rounded-[12px] font-bold text-[15px] transition-colors">
            Download Ticket
          </button>
          <button className="w-full h-12 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-[12px] font-bold text-[15px] transition-colors">
            Contact Passenger
          </button>
        </div>

      </div>
    </>
  );
}
