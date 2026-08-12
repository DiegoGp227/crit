"use client";

import useSWR from "swr";
import { ClassificationURL } from "@/src/shared/constants/urls";
import {
  fetchClassification,
  type ClassificationEntry,
} from "../services/classificationService";

export const useClassification = () => {
  const { data, error, isLoading, mutate } = useSWR<ClassificationEntry[]>(
    ClassificationURL,
    fetchClassification,
  );

  return {
    classification: data ?? [],
    error,
    isLoading,
    mutate,
  };
};