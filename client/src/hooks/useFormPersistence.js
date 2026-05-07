"use client";

import { useEffect, useState } from "react";
import { DEFAULT_TOOLS } from "../lib/pricingData.js";

const STORAGE_KEY = "credex_audit_form";

const DEFAULT_FORM_DATA = {
  teamSize: 1,
  useCase: "mixed",
  tools: DEFAULT_TOOLS,
};

function getInitialFormData() {
  if (typeof window === "undefined") {
    return DEFAULT_FORM_DATA;
  }

  try {
    const savedFormData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedFormData) {
      return DEFAULT_FORM_DATA;
    }

    return {
      ...DEFAULT_FORM_DATA,
      ...JSON.parse(savedFormData),
    };
  } catch {
    return DEFAULT_FORM_DATA;
  }
}

export default function useFormPersistence() {
  const [formData, setFormData] = useState(getInitialFormData);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // localStorage can fail in private browsing or restricted environments.
    }
  }, [formData]);

  return [formData, setFormData];
}
