"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTimeAgo, formatDateTime } from "@/utils/dateUtils";

interface Log {
  _id: string;
  type: "user" | "staff";
  action: string;
  details?: Record<string, unknown>;
  leadId?: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function HistoryLogsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "user" | "staff">("all");
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });

  // Check authentication
  useEffect(() => {
    const isAuth = sessionStorage.getItem("leads_authenticated") === "true";
    const username = sessionStorage.getItem("leads_username");
    
    if (!isAuth || username !== "sachin") {
      router.push("/leads");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const fetchLogs = async (page: number = 1, type?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50",
      });
      if (type && type !== "all") {
        params.set("type", type);
      }

      const response = await fetch(`/api/logs?${params}`);
      const data = await response.json();

      if (data.success) {
        setLogs(data.data);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(1, activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: "all" | "user" | "staff") => {
    setActiveTab(tab);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    fetchLogs(newPage, activeTab);
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      lead_submitted: "Lead Submitted",
      lead_updated: "Lead Updated",
      login: "Login",
      logout: "Logout",
      status_change: "Status Change",
      note_added: "Note Added",
      phone_click: "Phone Click",
      whatsapp_click: "WhatsApp Click",
      email_click: "Email Click",
    };
    return labels[action] || action;
  };

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      lead_submitted: "bg-green-100 text-green-800",
      lead_updated: "bg-blue-100 text-blue-800",
      login: "bg-purple-100 text-purple-800",
      logout: "bg-gray-100 text-gray-800",
      status_change: "bg-yellow-100 text-yellow-800",
      note_added: "bg-orange-100 text-orange-800",
      phone_click: "bg-emerald-100 text-emerald-800",
      whatsapp_click: "bg-green-100 text-green-800",
      email_click: "bg-blue-100 text-blue-800",
    };
    return colors[action] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0a192f]">
              Activity Logs
            </h1>
            <p className="text-gray-600 mt-1">
              Total: <span className="font-semibold">{pagination.total}</span> logs
            </p>
          </div>
          <Link
            href="/leads"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0a192f] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Leads
          </Link>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b">
            {(["all", "user", "staff"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-[#fca311] border-b-2 border-[#fca311] bg-[#fca311]/5"
                    : "text-gray-600 hover:text-[#0a192f] hover:bg-gray-50"
                }`}
              >
                {tab === "all" ? "All Logs" : tab === "user" ? "User Logs" : "Staff Logs"}
              </button>
            ))}
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#fca311]"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No logs found
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0a192f] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Details</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">IP Address</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {logs.map((log, index) => (
                      <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {(pagination.page - 1) * pagination.limit + index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              log.type === "user"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {log.type === "user" ? "User" : "Staff"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(
                              log.action
                            )}`}
                          >
                            {getActionLabel(log.action)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {log.details ? (
                            <span title={JSON.stringify(log.details)}>
                              {log.details.leadName
                                ? `Lead: ${log.details.leadName}`
                                : log.details.name
                                ? `Name: ${log.details.name}`
                                : log.details.username
                                ? `User: ${log.details.username}`
                                : JSON.stringify(log.details).slice(0, 50)}
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                          {log.ip || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500" title={formatDateTime(log.createdAt)}>
                          {getTimeAgo(log.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t">
                  <div className="text-sm text-gray-600">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                    {pagination.total} logs
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        let pageNum;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (pagination.page <= 3) {
                          pageNum = i + 1;
                        } else if (pagination.page >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = pagination.page - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${
                              pagination.page === pageNum
                                ? "bg-[#fca311] text-[#0a192f]"
                                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
