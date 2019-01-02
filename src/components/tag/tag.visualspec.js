import { percySnapshot } from '@percy/puppeteer';
import { getDocument, queries } from 'pptr-testing-library';

const { getByText, getByLabelText, queryByTestId } = queries;

describe('Tag', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/tag`);
  });

  it('Can remove a tag', async () => {
    const doc = await getDocument(page);
    const removeableTag = await getByLabelText(doc, 'Remove');
    await removeableTag.click();
    const removedTag = await queryByTestId(doc, 'tag-removable');
    expect(removedTag).not.toBeTruthy();
  });

  it('Default', async () => {
    const doc = await getDocument(page);
    const tag = await getByText(doc, 'Tag');
    expect(tag).toBeTruthy();
    await percySnapshot(page, 'Tag');
  });
});
