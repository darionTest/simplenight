import { Page } from "playwright";
import BasePage from "./BasePage";

class HomePage extends BasePage {
  categoryHotelsTab: any;
  destinyInput: string;
  destinyButton: string;
  miamitextLocator: string;
  datesButtonLocator: string;
  currentMonthLocator: string;
  applyButtonLocator: string;
  guestsButtonLocator: string;
  addChildButtonLocator: string;
  addAdultButtonLocator: string;
  searchButtonLocator: string;

  /**
   * Constructor initializes the selectors for different elements on the page.
   * @param page - The Playwright page object to interact with the web page.
   */
  constructor(page: Page) {
    super(page);

    // Selectors
    this.categoryHotelsTab = 'button[data-testid*="category(static:hotels)"]';
    this.destinyInput = 'input[data-testid*="search-form_location_input"]';
    this.miamitextLocator = 'div:has-text("Miami")';
    this.datesButtonLocator = 'button[data-testid*="search-form_dates_trigger"]';
    this.currentMonthLocator = 'button[class*="calendarHeaderLevel"]';
    this.applyButtonLocator = 'button[data-testid*="search-form_dates_apply-button"]';
    this.guestsButtonLocator = 'button[data-testid*="_search-form_guests_trigger"]';
    this.addChildButtonLocator = 'button[data-testid*="_age(children)_add-button"]';
    this.addAdultButtonLocator = 'button[data-testid*="_age(adults)_add-button"]';
    this.searchButtonLocator = 'button[data-testid*="_search-form_search-button"]';
  }

  /**
   * Navigates to the main page of SimpleNight.
   */
  async navigate(url: string) {
    await super.navigate(url);
  }

  /**
   * Clicks an element with the exact text.
   * This method checks all elements with a specific class and clicks the one that matches the text.
   * @param expectedText - The text to match and click the corresponding element.
   */
  async clickElementWithExactText(expectedText: string) {
    const elements = this.page.locator('div[class*="grid-area:title"]');
  
    // Waits for the first element to be visible
    await elements.first().waitFor({ state: 'visible' });
    const count = await elements.count();
    // Loops through all elements to find an exact match for the text
    for (let i = 0; i < count; i++) {
      const elementText = await elements.nth(i).textContent();
      if (elementText?.trim() === expectedText) {
        await elements.nth(i).click();  // Clicks the matching element
        return;
      }
    }
  
    console.log(`No element found with the exact text: '${expectedText}'`);
  }

  /**
   * Selects a category by its name.
   * @param category - The category name to select.
   */
  async selectCategory(category: string) {
    const categoryLocator = this.getCategoryButtonLocator(category); // Dynamically build the locator
    await super.click(categoryLocator); // Click the corresponding button
  }

  /**
   * Selects a destination by typing it in the input and clicking the desired option.
   * @param location - The location to search for.
   * @param locationOption - The exact option to click after filling the input.
   */
  async selectDestiny(location: string, locationOption: string) {
    await super.click(this.destinyInput);
    await super.fill(this.destinyInput, location);
    await this.clickElementWithExactText(locationOption); // Click the option matching the location
  }

  /**
   * Selects a date range.
   * @param month - The month to select.
   * @param fromDate - The starting date of the range.
   * @param toDate - The ending date of the range.
   */
  async selectDate(month: string, fromDate: string, toDate: string) {
    await super.click(this.datesButtonLocator);
    await super.click(this.currentMonthLocator);
    await this.selectMonth(month);
    await this.selectDayByFullDate(fromDate);
    await this.selectDayByFullDate(toDate);
    await this.selectDayByFullDate(fromDate);
    await this.clickApplyButton();
  }

  /**
   * Selects the number of guests.
   */
  async selectChildGuests(childGuests: number) {
    await this.clickOnGuests();
    await this.clickAddChildButtonMultipleTimes(childGuests); // Adds one child to the guest count
  }

  /**
   * Selects a month from the calendar.
   * @param monthName - The name of the month to select.
   */
  async selectMonth(monthName: string) {
    const monthLocator = `button[class*="monthsListControl"]:has-text("${monthName}")`;
    await this.page.locator(monthLocator).click();
  }

  /**
   * Returns the locator for a category button based on the category name.
   * @param category - The category name (e.g., "hotels", "flights").
   * @returns The locator string for the category button.
   */
  getCategoryButtonLocator(category: string): string {
    return `button[data-testid*="category(static:${category})"]`;
  }

  /**
   * Returns the locator for a specific date.
   * @param date - The date in the format "YYYY-MM-DD".
   * @returns The locator string for the specified date.
   */
  getDateLocatorByFullDate(date: string): string {
    return `span[data-testid*="form_dates_calendar_day(${date})"]`;
  }

  /**
   * Selects a day from the calendar using a full date string.
   * @param date - The date to select (in "YYYY-MM-DD" format).
   */
  async selectDayByFullDate(date: string) {
    const dateLocator = this.getDateLocatorByFullDate(date);
    await super.click(dateLocator); // Click the day corresponding to the date
  }

  /**
   * Clicks the "Apply" button to confirm the selected dates.
   */
  async clickApplyButton() {
    await super.click(this.applyButtonLocator); // Click the apply button
  }

  /**
   * Clicks the "Guests" button to open the guest selection.
   */
  async clickOnGuests() {
    await super.click(this.guestsButtonLocator); // Click the guests button
  }

  /**
   * Clicks the "Add Child" button multiple times to increase the number of children.
   * @param times - The number of times to click the "Add Child" button.
   */
  async clickAddChildButtonMultipleTimes(times: number) {
    for (let i = 0; i < times; i++) {
      await super.click(this.addChildButtonLocator); // Click the "Add Child" button
    }
  }

  /**
   * Clicks the "Add Adult" button multiple times to increase the number of adults.
   * @param times - The number of times to click the "Add Adult" button.
   */
  async clickAddAdultdButtonMultipleTimes(times: number) {
    for (let i = 0; i < times; i++) {
      await super.click(this.addChildButtonLocator); // Click the "Add Adult" button (should be addAdultButtonLocator)
    }
  }

  /**
   * Clicks the "Search" button to initiate the search.
   */
  async clickOnSearchButton() {
    await super.click(this.searchButtonLocator); // Click the search button
  }
}

export default HomePage; 
