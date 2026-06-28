"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2, ChevronRight, ChevronLeft,
  Ticket, Globe, Smartphone, Hotel, User,
  MapPin, Building2, Upload, X, FileText, Eye, EyeOff,
} from "lucide-react";
import {
  getApplicationStatus,
  saveApplicationDraft,
  uploadDocument,
  submitApplication,
  ApplicationStatusData,
} from "@/lib/agentApi";
import { logout } from "@/lib/auth";

// ── Types ─────────────────────────────────────────────────────────────────────

type AgentType = "ticket_counter" | "travel_agent" | "mobile_shop" | "hotel" | "individual";

interface FileWithPreview {
  file: File;
  preview: string;
  name: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const AGENT_TYPES: { value: AgentType; label: string; description: string; Icon: React.ElementType }[] = [
  { value: "ticket_counter", label: "Ticket Counter", description: "A physical counter that sells bus tickets", Icon: Ticket },
  { value: "travel_agent",   label: "Travel Agent",   description: "A registered travel agency business",    Icon: Globe },
  { value: "mobile_shop",    label: "Mobile Shop",    description: "Mobile shop that handles ticket sales",  Icon: Smartphone },
  { value: "hotel",          label: "Hotel",          description: "Hotel that facilitates bus bookings",    Icon: Hotel },
  { value: "individual",     label: "Individual",     description: "Individual selling tickets independently", Icon: User },
];

const NEPAL_DISTRICTS = [
  "Achham","Arghakhanchi","Baglung","Baitadi","Bajhang","Bajura","Banke","Bara",
  "Bardiya","Bhaktapur","Bhojpur","Chitwan","Dadeldhura","Dailekh","Dang","Darchula",
  "Dhading","Dhankuta","Dhanusa","Dolakha","Dolpa","Doti","Eastern Rukum","Gorkha",
  "Gulmi","Humla","Ilam","Jajarkot","Jhapa","Jumla","Kailali","Kalikot","Kanchanpur",
  "Kapilvastu","Kaski","Kathmandu","Kavrepalanchok","Khotang","Lalitpur","Lamjung",
  "Mahottari","Makwanpur","Manang","Morang","Mugu","Mustang","Myagdi","Nawalparasi East",
  "Nawalparasi West","Nuwakot","Okhaldhunga","Palpa","Panchthar","Parbat","Parsa",
  "Pyuthan","Ramechhap","Rasuwa","Rautahat","Rolpa","Rupandehi","Salyan","Sankhuwasabha",
  "Saptari","Sarlahi","Sindhuli","Sindhupalchok","Siraha","Solukhumbu","Sunsari","Surkhet",
  "Syangja","Tanahun","Taplejung","Terhathum","Udayapur","Western Rukum",
];

// ── Step progress bar ─────────────────────────────────────────────────────────

function StepBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
            i < current ? "bg-[#7A1D1B]" : i === current ? "bg-[#7A1D1B]/40" : "bg-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

// ── File upload card ──────────────────────────────────────────────────────────

function FileUploadCard({
  label,
  id,
  file,
  onSelect,
  onClear,
  required = true,
}: {
  label: string;
  id: string;
  file: FileWithPreview | null;
  onSelect: (file: File) => void;
  onClear: () => void;
  required?: boolean;
}) {
  const isImage = file && file.file.type.startsWith("image/");

  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-semibold text-neutral-800">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {!required && <span className="text-neutral-400 ml-1">(optional)</span>}
      </label>
      {file ? (
        <div className="relative rounded-xl border border-green-200 bg-green-50 overflow-hidden">
          {isImage ? (
            <img src={file.preview} alt={label} className="w-full h-36 object-cover" />
          ) : (
            <div className="flex items-center gap-3 p-4">
              <FileText className="w-8 h-8 text-green-600 flex-shrink-0" />
              <span className="text-[13px] text-green-800 font-medium truncate">{file.name}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
            <p className="text-white text-[12px] flex-1 font-medium truncate">{file.name}</p>
            <button
              type="button"
              onClick={onClear}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center backdrop-blur-sm"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center gap-2 h-24 rounded-xl border-2 border-dashed border-neutral-200 hover:border-[#7A1D1B]/40 hover:bg-[#7A1D1B]/5 cursor-pointer transition-all"
        >
          <Upload className="w-5 h-5 text-neutral-400" />
          <span className="text-[13px] text-neutral-500">Click to upload</span>
          <span className="text-[11px] text-neutral-400">JPG, PNG or PDF</span>
        </label>
      )}
      <input
        id={id}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => { if (e.target.files?.[0]) onSelect(e.target.files[0]); e.target.value = ""; }}
      />
    </div>
  );
}

// ── Main Setup Page ───────────────────────────────────────────────────────────

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState("");

