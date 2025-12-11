"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getTimeAgo, formatDateTime } from "@/utils/dateUtils";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  degree: string;
  course?: string;
  source: string;
  status: "pending" | "done";
  notes?: { text: string; createdAt: string }[];
  deviceInfo?: {
    browser?: { name?: string; version?: string };
    os?: { name?: string; version?: string };
    device?: { model?: string; type?: string; vendor?: string };
    cpu?: { architecture?: string };
  };
  geolocation?: {
    ip?: string;
    city?: string;
    region?: string;
    country_name?: string;
    postal?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    org?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("leads_authenticated") === "true";
    if (!isAuth) {
      router.push("/leads");
      return;
    }

    if (params.id) {
      fetchLead(params.id as string);
    }
  }, [params.id, router]);

  const fetchLead = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/leads/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch lead");
      }

      setLead(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };



  const getDegreeLabel = (degree: string) => {
    const labels: Record<string, string> = {
      "10th": "10th Class",
      "12th": "12th Class",
      graduation: "Graduation",
      "post-graduation": "Post Graduation",
    };
    return labels[degree] || degree;
  };



  const updateStatus = async (newStatus: "pending" | "done") => {
    if (!lead || updatingStatus) return;
    
    setUpdatingStatus(true);
    try {
      const response = await fetch(`/api/leads/${lead._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setLead({ ...lead, status: newStatus });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const saveNotes = async () => {
    if (!lead || savingNotes) return;
    
    setSavingNotes(true);
    try {
      const response = await fetch(`/api/leads/${lead._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note: notes }),
      });

      if (response.ok) {
        const data = await response.json();
        setLead(data.data);
        setNotes(""); // Clear input after saving
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const logAction = async (action: string, details?: Record<string, unknown>) => {
    if (!lead) return;
    try {
      await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "staff",
          action,
          details: { ...details, leadName: lead.name },
          leadId: lead._id,
        }),
      });
    } catch (err) {
      console.error("Failed to log action:", err);
    }
  };

  const handlePhoneClick = () => {
    logAction("phone_click", { phone: lead?.phone });
    window.location.href = `tel:${lead?.phone}`;
  };

  const handleWhatsAppClick = () => {
    logAction("whatsapp_click", { phone: lead?.phone });
    window.open(`https://wa.me/91${lead?.phone}`, "_blank");
  };

  const handleEmailClick = () => {
    logAction("email_click", { email: lead?.email });
    window.location.href = `mailto:${lead?.email}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lead details...</p>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || "Lead not found"}</p>
          <Link
            href="/leads"
            className="bg-[#fca311] text-[#0a192f] px-6 py-2 rounded-lg font-semibold hover:bg-[#e5940c] transition-colors inline-block"
          >
            Back to Leads
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/leads"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0a192f] transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Leads
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#0a192f] to-[#14213d] text-white p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-[#fca311] rounded-full flex items-center justify-center text-[#0a192f] font-bold text-xl">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold">{lead.name}</h1>
                    <p className="text-gray-300 text-sm">{getTimeAgo(lead.createdAt)}</p>
                  </div>
                </div>
              </div>
              {/* Status Dropdown */}
              <select
                value={lead.status || "pending"}
                onChange={(e) => updateStatus(e.target.value as "pending" | "done")}
                disabled={updatingStatus}
                className={`px-5 py-2.5 rounded-xl text-base font-semibold cursor-pointer border-0 outline-none transition-colors ${
                  lead.status === "done"
                    ? "bg-green-500 text-white"
                    : "bg-orange-500 text-white"
                } ${updatingStatus ? "opacity-50" : ""}`}
              >
                <option value="pending" className="bg-white text-gray-800">Pending</option>
                <option value="done" className="bg-white text-gray-800">Done</option>
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 border-b px-8 py-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handlePhoneClick}
                className="inline-flex items-center gap-2 bg-[#27ae60] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#219a52] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#128C7E] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>
              <button
                onClick={handleEmailClick}
                className="inline-flex items-center gap-2 bg-[#2980b9] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#1a5276] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Email
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Email Address</p>
                    <p className="font-semibold text-[#0a192f]">{lead.email}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-medium">Phone Number</p>
                    <p className="font-semibold text-[#0a192f]">{lead.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#0a192f]">Course Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailCard label="Degree Level" value={getDegreeLabel(lead.degree)} />
                <DetailCard label="Course" value={lead.course || "-"} />
              </div>
            </div>

            {/* Location Info */}
            {lead.geolocation && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0a192f]">Location Information</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <DetailCard label="IP Address" value={lead.geolocation.ip || "-"} />
                  <DetailCard label="City" value={lead.geolocation.city || "-"} />
                  <DetailCard label="Region" value={lead.geolocation.region || "-"} />
                  <DetailCard label="Country" value={lead.geolocation.country_name || "-"} />
                  <DetailCard label="Postal Code" value={lead.geolocation.postal || "-"} />
                  <DetailCard label="Timezone" value={lead.geolocation.timezone || "-"} />
                  <div className="col-span-2">
                    <DetailCard label="ISP / Organization" value={lead.geolocation.org || "-"} />
                  </div>
                </div>
              </div>
            )}

            {/* Device Info */}
            {lead.deviceInfo && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0a192f]">Device Information</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <DetailCard
                    label="Browser"
                    value={`${lead.deviceInfo.browser?.name || "-"}${lead.deviceInfo.browser?.version ? ` v${lead.deviceInfo.browser.version}` : ""}`}
                  />
                  <DetailCard
                    label="Operating System"
                    value={`${lead.deviceInfo.os?.name || "-"}${lead.deviceInfo.os?.version ? ` ${lead.deviceInfo.os.version}` : ""}`}
                  />
                  <DetailCard
                    label="Device"
                    value={`${lead.deviceInfo.device?.vendor || "-"}${lead.deviceInfo.device?.model ? ` ${lead.deviceInfo.device.model}` : ""}`}
                  />
                  <DetailCard label="CPU Architecture" value={lead.deviceInfo.cpu?.architecture || "-"} />
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="border-t border-gray-200 pt-6 flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span title={formatDateTime(lead.createdAt)}>Created: {getTimeAgo(lead.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span title={formatDateTime(lead.updatedAt)}>Updated: {getTimeAgo(lead.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Card - Separate */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <h2 className="text-xl font-bold">Notes</h2>
            </div>
          </div>
          <div className="p-6">
            {/* Saved Notes Display */}
            {lead.notes && lead.notes.length > 0 && (
              <div className="mb-6 space-y-3">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Previous Notes ({lead.notes.length})</p>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {lead.notes.slice().reverse().map((noteItem, index) => (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <p className="text-[#0a192f] whitespace-pre-wrap mb-2">{noteItem.text}</p>
                      <p className="text-xs text-yellow-600" title={formatDateTime(noteItem.createdAt)}>
                        {getTimeAgo(noteItem.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Note */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Add New Note</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write a new note..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#fca311] focus:border-transparent outline-none resize-none text-[#0a192f]"
              />
              <button
                onClick={saveNotes}
                disabled={savingNotes}
                className="bg-[#fca311] text-[#0a192f] px-6 py-2.5 rounded-lg font-semibold hover:bg-[#e5940c] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {savingNotes ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0a192f]"></div>
                    Saving...
                  </>
                ) : (
                  "Save Note"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="font-semibold text-[#0a192f] text-sm">{value}</p>
    </div>
  );
}
