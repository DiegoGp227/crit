"use client";

import { useMemo } from "react";
import { useClassification } from "./useClassification";
import type {
  ClassificationEntry,
  CompetitionType,
} from "../services/classificationService";

export interface Champion {
  /** Campeón de la categoría. */
  entry: ClassificationEntry;
  /** Los tres primeros de la categoría, en orden de puntos. */
  podium: ClassificationEntry[];
  /** Hay más de un corredor empatado en el primer puesto. */
  tied: boolean;
}

export interface ChampionsByType {
  EXPERTOS: Champion | null;
  FEMENINO: Champion | null;
}

const CATEGORY_ORDER: CompetitionType[] = ["EXPERTOS", "FEMENINO"];

export const useChampions = () => {
  const { classification, isLoading, error } = useClassification(1, 100);

  const champions = useMemo<ChampionsByType>(() => {
    const result: ChampionsByType = { EXPERTOS: null, FEMENINO: null };

    for (const type of CATEGORY_ORDER) {
      const entries = classification.filter(
        (entry) => entry.competitionType === type,
      );

      if (entries.length === 0) continue;

      const [first, second] = entries;

      result[type] = {
        entry: first,
        podium: entries.slice(0, 3),
        tied: second !== undefined && second.points === first.points,
      };
    }

    return result;
  }, [classification]);

  const list = useMemo(
    () =>
      CATEGORY_ORDER.map((type) => ({ type, champion: champions[type] })).filter(
        (item): item is { type: CompetitionType; champion: Champion } =>
          item.champion !== null,
      ),
    [champions],
  );

  return {
    champions,
    list,
    isLoading,
    error,
    hasChampions: list.length > 0,
  };
};
