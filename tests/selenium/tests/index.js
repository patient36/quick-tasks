import { Builder, By, Key, until } from 'selenium-webdriver';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const taskOperations = async () => {
  // const driver = await new Builder().forBrowser('chrome').build();
  // const driver = await new Builder().forBrowser('firefox').build();

  try {
    await driver.get('http://localhost:3000/');
    await driver.manage().window().maximize();

    // Login
    await driver.wait(until.elementLocated(By.id('«r3»-form-item')), 5000).sendKeys('john@doe.co');
    await driver.wait(until.elementLocated(By.id('«r4»-form-item')), 5000).sendKeys('mypasswordis1234');
    await driver.wait(until.elementLocated(By.css('[data-slot="button"]')), 5000).click();

    await driver.wait(until.urlContains('/dashboard'), 5000);

    // Check dashboard titles
    const cardTitles = await driver.findElements(By.css('[data-slot="card-title"]'));
    const expectedTitles = ['Total Tasks', 'Pending', 'Completed', 'Overdue', 'Cancelled'];
    for (let i = 0; i < expectedTitles.length; i++) {
      const text = await cardTitles[i].getText();
      if (text !== expectedTitles[i]) throw new Error(`Expected ${expectedTitles[i]}, got ${text}`);
    }

    // Switch tabs
    const tabs = await driver.findElements(By.css('[type="button"][role="tab"]'));
    const tabNames = ['All Tasks', 'Pending', 'Completed', 'Overdue', 'Cancelled'];
    for (let i = 0; i < tabs.length; i++) {
      const text = await tabs[i].getText();
      if (text !== tabNames[i]) throw new Error(`Expected ${tabNames[i]}, got ${text}`);
      await tabs[i].click();
    }

    // Create task
    const createBtn = await driver.findElement(By.css('[data-slot="button"]'));
    await createBtn.click();

    await driver.findElement(By.name('title')).sendKeys('Test task');
    await driver.findElement(By.css('textarea')).sendKeys('Test task description');

    const priority = await driver.findElements(By.css('[type="button"][role="combobox"]'));
    await priority[priority.length - 1].click();
    await driver.findElement(By.xpath('//div[@role="option" and text()="HIGH"]')).click();

    await driver.findElement(By.css('[data-slot="popover-trigger"]')).click();
    await driver.findElement(By.name('next-month')).click();
    const days = await driver.findElements(By.name('day'));
    await days[days.length - 1].click();

    await driver.findElement(By.css('[data-slot="button"][type="submit"]')).click();

    // Wait for tab switch to see the new task
    await tabs[1].click();
    await delay(1000);

    // Open the task
    const cards = await driver.findElements(By.css('[data-slot="card-content"]'));
    const lastCard = cards[cards.length - 1];
    if (!(await lastCard.getText()).includes('Test task')) throw new Error('Task not found');
    await lastCard.click();

    // Edit task
    await driver.findElement(By.xpath('//button[text()="Edit Task"]')).click();
    const titleField = await driver.findElement(By.name('title'));
    await titleField.clear();
    await titleField.sendKeys('Test task updated');

    const descField = await driver.findElement(By.css('textarea'));
    await descField.clear();
    await descField.sendKeys('Test task description updated');

    const combo = await driver.findElements(By.css('[type="button"][role="combobox"]'));
    await combo[combo.length - 1].click();
    await driver.findElement(By.xpath('//div[@role="option" and text()="LOW"]')).click();

    await driver.findElement(By.css('[data-slot="popover-trigger"]')).click();
    await driver.findElement(By.name('next-month')).click();
    await (await driver.findElements(By.name('day')))[3].click();

    await driver.findElement(By.css('[data-slot="button"][type="submit"]')).click();

    // Delete the task
    await tabs[1].click();
    await delay(1000);
    const taskCard = (await driver.findElements(By.css('[data-slot="card-content"]'))).slice(-1)[0];
    await taskCard.click();
    await driver.findElement(By.css('[data-slot="dropdown-menu-trigger"]')).click();
    await driver.findElement(By.css('[data-slot="dropdown-menu-item"]:last-child')).click();

    // Search for task
    await driver.findElement(By.css('[data-slot="input"]')).sendKeys('Test task updated');
    await driver.wait(until.elementLocated(By.css('div.search-results')), 5000);
    const resultItem = await driver.findElement(By.css('ul li'));
    await resultItem.click();

    await driver.findElements(By.css('[data-slot="button"]')).then(async (buttons) => {
      const closeBtn = buttons.find(async b => (await b.getText()) === 'Close');
      if (closeBtn) await closeBtn.click();
    });

    // Logout
    await driver.findElement(By.css('[data-slot="avatar"]')).click();
    const logoutBtn = await driver.findElement(By.xpath('//div[@role="menuitem" and contains(text(), "Log out")]'));
    await logoutBtn.click();

  } catch (err) {
    console.error('Error:', err);
  } finally {
    // await driver.quit();
  }
};

taskOperations();
