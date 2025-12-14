"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTimeAgo, formatDateTime } from "@/utils/dateUtils";

interface Event {
  _id: string;
  visitorId: string;
  eventType: string;
  pageUrl: string;
  queryParam: string;
  pageSlug: string;
  referrer: string;
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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function VisitorPageViewsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });

  const [activeTab, setActiveTab] = useState<"all" | "page_view" | "button_click">("all");

  // Check authentication
  useEffect(() => {
    const isAuth = sessionStorage.getItem("leads_authenticated") === "true";
    if (!isAuth) {
      router.push("/leads");
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  // Fetch events
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents(pagination.page);
    }
  }, [isAuthenticated, pagination.page, activeTab]);

  const fetchEvents = async (page: number) => {
    try {
      setLoading(true);
      let query = `?page=${page}&limit=50`;
      
      if (activeTab === "page_view") {
        query += "&type=pageView";
      } else if (activeTab === "button_click") {
        query += "&exclude_type=pageView";
      }
      
      const response = await fetch(`/api/events${query}`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0a192f]">
              Visitor Page Views
            </h1>
            <p className="text-gray-600 mt-1">
              Total Events: <span className="font-semibold text-[#0a192f]">{pagination.total}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/leads"
              className="flex items-center gap-2 bg-[#0a192f] text-white px-4 py-2 rounded-lg hover:bg-[#14213d] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Leads
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab("all");
              setPagination(p => ({ ...p, page: 1 }));
            }}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "all"
                ? "border-[#fca311] text-[#fca311]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setActiveTab("page_view");
              setPagination(p => ({ ...p, page: 1 }));
            }}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "page_view"
                ? "border-[#fca311] text-[#fca311]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Page Views
          </button>
          <button
            onClick={() => {
              setActiveTab("button_click");
              setPagination(p => ({ ...p, page: 1 }));
            }}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "button_click"
                ? "border-[#fca311] text-[#fca311]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Button Click
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#fca311]"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No page views found
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap text-sm">
                  <thead className="bg-[#0a192f] text-white">
                    <tr>
                      <th className="px-3 py-3 text-left font-semibold">#</th>
                      <th className="px-3 py-3 text-left font-semibold">Visitor ID</th>
                      <th className="px-3 py-3 text-left font-semibold">Page</th>

                      <th className="px-3 py-3 text-left font-semibold">IP</th>
                      <th className="px-3 py-3 text-left font-semibold">City</th>
                      <th className="px-3 py-3 text-left font-semibold">Region</th>
                      <th className="px-3 py-3 text-left font-semibold">Country</th>
                      <th className="px-3 py-3 text-left font-semibold">Browser</th>
                      <th className="px-3 py-3 text-left font-semibold">Browser Ver.</th>
                      <th className="px-3 py-3 text-left font-semibold">OS</th>
                      <th className="px-3 py-3 text-left font-semibold">OS Ver.</th>
                      <th className="px-3 py-3 text-left font-semibold">Device</th>
                      <th className="px-3 py-3 text-left font-semibold">Time</th>
                      <th className="px-3 py-3 text-left font-semibold">Query Params</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {events.map((event, index) => (
                      <tr
                        key={event._id}
                        className="hover:bg-[#fca311]/10 transition-colors"
                      >
                        <td className="px-3 py-3 text-gray-600">
                          {(pagination.page - 1) * pagination.limit + index + 1}
                        </td>
                        <td className="px-3 py-3">
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-[#0a192f]">
                            {event.visitorId.length > 20
                              ? `${event.visitorId.substring(0, 20)}...`
                              : event.visitorId}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-[#0a192f] font-medium">
                            {event.pageSlug || "-"}
                          </span>
                        </td>

                        <td className="px-3 py-3 text-gray-600">
                          {event.geolocation?.ip || "-"}
                        </td>
                        <td className="px-3 py-3 text-gray-600">
                          {event.geolocation?.city || "-"}
                        </td>
                        <td className="px-3 py-3 text-gray-600">
                          {event.geolocation?.region || "-"}
                        </td>
                        <td className="px-3 py-3 text-gray-600">
                          {event.geolocation?.country_name || "-"}
                        </td>
                        <td className="px-3 py-3 text-gray-600">
                          {event.deviceInfo?.browser?.name || "-"}
                        </td>
                        <td className="px-3 py-3 text-gray-600">
                          {event.deviceInfo?.browser?.version || "-"}
                        </td>
                        <td className="px-3 py-3 text-gray-600">
                          {event.deviceInfo?.os?.name || "-"}
                        </td>
                        <td className="px-3 py-3 text-gray-600">
                          {event.deviceInfo?.os?.version || "-"}
                        </td>
                        <td className="px-3 py-3 text-gray-600">
                          {event.deviceInfo?.device?.type || "-"}
                        </td>
                        <td className="px-3 py-3 text-gray-500" title={formatDateTime(event.createdAt)}>
                          {getTimeAgo(event.createdAt)}
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-xs text-gray-600 font-mono">
                            {event.queryParam || "-"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                      disabled={pagination.page === 1}
                      className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                      disabled={pagination.page >= pagination.totalPages}
                      className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
