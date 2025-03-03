
import { QuoteStatus } from './quoteStatus';
import { QuoteContact } from './quoteContact';
import { QuoteItem } from './quoteItem';
import { QuoteDiscount } from './quoteDiscount';
import { QuoteHistoryEntry } from './quoteHistory';
import { QuoteIssuer } from './quoteIssuer';

export interface Quote {
  id: number;
  reference: string;
  createdAt: string;
  expirationDate: string;
  status: QuoteStatus;
  client: QuoteContact;
  issuer: QuoteIssuer;
  items: QuoteItem[];
  subtotal: number;
  taxTotal: number;
  discount?: QuoteDiscount;
  total: number;
  notes?: string;
  terms?: string;
  projectId?: number;
  interventionId?: number;
  responsibleId: number;
  responsibleName: string;
  history: QuoteHistoryEntry[];
  signatureUrl?: string;
}
