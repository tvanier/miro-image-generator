import { ImageGenerator } from './components/image-generator';

const imageGenerator = document.querySelector<ImageGenerator>('#image-generator')
const domParser = new DOMParser();

miro.board.ui.on('selection:update', async (event) => {
  if (event.items.length !== 1) {
    // TODO mutiple selection?
    return;
  }

  const item = event.items[0]
  let text = ''
  if ('content' in item) {
    const doc = domParser.parseFromString(item.content, 'text/html');
    text = doc.body.firstChild?.textContent ?? '';
  } else if ('title' in item) {
    text = item.title;
  }

  if (imageGenerator && text) {
    imageGenerator.imageDescription = text;
  }
});
