import { EFinancialStatementPeriod } from "../constants";

export type TFireantPostQuery = {
  symbol?: string;
  offset?: number;
  limit?: number;
}

export type TFireantHistoryPriceQuery = {
  symbol: string;
  offset?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export type TFireantFinancialStatementQuery = {
  symbol: string;
  type?: EFinancialStatementPeriod;
  count?: number;
}