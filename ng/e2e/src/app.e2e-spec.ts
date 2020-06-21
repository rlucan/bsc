import { AppPage } from './app.po';
import {browser, logging, element, by, protractor} from 'protractor';

describe('[My notes APP] e2e tests:', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should setup a title according to localStorage language', async () => {
    page.navigateTo();
    const key = 'bsc:ng:language';
    const lang = await browser.executeScript('return window.localStorage.getItem(\'' + key + '\');') || 'cs';
    expect(browser.driver.getTitle()).toEqual(lang === 'cs' ? 'Moje poznámky' :
      (lang === 'en' ? 'My notes' : 'Мои заметки'));
  });

  it('should read note items and place them to .container', () => {
    expect(element(by.className('container')).isPresent()).toBe(true);
  });

  it('should wait for (+) button, click it, open New note modal, add note and save', async () => {
    const cnt = await element(by.className('container')).all(by.tagName('mat-card')).count();
    element(by.className('mat-fab')).click();
    element(by.className('mat-dialog-content'))
      .element(by.css('input[ng-reflect-name=title]')).sendKeys('Buy cheese and bread for breakfast.');

    const submitButton = element(by.className('mat-dialog-container'))
      .element(by.tagName('button'));

    submitButton.click();

    const EC = protractor.ExpectedConditions;

    browser.wait(EC.not(EC.presenceOf(submitButton)));

    expect(element(by.className('container')).all(by.tagName('mat-card')).count()).toEqual(cnt + 1);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
