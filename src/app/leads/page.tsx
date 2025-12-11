"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  degree: string;
  course?: string;
  source: string;
  status?: "pending" | "done";
  deviceInfo?: {
    browser?: { name?: string; version?: string };
    os?: { name?: string; version?: string };
    device?: { type?: string };
  };
  geolocation?: {
    ip?: string;
    city?: string;
    region?: string;
    country_name?: string;
  };
  createdAt: string;
}

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("leads_authenticated", "true");
      } else {
        setAuthError(data.message || "Invalid username or password");
      }
    } catch (err) {
      setAuthError("Login failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    // Check if already authenticated in this session
    const isAuth = sessionStorage.getItem("leads_authenticated") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/leads");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch leads");
      }

      setLeads(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("leads_authenticated");
    setLeads([]);
  };

  // Login Modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] to-[#14213d] p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#fca311] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#0a192f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0a192f]">
              Admin Login
            </h1>
            <p className="text-gray-500 mt-1">Enter credentials to view leads</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#0a192f] mb-1">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                placeholder="Enter username"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0a192f] mb-1">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#fca311] text-[#0a192f] py-3 rounded-lg font-bold text-lg hover:bg-[#e5940c] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchLeads}
            className="bg-[#fca311] text-[#0a192f] px-6 py-2 rounded-lg font-semibold hover:bg-[#e5940c] transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0a192f]">
              Leads Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Total Leads: <span className="font-semibold text-[#0a192f]">{leads.length}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Refresh Button */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 bg-[#0a192f] text-white px-4 py-2 rounded-lg hover:bg-[#14213d] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Table */}
        {leads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">No Leads Yet</h3>
            <p className="text-gray-500">Leads will appear here once users submit the form.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-[#0a192f] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Degree</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead, index) => (
                    <tr
                      key={lead._id}
                      onClick={() => router.push(`/leads/${lead._id}`)}
                      className="hover:bg-[#fca311]/10 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#0a192f]">{lead.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#27ae60] font-medium">{lead.phone}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getDegreeLabel(lead.degree)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {lead.geolocation?.city && lead.geolocation?.country_name
                          ? `${lead.geolocation.city}, ${lead.geolocation.country_name}`
                          : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lead.status === "done"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {lead.status === "done" ? "✅ Done" : "⏳ Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
