import { portfolioSchema } from "../features/portfolio/portfolio.schema";
import type { Portfolio } from "../types/portfolio.types";

/** Served from /public — edit public/data/portfolio.json to change collections. */
const PORTFOLIO_DATA_URL = `${import.meta.env.BASE_URL}data/portfolio.json`;

export async function fetchPortfolio(signal?: AbortSignal): Promise<Portfolio> {
  const response = await fetch(PORTFOLIO_DATA_URL, { signal, cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Portfolio data request failed (${response.status})`);
  }
  return portfolioSchema.parse(await response.json());
}
