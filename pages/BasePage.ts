import { Page } from "@playwright/test";

/**
 * Base Page class provides utility methods for interacting with web elements.
 * This serves as a base page class for common operations across different pages.
 */
class BasePage {
  protected page: Page;

  /**
   * Constructor to initialize the page object.
   * @param page - The Playwright page object to interact with the web page.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the specified URL.
   * @param url - The URL to navigate to.
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Click an element identified by the selector.
   * @param selector - The CSS selector of the element to click.
   */
  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  /**
   * Fill a text input field identified by the selector with the specified text.
   * @param selector - The CSS selector of the input field.
   * @param text - The text to fill in the input field.
   */
  async fill(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  /**
   * Press a key on the keyboard.
   * @param key - The key to press (e.g., 'Enter', 'Escape').
   */
  async press(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Wait for the specified amount of time (in milliseconds).
   * @param timeout - The timeout value in milliseconds.
   */
  async waitForTimeout(timeout: number): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }

  /**
   * Get the text content of an element identified by the selector.
   * @param selector - The CSS selector of the element to extract text from.
   * @returns The text content of the element, or null if not found.
   */
  async getText(selector: string): Promise<string | null> {
    return await this.page.textContent(selector);
  }

  /**
   * Get the title of the current page.
   * @returns The title of the page.
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get the value of an attribute for an element identified by the selector.
   * @param selector - The CSS selector of the element.
   * @param attribute - The name of the attribute to retrieve.
   * @returns The value of the attribute, or null if not found.
   */
  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.locator(selector).getAttribute(attribute);
  }

  /**
   * Wait for a function to return a truthy value.
   * @param fn - The function to execute.
   * @param options - Optional configuration for the wait.
   */
  async waitForFunction<T>(fn: () => T, options?: Parameters<Page['waitForFunction']>[1]): Promise<void> {
    await this.page.waitForFunction(fn, options);
  }

  /**
   * Hover over an element identified by the selector.
   * @param selector - The CSS selector of the element to hover over.
   */
  async hover(selector: string): Promise<void> {
    await this.page.hover(selector);
  }

  /**
   * Select an option from a dropdown menu using the selector and option value.
   * @param selector - The CSS selector of the dropdown.
   * @param value - The value to select from the dropdown.
   */
  async select(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  /**
   * Select an option from a dropdown menu by the option's visible text.
   * @param selector - The CSS selector of the dropdown.
   * @param optionText - The visible text of the option to select.
   */
  async selectByText(selector: string, optionText: string): Promise<void> {
    await this.page.selectOption(selector, { label: optionText });
  }

  /**
   * Get the current URL of the page.
   * @returns The current URL of the page.
   */
  async getUrl(): Promise<string> {
    return await this.page.url();
  }

  /**
   * Reload the current page.
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Navigate back in the browser history.
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Navigate forward in the browser history.
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
  }
}

export default BasePage;
