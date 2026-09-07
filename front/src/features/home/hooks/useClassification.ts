"use client";

import useSWR from "swr";
import { ClassificationURL } from "@/src/shared/constants/urls";
import {
  fetchClassification,
  type ClassificationEntry,
  type PaginationMeta,
} from "../services/classificationService";

export const useClassification = (
  page: number | null = 1,
  pageSize = 10,
  competitionType?: string,
) => {
  const key =
    page === null
      ? null
      : `${ClassificationURL}?page=${page}&pageSize=${pageSize}${competitionType ? `&competitionType=${competitionType}` : ""}`;
  const { data, error, isLoading, mutate } = useSWR<{
    classification: ClassificationEntry[];
    pagination: PaginationMeta;
  }>(key, () => fetchClassification({ page: page ?? 1, pageSize, competitionType }));

  return {
    classification: data?.classification ?? [],
    pagination: data?.pagination ?? { page: 1, pageSize: 10, total: 0, totalPages: 0 },
    error,
    isLoading,
    mutate,
  };
};