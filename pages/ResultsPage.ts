import { Page, Locator } from "playwright";
import BasePage from "./BasePage";

class ResultsPage extends BasePage {
  categoryHotelsTab: string; // Selector for the hotels category tab

  constructor(page: Page) {
    super(page);

    // Selectors
    
  }

  // Select a checkbox by its value
  async selectCheckboxByValue(value: string) {
    const checkbox = await this.page.locator(`input[type="checkbox"][value="${value}"]`);
    await checkbox.check();
  }

  // Unselect a checkbox by its value
  async unselectCheckboxByValue(value: string) {
    const checkbox = await this.page.locator(`input[type="checkbox"][value="${value}"]`);
    await checkbox.uncheck();
  }

  // Select an option by its value from a dropdown
  async selectOptionByValue(value: string) {
    // Click the button to open the grid options
    await this.page.getByRole('button', { name: 'Grid' }).click();
    // Locate the option by its value and click it
    const option = this.page.locator(`//div[@data-combobox-option="true"][@value="${value}"]`);
    await option.click();
  }

  // Get the value of the first price filter
  async getFirstPriceFilter() {
    const inputElement = this.page.locator('input[name="undefined_from"]').first();
    const value = await inputElement.getAttribute('value');
    return value;
  }

  // Get the value of the last price filter
  async getLastPriceFilter() {
    const inputElement = this.page.locator('input[name="undefined_to"]').first();
    const value = await inputElement.getAttribute('value');
    return value;
  }

  // Click on the map and zoom in by clicking the markers
  async clickOnTheMapAndZoomIn() {
    // Locate the first marker
    const marker = this.page.locator('gmp-advanced-marker[role="button"]').first();
    // Click 3 times on the first marker
    for (let i = 0; i < 3; i++) {
      await marker.click();
    }
    // Locate the second marker
    const marker2 = this.page.locator('gmp-advanced-marker[role="button"]').nth(1);
    // Wait for the marker to be visible and stable before clicking it
    await marker2.waitFor({ state: "visible" });
    // Click the second marker
    await marker2.click();
  }

  // Get the rating value of the current listing
  async getRating() {
    // Use a more relative and clean CSS selector based on the class and structure
    const ratingElement = this.page.locator('.grid [class*="grid-area:rating-value"]');
    // Wait for the element to be visible and available
    await ratingElement.waitFor({ state: 'visible', timeout: 30000 });
    // Get the text content of the element
    const ratingText = await ratingElement.textContent();
    // Clean the text (remove any non-numeric characters)
    const cleanedRating = ratingText?.replace(/[^0-9.-]+/g, '').trim();
    // Ensure the rating is a valid number
    const rating = Number(cleanedRating);
    if (isNaN(rating)) {
      throw new Error('The rating value is not a valid number');
    }

    // Log the rating in the console
    console.log('Rating:', rating);
    return rating; // Return the cleaned rating as a number
  }

  // Get the price of the current listing
  async getPrice() {
    // Use a more relative and clean CSS selector based on the class and structure
    const priceElement = this.page.locator('[class*="flex items-end gap"] > span.font-bold');
    // Wait for the element to be visible and available
    await priceElement.waitFor({ state: 'visible', timeout: 30000 });
    // Get the text content of the element
    const priceText = await priceElement.textContent();
    // Clean the text (remove currency symbol, spaces, etc.)
    const cleanedPrice = priceText?.replace(/[^0-9.-]+/g, '').trim();
    // Return the cleaned price
    return cleanedPrice;
  }
}

export default ResultsPage;