  // Step 1 — Agent Type + Location
  const [agentType, setAgentType] = useState<AgentType | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [district, setDistrict] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [userName, setUserName] = useState("");

  // Step 2 — Identity + Documents (files held in state; uploaded on submit)
  const [citizenshipNumber, setCitizenshipNumber] = useState("");
  const [nationalIdNumber, setNationalIdNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [citizenshipFront, setCitizenshipFront] = useState<FileWithPreview | null>(null);
  const [citizenshipBack, setCitizenshipBack] = useState<FileWithPreview | null>(null);
  const [panCard, setPanCard] = useState<FileWithPreview | null>(null);
  const [nationalIdDoc, setNationalIdDoc] = useState<FileWithPreview | null>(null);

  // Step 3 — Consents
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [whatsappConsent, setWhatsappConsent] = useState(false);

  // Already-uploaded document types (loaded from server draft)
  const [uploadedDocTypes, setUploadedDocTypes] = useState<string[]>([]);

  // Upload progress
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [stepError, setStepError] = useState("");

  // Load existing draft data on mount
  const loadDraft = useCallback(async () => {
    const data = await getApplicationStatus();
    if (data) {
      if ((data as any).userName) setUserName((data as any).userName);
      
      if (data.hasApplication) {
        // Restore text fields
      if (data.personal.district) setDistrict(data.personal.district);
      if (data.personal.municipality) setMunicipality(data.personal.municipality);
      if (data.personal.placeName) setPlaceName(data.personal.placeName);
      if (data.business.operationType) setAgentType(data.business.operationType as AgentType);
      if (data.business.businessName) setBusinessName(data.business.businessName);
      if (data.business.shopAddress) setShopAddress(data.business.shopAddress);
      if (data.identification.citizenshipNumber) setCitizenshipNumber(data.identification.citizenshipNumber);
      if (data.identification.nationalIdNumber) setNationalIdNumber(data.identification.nationalIdNumber);
      if (data.identification.panNumber) setPanNumber(data.identification.panNumber);
      if (data.consents.whatsappConsent) setWhatsappConsent(true);
      // Track which doc types are already on the server
      if (data.documents?.length) {
        setUploadedDocTypes(data.documents.map((d) => d.type));
      }
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadDraft(); }, [loadDraft]);

  // ── File helpers ────────────────────────────────────────────────────────────

  const makePreview = (file: File): FileWithPreview => ({
    file,
    preview: URL.createObjectURL(file),
    name: file.name,
  });

  // ── Step navigation ─────────────────────────────────────────────────────────

  const validateStep1 = (): string => {
    if (!agentType) return "Please select your agent type.";
    if (agentType !== "individual" && !businessName.trim()) return "Business name is required.";
    if (!district) return "Please select your district.";
    if (!municipality.trim()) return "Municipality is required.";
    if (!placeName.trim()) return "Place name is required.";
    if (!shopAddress.trim()) return "Shop / office address is required.";
    return "";
  };

  const validateStep2 = (): string => {
    if (!citizenshipNumber.trim()) return "Citizenship number is required.";
    if (!panNumber.trim()) return "PAN number is required.";
    if (!citizenshipFront) return "Please upload the front of your citizenship card.";
    if (!citizenshipBack) return "Please upload the back of your citizenship card.";
    if (!panCard) return "Please upload your PAN card.";
    return "";
  };

  const handleNextStep = async () => {
    setStepError("");
    if (currentStep === 0) {
      const err = validateStep1();
      if (err) { setStepError(err); return; }
      // Save Step 1 draft
      await saveApplicationDraft({ district, municipality, placeName, operationType: agentType, businessName, shopAddress });
      setCurrentStep(1);
    } else if (currentStep === 1) {
      const err = validateStep2();
      if (err) { setStepError(err); return; }
      // Save Step 2 draft (text only; files uploaded on final submit)
      await saveApplicationDraft({ citizenshipNumber, nationalIdNumber: nationalIdNumber || null, panNumber });
      setCurrentStep(2);
    }
    window.scrollTo(0, 0);
  };

  // ── Final Submit ────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    setStepError("");
    setGlobalError("");

    if (!termsAccepted) {
      setStepError("You must accept the Terms and Conditions to continue.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Consolidate save of ALL text fields before uploading —
      //    guards against a previous step save having failed silently.
      const saveResult = await saveApplicationDraft({
        district, municipality, placeName,
        operationType: agentType,
        businessName: agentType !== "individual" ? businessName : null,
        shopAddress,
        citizenshipNumber,
        nationalIdNumber: nationalIdNumber || null,
        panNumber,
        whatsappConsent,
      });
      if (!saveResult.success) {
        setStepError(saveResult.message || "Failed to save your details. Please try again.");
        setSubmitting(false);
        return;
      }

      // 2. Upload documents — skip any type already on the server
      const uploads: Array<{ key: string; type: string; fp: FileWithPreview | null; required: boolean }> = [
        { key: "citizenship_front", type: "citizenship_front", fp: citizenshipFront, required: true },
        { key: "citizenship_back",  type: "citizenship_back",  fp: citizenshipBack,  required: true },
        { key: "pan_card",          type: "pan_card",          fp: panCard,           required: true },
        { key: "national_id_front", type: "national_id_front", fp: nationalIdDoc,     required: false },
      ];

      for (const u of uploads) {
        // Skip if already uploaded to server in a previous attempt
        if (uploadedDocTypes.includes(u.type)) {
          setUploadProgress((p) => ({ ...p, [u.key]: 100 }));
          continue;
        }
        // Skip optional with no file selected
        if (!u.fp) {
          if (u.required) {
            setStepError(`Please upload your ${u.type.replace(/_/g, " ")}.`);
            setSubmitting(false);
            return;
          }
          continue;
        }
        const result = await uploadDocument(u.type, u.fp.file, (pct) => {
          setUploadProgress((p) => ({ ...p, [u.key]: pct }));
        });
        if (!result.success) {
          setStepError(`Failed to upload ${u.type.replace(/_/g, " ")}: ${result.message}`);
          setSubmitting(false);
          return;
        }
        // Mark as uploaded so retry won't re-upload
        setUploadedDocTypes((prev) => [...prev, u.type]);
      }

      // 3. Submit application
      const result = await submitApplication(termsAccepted, whatsappConsent);
      if (!result.success) {
        const msg = result.errors ? result.errors.join("\n") : (result.message || "Submission failed.");
        setStepError(msg);
        setSubmitting(false);
        return;
      }

      // 4. Success → redirect to dashboard (hard reload to fetch new status)
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      setStepError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  // ── Loading ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="w-8 h-8 border-2 border-[#7A1D1B]/20 border-t-[#7A1D1B] rounded-full animate-spin" />
      </div>
    );
  }

  // ── UI ──────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          {/* Standard Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#7A1D1B]/5 border border-[#7A1D1B]/10">
              <span className="material-symbols-rounded text-[18px] text-[#7A1D1B]">directions_bus</span>
            </div>
            <span className="font-black text-[22px] tracking-tighter flex items-baseline">
              <span className="text-[#111111]" style={{ fontFamily: 'var(--font-manrope)' }}>Shuv</span>
              <span className="text-[#D96B62]" style={{ fontFamily: 'var(--font-display)' }}>marg</span>
              <span className="text-neutral-500 font-medium text-[13px] ml-2 tracking-normal bg-neutral-100 px-2 py-0.5 rounded-md">Partner Setup</span>
            </span>
          </div>
          
          <button onClick={handleLogout} className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-8 pb-24">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[13px] font-semibold text-[#7A1D1B] uppercase tracking-wider mb-1">
            Step {currentStep + 1} of 3
          </p>
          <h1 className="text-[26px] font-bold text-neutral-900 mb-1">
            {currentStep === 0 && "Your Business Details"}
            {currentStep === 1 && "Identity & Documents"}
            {currentStep === 2 && "Review & Submit"}
          </h1>
          <p className="text-[14px] text-neutral-500">
            {currentStep === 0 && "Tell us about your business and location"}
            {currentStep === 1 && "Upload your identification documents"}
            {currentStep === 2 && "Confirm your details and submit"}
          </p>
          <div className="mt-4">
            <StepBar current={currentStep} total={3} />
          </div>
        </div>

        {/* Error banner */}
        {stepError && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
            <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-red-700 leading-relaxed whitespace-pre-line">{stepError}</p>
          </div>
        )}

        {/* ── STEP 1: Agent Type + Location ────────────────────────────────── */}
        {currentStep === 0 && (
          <div className="space-y-6">
            {/* Agent Type */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-neutral-800">
                Agent Type <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center h-[52px] rounded-xl border border-neutral-200 bg-white px-4 focus-within:border-[#7A1D1B] focus-within:ring-4 focus-within:ring-[#7A1D1B]/10 transition-all">
                <User className="w-4 h-4 text-neutral-400 mr-3 flex-shrink-0" />
                <select
                  value={agentType || ""}
                  onChange={(e) => { setAgentType(e.target.value as any); setStepError(""); }}
                  className="flex-1 h-full outline-none text-[15px] text-neutral-900 bg-transparent"
                >
                  <option value="">Select agent type</option>
                  {AGENT_TYPES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Business Name (hidden for individual) */}
            {agentType && agentType !== "individual" && (
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-neutral-800">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center h-[52px] rounded-xl border border-neutral-200 bg-white px-4 focus-within:border-[#7A1D1B] focus-within:ring-4 focus-within:ring-[#7A1D1B]/10 transition-all">
                  <Building2 className="w-4 h-4 text-neutral-400 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="e.g. Himalayan Bus Counter"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="flex-1 h-full outline-none text-[15px] text-neutral-900 bg-transparent placeholder:text-neutral-400"
                  />
                </div>
              </div>
            )}

            {/* Location row */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-neutral-800">
                District <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center h-[52px] rounded-xl border border-neutral-200 bg-white px-4 focus-within:border-[#7A1D1B] focus-within:ring-4 focus-within:ring-[#7A1D1B]/10 transition-all">
                <MapPin className="w-4 h-4 text-neutral-400 mr-3 flex-shrink-0" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="flex-1 h-full outline-none text-[15px] text-neutral-900 bg-transparent appearance-none"
                >
                  <option value="">Select district</option>
                  {NEPAL_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-neutral-800">
                  Municipality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kathmandu Metro"
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className="w-full h-[52px] rounded-xl border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900 outline-none focus:border-[#7A1D1B] focus:ring-4 focus:ring-[#7A1D1B]/10 transition-all placeholder:text-neutral-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-neutral-800">
                  Place / Ward <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ward 3, Thamel"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  className="w-full h-[52px] rounded-xl border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900 outline-none focus:border-[#7A1D1B] focus:ring-4 focus:ring-[#7A1D1B]/10 transition-all placeholder:text-neutral-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-neutral-800">
                Full Shop / Office Address <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="e.g. Near Ratna Park, Bus Park Road, Kathmandu"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 outline-none focus:border-[#7A1D1B] focus:ring-4 focus:ring-[#7A1D1B]/10 transition-all placeholder:text-neutral-400 resize-none"
              />
            </div>
          </div>
        )}

        {/* ── STEP 2: Identity + Documents ─────────────────────────────────── */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Identification numbers */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-5">
              <div>
                <h2 className="text-[14px] font-semibold text-neutral-800 mb-4">Identification Numbers</h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-neutral-800">
                      Citizenship Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 43-01-71-12345"
                      value={citizenshipNumber}
                      onChange={(e) => setCitizenshipNumber(e.target.value)}
                      className="w-full h-[52px] rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-[15px] text-neutral-900 outline-none focus:border-[#7A1D1B] focus:ring-4 focus:ring-[#7A1D1B]/10 transition-all placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-neutral-800">
                      National ID Number
                      <span className="text-neutral-400 font-normal ml-1">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 12345678901234"
                      value={nationalIdNumber}
                      onChange={(e) => setNationalIdNumber(e.target.value)}
                      className="w-full h-[52px] rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-[15px] text-neutral-900 outline-none focus:border-[#7A1D1B] focus:ring-4 focus:ring-[#7A1D1B]/10 transition-all placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-neutral-800">
                      PAN Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 123456789"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value)}
                      className="w-full h-[52px] rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-[15px] text-neutral-900 outline-none focus:border-[#7A1D1B] focus:ring-4 focus:ring-[#7A1D1B]/10 transition-all placeholder:text-neutral-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Document uploads */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-5">
              <div>
                <h2 className="text-[14px] font-semibold text-neutral-800 mb-1">Document Uploads</h2>
                <p className="text-[12px] text-neutral-500 mb-4">Upload clear, readable photos or scans (JPG, PNG, or PDF)</p>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <FileUploadCard
                      label="Citizenship — Front"
                      id="citizenship_front"
                      file={citizenshipFront}
                      onSelect={(f) => setCitizenshipFront(makePreview(f))}
                      onClear={() => setCitizenshipFront(null)}
                    />
                    <FileUploadCard
                      label="Citizenship — Back"
                      id="citizenship_back"
                      file={citizenshipBack}
                      onSelect={(f) => setCitizenshipBack(makePreview(f))}
                      onClear={() => setCitizenshipBack(null)}
                    />
                  </div>

                  <FileUploadCard
                    label="PAN Card"
                    id="pan_card"
                    file={panCard}
                    onSelect={(f) => setPanCard(makePreview(f))}
                    onClear={() => setPanCard(null)}
                  />

                  <div className="pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <FileUploadCard
                        label="National ID"
                        id="national_id_front"
                        file={nationalIdDoc}
                        onSelect={(f) => setNationalIdDoc(makePreview(f))}
                        onClear={() => setNationalIdDoc(null)}
                        required={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Review + Consents + Submit ────────────────────────────── */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Summary cards */}
            <div className="space-y-3">
              {userName && (
                <ReviewCard title="Personal">
                  <ReviewRow label="Full Name" value={userName} />
                </ReviewCard>
              )}

              <ReviewCard title="Business Details">
                <ReviewRow label="Agent Type" value={AGENT_TYPES.find((a) => a.value === agentType)?.label ?? "—"} />
                {agentType !== "individual" && <ReviewRow label="Business Name" value={businessName || "—"} />}
                <ReviewRow label="District" value={district || "—"} />
                <ReviewRow label="Municipality" value={municipality || "—"} />
                <ReviewRow label="Place / Ward" value={placeName || "—"} />
                <ReviewRow label="Address" value={shopAddress || "—"} />
              </ReviewCard>

              <ReviewCard title="Identity">
                <ReviewRow label="Citizenship No." value={citizenshipNumber || "—"} />
                <ReviewRow label="National ID No." value={nationalIdNumber || "—"} />
                <ReviewRow label="PAN No." value={panNumber || "—"} />
              </ReviewCard>

              <ReviewCard title="Documents">
                <DocumentRow label="Citizenship Front" file={citizenshipFront} />
                <DocumentRow label="Citizenship Back"  file={citizenshipBack} />
                <DocumentRow label="PAN Card"          file={panCard} />
                {nationalIdDoc && <DocumentRow label="National ID" file={nationalIdDoc} />}
              </ReviewCard>
            </div>

            {/* Upload progress */}
            {submitting && Object.keys(uploadProgress).length > 0 && (
              <div className="bg-white rounded-xl border border-neutral-200 p-4 space-y-3">
                <p className="text-[13px] font-semibold text-neutral-700 mb-2">Uploading documents…</p>
                {Object.entries(uploadProgress).map(([key, pct]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[12px] text-neutral-500">{key.replace(/_/g, " ")}</span>
                      <span className="text-[12px] text-[#7A1D1B] font-medium">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#7A1D1B] rounded-full transition-all duration-200"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Consents */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
              <button
                type="button"
                onClick={() => setTermsAccepted(!termsAccepted)}
                className="flex items-start gap-3 w-full text-left"
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 mt-0.5 transition-all ${
                  termsAccepted ? "bg-[#7A1D1B] border-[#7A1D1B]" : "border-neutral-300"
                }`}>
                  {termsAccepted && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className="text-[14px] text-neutral-700 leading-relaxed">
                  I have read and accept the{" "}
                  <a href="/terms" target="_blank" className="text-[#7A1D1B] font-medium hover:underline" onClick={(e) => e.stopPropagation()}>
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" target="_blank" className="text-[#7A1D1B] font-medium hover:underline" onClick={(e) => e.stopPropagation()}>
                    Privacy Policy
                  </a>
                  . <span className="text-red-500">*</span>
                </p>
              </button>

              <button
                type="button"
                onClick={() => setWhatsappConsent(!whatsappConsent)}
                className="flex items-start gap-3 w-full text-left"
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 mt-0.5 transition-all ${
                  whatsappConsent ? "bg-[#7A1D1B] border-[#7A1D1B]" : "border-neutral-300"
                }`}>
                  {whatsappConsent && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className="text-[14px] text-neutral-600 leading-relaxed">
                  I agree to receive booking updates and notifications via WhatsApp.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* ── Navigation Buttons ─────────────────────────────────────────────── */}
        <div className={`mt-8 flex gap-3 ${currentStep === 0 ? "justify-end" : "justify-between"}`}>
          {currentStep > 0 && (
            <button
              onClick={() => { setCurrentStep((s) => s - 1); setStepError(""); window.scrollTo(0, 0); }}
              disabled={submitting}
              className="flex items-center gap-2 h-[52px] px-6 rounded-xl border border-neutral-200 text-neutral-700 font-medium text-[15px] hover:bg-neutral-50 transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {currentStep < 2 ? (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 h-[52px] px-8 rounded-xl text-white font-semibold text-[15px] transition-all hover:bg-[#9A2622]"
              style={{ background: "#7A1D1B" }}
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting || !termsAccepted}
              className="flex items-center gap-2 h-[52px] px-8 rounded-xl text-white font-semibold text-[15px] transition-all hover:bg-[#9A2622] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "#7A1D1B" }}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Small helper components ───────────────────────────────────────────────────

function ReviewCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-100">
        <h3 className="text-[13px] font-semibold text-neutral-700">{title}</h3>
      </div>
      <div className="divide-y divide-neutral-100">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 gap-4">
      <span className="text-[13px] text-neutral-500 flex-shrink-0">{label}</span>
      <span className="text-[13px] text-neutral-900 font-medium text-right">{value}</span>
    </div>
  );
}

function DocumentRow({ label, file }: { label: string; file: FileWithPreview | null }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 gap-4">
      <span className="text-[13px] text-neutral-500">{label}</span>
      {file ? (
        <span className="flex items-center gap-1.5 text-[12px] text-green-700 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Ready
        </span>
      ) : (
        <span className="text-[12px] text-neutral-400">Not uploaded</span>
      )}
    </div>
  );
}
