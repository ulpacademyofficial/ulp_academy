"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  degree: string;
  course?: string;
  source: string;
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

  useEffect(() => {
    // Check authentication
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lead details...</p>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/leads"
            className="flex items-center gap-2 text-[#0a192f] hover:text-[#fca311] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Leads
          </Link>
        </div>

        {/* Lead Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#0a192f] text-white p-6">
            <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold">{lead.name}</h1>
            <p className="text-gray-300 mt-1">Submitted on {formatDate(lead.createdAt)}</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
                label="Email"
                value={lead.email}
                href={`mailto:${lead.email}`}
              />
              <InfoCard
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                }
                label="Phone"
                value={lead.phone}
                href={`tel:${lead.phone}`}
              />
            </div>

            {/* Course Info */}
            <div>
              <h3 className="text-lg font-semibold text-[#0a192f] mb-3">Course Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Degree Level</p>
                  <p className="font-semibold text-[#0a192f]">{getDegreeLabel(lead.degree)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Course</p>
                  <p className="font-semibold text-[#0a192f]">{lead.course || "-"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Source</p>
                  <p className="font-semibold text-[#0a192f]">{lead.source}</p>
                </div>
              </div>
            </div>

            {/* Location Info */}
            {lead.geolocation && (
              <div>
                <h3 className="text-lg font-semibold text-[#0a192f] mb-3">Location Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">IP Address</p>
                    <p className="font-semibold text-[#0a192f]">{lead.geolocation.ip || "-"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-semibold text-[#0a192f]">{lead.geolocation.city || "-"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Region</p>
                    <p className="font-semibold text-[#0a192f]">{lead.geolocation.region || "-"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-semibold text-[#0a192f]">{lead.geolocation.country_name || "-"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Postal Code</p>
                    <p className="font-semibold text-[#0a192f]">{lead.geolocation.postal || "-"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Timezone</p>
                    <p className="font-semibold text-[#0a192f]">{lead.geolocation.timezone || "-"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg col-span-1 md:col-span-2">
                    <p className="text-sm text-gray-500">ISP / Organization</p>
                    <p className="font-semibold text-[#0a192f]">{lead.geolocation.org || "-"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Device Info */}
            {lead.deviceInfo && (
              <div>
                <h3 className="text-lg font-semibold text-[#0a192f] mb-3">Device Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Browser</p>
                    <p className="font-semibold text-[#0a192f]">
                      {lead.deviceInfo.browser?.name || "-"}
                      {lead.deviceInfo.browser?.version && ` v${lead.deviceInfo.browser.version}`}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Operating System</p>
                    <p className="font-semibold text-[#0a192f]">
                      {lead.deviceInfo.os?.name || "-"}
                      {lead.deviceInfo.os?.version && ` ${lead.deviceInfo.os.version}`}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Device</p>
                    <p className="font-semibold text-[#0a192f]">
                      {lead.deviceInfo.device?.vendor || "-"}
                      {lead.deviceInfo.device?.model && ` ${lead.deviceInfo.device.model}`}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">CPU Architecture</p>
                    <p className="font-semibold text-[#0a192f]">{lead.deviceInfo.cpu?.architecture || "-"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="border-t pt-4 text-sm text-gray-500">
              <p>Created: {formatDate(lead.createdAt)}</p>
              <p>Last Updated: {formatDate(lead.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
      <div className="w-10 h-10 bg-[#fca311] rounded-full flex items-center justify-center text-[#0a192f]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        {href ? (
          <a href={href} className="font-semibold text-[#0a192f] hover:text-[#fca311] transition-colors">
            {value}
          </a>
        ) : (
          <p className="font-semibold text-[#0a192f]">{value}</p>
        )}
      </div>
    </div>
  );
}
