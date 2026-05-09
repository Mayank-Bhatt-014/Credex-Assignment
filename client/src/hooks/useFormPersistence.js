"use client";

import { useEffect, useState } from "react";
import { DEFAULT_TOOLS } from "../lib/pricingData.js";

const STORAGE_KEY = "credex_audit_form";

const DEFAULT_FORM_DATA = {
  teamSize: 1,
  useCase: "mixed",
  tools: DEFAULT_TOOLS,
};

export default function useFormPersistence() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setFormData({ ...DEFAULT_FORM_DATA, ...JSON.parse(saved) });
        }
      } catch {
        // ignore
      }
      setIsLoaded(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData, isLoaded]);

  return [formData, setFormData];
}
