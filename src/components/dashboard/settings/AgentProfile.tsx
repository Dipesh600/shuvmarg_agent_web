import React, { useState, useEffect, useRef } from "react";
import { useGlobalStore } from "@/lib/store";
import { FileText, CheckCircle, Clock, MapPin, Building2, Hash, Calendar, X, ZoomIn, Loader2 } from "lucide-react";
import { authFetch } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL!;

// In-memory cache to avoid refetching the same document in the same session
const blobCache = new Map<string, string>();
const pendingFetches = new Map<string, Promise<string>>();

/** Returns the server-proxy URL for an S3 fileKey — never exposes the signed S3 URL */
function buildDocProxyUrl(fileKey: string) {
  return `${API}/agent/documents/view?key=${encodeURIComponent(fileKey)}`;
}

/**
 * Fetches a protected document via authFetch (sends JWT header) and renders it.
 * Converts the response into a blob URL so <img>/<iframe>/<object> work without
 * needing cookies or custom headers from the browser.
 */
function SecureDocMedia({
  proxyUrl,
  alt,
  className,
  type = "img",
}: {
  proxyUrl: string;
  alt: string;
  className?: string;
  type?: "img" | "iframe";
}) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let revoked = false;

    // Use cached blob if available
    if (blobCache.has(proxyUrl)) {
      setBlobUrl(blobCache.get(proxyUrl)!);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);
    setBlobUrl(null);

    // Check if there is a pending fetch for this URL to avoid duplicate concurrent requests
    let fetchPromise = pendingFetches.get(proxyUrl);
    if (!fetchPromise) {
      fetchPromise = authFetch(proxyUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`${res.status}`);
          return res.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          blobCache.set(proxyUrl, url);
          return url;
        });
      pendingFetches.set(proxyUrl, fetchPromise);
      
      // Clean up the pending fetch once it's done
      fetchPromise.finally(() => {
        pendingFetches.delete(proxyUrl);
      });
    }

    fetchPromise
      .then((url) => {
        if (revoked) return;
        setBlobUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        if (!revoked) { 
          console.error("Failed to load secure media:", err, "URL:", proxyUrl);
          setError(true); 
          setLoading(false); 
        }
      });

    return () => { revoked = true; };
  }, [proxyUrl]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-neutral-100 ${className}`}>
        <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
      </div>
    );
  }
  if (error || !blobUrl) {
    return (
      <div className={`flex items-center justify-center bg-neutral-100 ${className}`}>
        <FileText className="w-6 h-6 text-neutral-400" />
      </div>
    );
  }

  if (type === "iframe") {
    return <iframe src={blobUrl} title={alt} className={className} style={{ border: 0 }} />;
  }
  return <img src={blobUrl} alt={alt} className={className} />;
}

function InfoField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <label className="block text-[12px] font-bold text-neutral-500 uppercase tracking-wider mb-2">{label}</label>
      <div className="min-h-11 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center text-[14px] text-neutral-700 font-medium">
        {value || <span className="text-neutral-400 font-normal italic">Not provided</span>}
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <h3 className="text-[15px] font-bold text-neutral-900 mb-4 flex items-center gap-2">
      <Icon className="w-4 h-4 text-neutral-500" />
      {title}
    </h3>
  );
}

function DocStatusBadge({ verified }: { verified: boolean }) {
  if (verified) {
    return (
      <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[11px] font-bold rounded border border-green-100 flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        Verified
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[11px] font-bold rounded border border-amber-100 flex items-center gap-1">
      <Clock className="w-3 h-3" />
      Pending
    </span>
  );
}

function formatDocType(type: string) {
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AgentProfile() {
  const { agentProfile } = useGlobalStore();
  const [selectedDoc, setSelectedDoc] = useState<{ proxyUrl: string; type: string } | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedDoc(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const fullAddress = [agentProfile?.placeName, agentProfile?.municipality, agentProfile?.district]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 p-8 shadow-sm min-h-[400px]">
      <h2 className="text-[20px] font-bold text-neutral-900 mb-6">Profile</h2>

      {/* Top Banner */}
      <div className="flex items-center gap-6 mb-8 pb-8 border-b border-neutral-100">
        <div className="w-20 h-20 rounded-2xl bg-neutral-100 text-[#D96B62] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden border border-neutral-200">
          {agentProfile?.avatar ? (
            <img src={agentProfile.avatar} alt={agentProfile.name || "Avatar"} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[24px] font-black">{agentProfile?.initials || "AG"}</span>
          )}
        </div>
        <div>
          <h3 className="text-[22px] font-bold text-neutral-900 leading-tight mb-1">
            {agentProfile?.businessName || agentProfile?.name || "Travel Agent"}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {agentProfile?.id && (
              <span className="text-[13px] text-neutral-500 font-medium">Partner ID: {agentProfile.id}</span>
            )}
            {agentProfile?.id && <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />}
            {agentProfile?.agentType && (
              <span className="text-[13px] text-neutral-500 font-medium capitalize">{agentProfile.agentType}</span>
            )}
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[11px] font-bold uppercase tracking-wider rounded-md">
              Verified
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-8 max-w-4xl">

        {/* Business Details */}
        <div>
          <SectionHeader icon={Building2} title="Business Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="Business Name" value={agentProfile?.businessName} />
            <InfoField label="Operation Type" value={agentProfile?.operationType} />
            <InfoField label="Shop / Office Address" value={agentProfile?.shopAddress} />
            <InfoField label="Claimed Monthly Volume" value={agentProfile?.claimedMonthlyVolume} />
          </div>
        </div>

        {/* Location */}
        <div>
          <SectionHeader icon={MapPin} title="Location" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoField label="District" value={agentProfile?.district} />
            <InfoField label="Municipality" value={agentProfile?.municipality} />
            <InfoField label="Place Name" value={agentProfile?.placeName} />
          </div>
        </div>

        {/* Identification */}
        <div>
          <SectionHeader icon={Hash} title="Identification" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoField label="PAN Number" value={agentProfile?.panNumber} />
            <InfoField label="Citizenship Number" value={agentProfile?.citizenshipNumber} />
            <InfoField label="National ID Number" value={agentProfile?.nationalIdNumber} />
          </div>
        </div>

        {/* Onboarding Documents */}
        <div className="pt-6 border-t border-neutral-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-neutral-900 mb-0.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-500" />
                Submitted Documents
              </h3>
              <p className="text-[13px] text-neutral-500">Documents verified during your onboarding.</p>
            </div>
            <span className="px-3 py-1.5 bg-neutral-100 text-neutral-600 text-[12px] font-bold rounded-lg border border-neutral-200">
              Read Only
            </span>
          </div>

          {agentProfile?.documents && agentProfile.documents.length > 0 ? (
            <div className="flex gap-5 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
              {agentProfile.documents.map((doc, i) => (
                <div
                  key={i}
                  className="relative group rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm hover:shadow-md transition-all h-[200px] w-[220px] flex-shrink-0 cursor-pointer"
                  onClick={() => doc.fileKey && setSelectedDoc({ proxyUrl: buildDocProxyUrl(doc.fileKey), type: doc.type })}
                  title={`View ${formatDocType(doc.type)}`}
                >
                  {doc.fileKey ? (
                    <>
                      <SecureDocMedia
                        proxyUrl={buildDocProxyUrl(doc.fileKey)}
                        alt={formatDocType(doc.type)}
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900/30">
                        <ZoomIn className="w-6 h-6 text-white drop-shadow" />
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
                      <FileText className="w-12 h-12 text-neutral-300" />
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/20 to-transparent" />

                  {/* Status badge top-right */}
                  <div className="absolute top-3 right-3">
                    <DocStatusBadge verified={doc.verified} />
                  </div>

                  {/* Bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-[13px] font-bold text-white truncate">{formatDocType(doc.type)}</div>
                    {doc.uploadedAt && (
                      <div className="text-[11px] text-neutral-300 mt-0.5">
                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString("en-NP", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center bg-neutral-50 border border-neutral-200 rounded-xl">
              <FileText className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-[14px] text-neutral-500">No documents on file.</p>
            </div>
          )}
        </div>

        {/* Account Dates */}
        {(agentProfile?.submittedAt || agentProfile?.approvedAt) && (
          <div className="pt-6 border-t border-neutral-100">
            <SectionHeader icon={Calendar} title="Account Timeline" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agentProfile?.submittedAt && (
                <InfoField
                  label="Application Submitted"
                  value={new Date(agentProfile.submittedAt).toLocaleDateString("en-NP", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                />
              )}
              {agentProfile?.approvedAt && (
                <InfoField
                  label="Account Approved"
                  value={new Date(agentProfile.approvedAt).toLocaleDateString("en-NP", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                />
              )}
            </div>
          </div>
        )}

      </div>

      {/* Document Preview Modal */}
      {selectedDoc && (() => {
        const url = selectedDoc.proxyUrl;
        // Detect type from the proxy URL's key param
        const rawKey = new URL(url, "http://x").searchParams.get("key") ?? "";
        const keyLower = rawKey.toLowerCase();
        const isPdf = keyLower.endsWith(".pdf");
        const isImage = /\.(jpg|jpeg|png|webp|gif|bmp|svg)$/.test(keyLower);

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/80 backdrop-blur-sm"
            onClick={() => setSelectedDoc(null)}
          >
            <div
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 flex-shrink-0">
                <div>
                  <h3 className="text-[16px] font-bold text-neutral-900">{formatDocType(selectedDoc.type)}</h3>
                  <p className="text-[12px] text-neutral-500 mt-0.5">Press Esc or click outside to close</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      try {
                        let url = blobCache.get(selectedDoc.proxyUrl);
                        if (!url) {
                          const res = await authFetch(selectedDoc.proxyUrl);
                          if (!res.ok) return;
                          const blob = await res.blob();
                          url = URL.createObjectURL(blob);
                          blobCache.set(selectedDoc.proxyUrl, url);
                        }
                        const tab = window.open(url, "_blank");
                        if (!tab) alert("Allow pop-ups to open the document in a new tab.");
                      } catch { /* silent */ }
                    }}
                    className="px-3 h-9 rounded-xl border border-neutral-200 hover:bg-neutral-50 flex items-center gap-1.5 text-[13px] font-medium text-neutral-600 transition-colors"
                  >
                    Open in tab
                  </button>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="w-9 h-9 rounded-xl border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Body */}
              <div className="flex-1 overflow-auto bg-neutral-50 flex items-center justify-center">
                {isImage && (
                  <div className="p-4 w-full flex items-center justify-center">
                    <SecureDocMedia
                      proxyUrl={selectedDoc.proxyUrl}
                      alt={formatDocType(selectedDoc.type)}
                      className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-sm"
                    />
                  </div>
                )}

                {isPdf && (
                  <SecureDocMedia
                    proxyUrl={selectedDoc.proxyUrl}
                    alt={formatDocType(selectedDoc.type)}
                    type="iframe"
                    className="w-full h-[70vh]"
                  />
                )}

                {!isImage && !isPdf && (
                  <div className="flex flex-col items-center gap-4 py-16 px-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-neutral-900 mb-1">Can't preview this file</p>
                      <p className="text-[13px] text-neutral-500 mb-5">This file type can't be displayed in the browser.</p>
                      <button
                        onClick={async () => {
                          try {
                            let url = blobCache.get(selectedDoc.proxyUrl);
                            if (!url) {
                              const res = await authFetch(selectedDoc.proxyUrl);
                              if (!res.ok) return;
                              const blob = await res.blob();
                              url = URL.createObjectURL(blob);
                              blobCache.set(selectedDoc.proxyUrl, url);
                            }
                            const tab = window.open(url, "_blank");
                            if (!tab) alert("Allow pop-ups to open the document in a new tab.");
                          } catch { /* silent */ }
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7A1D1B] text-white text-[13px] font-bold rounded-xl hover:bg-[#9A2622] transition-colors"
                      >
                        Download &amp; View
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
