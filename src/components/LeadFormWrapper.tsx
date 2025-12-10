"use client";

import { useState, useEffect } from "react";
import LeadFormModal from "@/components/LeadFormModal";

export default function LeadFormWrapper() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if traffic=paid query param is present
    const urlParams = new URLSearchParams(window.location.search);
    const isPaidTraffic = urlParams.get("traffic") === "paid";
    
    // Only show form for paid traffic
    if (!isPaidTraffic) {
      return;
    }
    
    // Check if user has already submitted the form
    const hasSubmitted = localStorage.getItem("ulp_lead_submitted");
    
    if (!hasSubmitted) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
    // Optionally mark as "skipped" so we don't show again immediately
    // But it will show again on next visit if not submitted
  };

  if (!showModal) return null;

  return <LeadFormModal onClose={handleClose} />;
}
