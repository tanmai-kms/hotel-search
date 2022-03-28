import { roundPrice, formatPrice } from "../utils/common.utils";

interface CompetitorPrice {
  name: string;
  price: number;
  formattedPrice: string;
  us?: boolean;
}

export interface HotelPriceData {
  id: number | string; // Hotel id
  currency?: string;
  price: number;
  competitors?: Record<string, number>;
  taxes_and_fees?: {
    tax: number;
    hotel_fees: number;
  };
}

export class HotelPrice implements HotelPriceData {
  id: number | string;
  currency: string;
  price: number;
  maxPrice: number = 0;
  formattedMaxPrice: string = '';
  formattedPrice: string;
  competitors?: Record<string, number>;
  taxes_and_fees?: {
    tax: number;
    hotel_fees: number;
  };
  competitorPrices: CompetitorPrice[] = [];
  saving = 0;
  formattedSaving: string = '';
  taxesFeesText: string = '';

  constructor(data: HotelPriceData) {
    this.id = data.id;
    this.currency = data.currency!;
    this.price = data.price;
    this.formattedPrice = roundPrice(this.price, this.currency) as string;
    this.competitors = data.competitors;
    this.taxes_and_fees = data.taxes_and_fees;
    this.loadCompetitorPricesAndSaving();
    this.loadTaxesFeesDetails();
  }

  loadCompetitorPricesAndSaving() {
    if (this.competitors) {
      this.competitorPrices.push({
        name: 'Us', price: this.price, formattedPrice: this.formattedPrice, us: true
      });
      for (const [name, price] of Object.entries(this.competitors)) {
        this.competitorPrices.push({ name, price, formattedPrice: roundPrice(price, this.currency) as string });
      }
      this.competitorPrices.sort((price1, price2) => {
        return price1.price - price2.price;
      });
      this.maxPrice = roundPrice(Math.max(...this.competitorPrices.map(price => price.price)), this.currency, false) as number;
      this.formattedMaxPrice = formatPrice(this.maxPrice, this.currency);
      const roundedPrice = roundPrice(this.price, this.currency, false) as number;
      this.saving = this.maxPrice > roundedPrice ? this.maxPrice - roundedPrice : 0;
      this.formattedSaving = formatPrice(this.saving, this.currency);
    }
  }

  loadTaxesFeesDetails() {
    if (this.taxes_and_fees?.tax) {
      this.taxesFeesText += 'Taxes: ' + roundPrice(this.taxes_and_fees.tax, this.currency);
    }
    if (this.taxes_and_fees?.hotel_fees) {
      if (this.taxesFeesText) {
        this.taxesFeesText += ' and ';
      }
      this.taxesFeesText += 'Fees: ' + roundPrice(this.taxes_and_fees.hotel_fees, this.currency);
    }
  }
}