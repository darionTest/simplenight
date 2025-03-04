import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import searchData from '../testData/search.json';  
import HomePage from '../pages/HomePage';
import ResultsPage from '../pages/ResultsPage';

// Load environment variables
dotenv.config();

// Determine the current environment
const ENV = process.env.ENV || 'DEV'; // Default to DEV if not set

// Select the base URL according to the environment
const BASE_URL = ENV === 'STG' ? process.env.STAGING_BASE_URL : process.env.DEV_BASE_URL;

if (!BASE_URL) {
  throw new Error(`No URL found for the environment ${ENV}`);
}

console.log(`Running test in: ${BASE_URL}`);

test.describe(`Hotel Search Tests - ${ENV}`, () => {
  let homePage: HomePage;
  let resultsPage: ResultsPage;

  // Before each test, navigate to the homepage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    resultsPage = new ResultsPage(page);
    await homePage.navigate(BASE_URL);
  });

  test('Hotel search test', async () => {
    // Extract test data from the JSON file
    const { category, destiny, dates, guests, filters } = searchData;

    // Perform the hotel search using JSON data
    await homePage.selectCategory(category);
    await homePage.selectDestiny(destiny.city, destiny.label);
    await homePage.selectDate(dates.month, dates.start, dates.end);
    await homePage.selectChildGuests(guests.children);
    await homePage.clickOnSearchButton();

    // Apply filters using values from the JSON file
    await resultsPage.selectCheckboxByValue(filters.checkbox);
    await resultsPage.selectOptionByValue(filters.option);
    await resultsPage.clickOnTheMapAndZoomIn();

    // Retrieve and validate rating and price
    const rating = await resultsPage.getRating();
    const price = await resultsPage.getPrice();

    // Ensure price is within the specified filter range
    expect(Number(price)).toBeGreaterThanOrEqual(filters.priceMin);
    expect(Number(price)).toBeLessThanOrEqual(filters.priceMax);
    console.log(`Price is within the range: ${price} >= ${filters.priceMin} and ${price} <= ${filters.priceMax}`);

    // Ensure rating is at least the minimum required value
    expect(Number(rating)).toBeGreaterThanOrEqual(filters.ratingMin);
    console.log(`Rating is valid: ${rating} >= ${filters.ratingMin}`);
  });
});
