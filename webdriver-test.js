'use strict';

/*
 * This testcase makes a series of calls to the 'ticket' app
 * on the legion-obstacle-course test server. The ticket app
 * is a trivial JSON API where we can request a ticket
 * with a random unique ID, and later "redeem" the same ticket
 * by submitting that ID.
 */


const obstacle = require('legion-obstacle-course');
const L = require('legion');
const rest = require('legion-io-fetch').rest;
var metrics = require('legion-metrics');

var instrument = require('legion-instrument');

//driver.get('http://www.google.com/ncr');
//driver.findElement(By.name('q')).sendKeys('webdriver');
//driver.findElement(By.name('btnG')).click();
//driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//driver.quit();


/*
 * Validate that a response was successful. Without this call,
 * the testcase will report only very low level failures (such as
 * being unable to connect to the HTTP port). By checking
 * response.ok, we can be sure that we got a 2xx status code.
 * Then we also check the status code carried in the JSON
 * payload.
 */
function assertSuccess(response) {
  //if( !response.ok )
  //  throw new Error('Response was not Ok.');

  //if( response.json.status !== 'success' )
  //  throw new Error( response.json.status + ': ' + response.json.reason );

  return response;
}

// Configuration for the test server.
const port = 8500;
const host = 'http://localhost:' + port;
let server = null;

const doStuffWithX = L.of().chain(() => {
  const x = createX();

  return L.of()
        .chain(doThingWithX(x))
        .chain(doOtherThingWithX(x));

  return L.of(5);
});

function doStuff () {

  var webdriver = require('selenium-webdriver'),
        By = webdriver.By,
        until = webdriver.until;

  var driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

  L.of()
        .chain(instrument(() => driver.get('http://www.webperformance.com'),
              [metrics.tags.protocol('webdriver'), metrics.tags.generic('page','foo')]))
        .chain(instrument(() => driver.get('http://www.webperformance.com/support'),
              [metrics.tags.protocol('webdriver'), metrics.tags.generic('page','foo')]))
        .chain(assertSuccess);
}

//TODO Look up Promise FS wrapper  "Promisify"

// Actually setup and run the test
L.create()

      .before(() => undefined)
      .after(() => undefined)
      .testcase(() => doStuff())
      .main();

