/*global browser*/

'use strict';
var mouseVisual = require('./mouseVisual');


describe('I', function () {
    var page,
        once = true,
        testText = 'Точка 5',
        repeater = 'point in points.items',
        spec,
        specName;

    beforeEach(function () {

        spec = jasmine.getEnv().currentSpec;
        specName = spec.description.replace('.', '_').split(' ').join('_');
        if (once) {
            browser.get('/index.html');
            page = require('./main.po');
            once = false;
            // Этого должно хватить на загрузку карты.
            browser.driver.sleep(3000);
        }
        browser.waitForAngular();
    });

    // Добавление нового элемента.
    it('want to add new point.', function () {
        var input = $('points input');


        // Ожидаю, что полуе ввода пустое.
        expect(input.getAttribute('value')).toBe('');
        // Ввиду тестовое описание.
        input.sendKeys(testText);
        // Ожидаю, что значение текстового поля стало равно введённому тексту.
        expect(input.getAttribute('value')).toBe(testText);
        // Ввожу ENTER.
        input.sendKeys(protractor.Key.ENTER);
        // Ожидаю, что добавился новый элемент в конец списка с названием введённого текста.
        expect(element(by.repeater(repeater).row(4).column('point.title')).getText()).toBe(testText);
        // Ожидаю, что полуе ввода опять пустое.
        expect(input.getAttribute('value')).toBe('');

    });

    it('want to change sort of points.', function () {

        var lastElement = element(by.repeater(repeater).row(4));

        expect(lastElement.getText()).toBe(testText);
        // Я перетаскиваю последний элемент вверх.
        var moveOffeset = {x: 0, y: -10},
            sqv = browser.driver.actions()
            .mouseMove(lastElement.getWebElement())
            .mouseDown()
            .mouseMove(moveOffeset)
            .mouseMove(moveOffeset)
            .mouseMove(moveOffeset)
            .mouseMove(moveOffeset)
            .mouseMove(moveOffeset)
            .mouseUp()
            .perform();
        // Ожидаю, что последний элемент перестал быть не являеться передвинутым.
        expect(lastElement.getText()).not.toBe(testText);
        // Ожидаю, что внешний вид карты равен скриншоту.
        expect('sort_changed').toCheckshot();
    });

    /**
     * TODO
     */
    it('want to move marker point.', function() {
    });

    it('click on marker and should see balloon with title.', function () {
        browser.actions()
            .mouseMove($('route'))
            .click()
            .perform();
        browser.sleep(500);
        expect('show_balloon').toCheckshot();
        $('[class*="balloon__close-button"]').click();
        expect('hide_balloon').toCheckshot();
    });

    it('want to remove first point.', function() {
        var firstElement = element(by.repeater(repeater).row(0));
        firstElement.element(by.tagName('button')).click();
        expect('remove_first_point').toCheckshot();
    });
});

