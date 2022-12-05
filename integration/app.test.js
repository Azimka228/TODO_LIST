describe('addItemForm', () => {
 it('base example, visually looks correct', async () => {
  // APIs from jest-puppeteer
  await page.goto('http://localhost:9009/iframe.html?args=&viewMode=story&id=app-with-redux--app-with-redux-basic-exmaple')
  const image = await page.screenshot()

  // API from jest-image-snapshot
  expect(image).toMatchImageSnapshot()
 })
})