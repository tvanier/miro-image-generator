import { css, LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { generateImage } from '../openai.js';
import './mirotone/mirotone-button.js'
import './mirotone/mirotone-input.js'

@customElement('image-generator')
export class ImageGenerator extends LitElement {
  static styles = css`
    img {
      margin: 20px 0;
      width: 100%;
    }
  `

  @property()
  imageDescription = ''

  @state()
  generating = false

  @state()
  imageUrl = ''

  @state()
  addingToBoard = false

  @state()
  error = ''

  async createImage() {
    try {
      this.error = '';
      this.imageUrl = '';
      this.generating = true;

      const response = await generateImage({
        prompt: this.imageDescription
      });

      if (response.status === 200) {
        this.imageUrl = response.data.data[0].url ?? '';
      } else {
        this.error = `${response.status} ${response.statusText}`;
      }
    } catch (error) {
      this.error = String(error)
    } finally {
      this.generating = false;
    }
  }

  async addImageToBoard() {
    try {
      this.error = '';
      this.addingToBoard = true;

      const viewport = await miro.board.viewport.get();

      await miro.board.createImage({
        title: this.imageDescription,
        url: this.imageUrl,
        x: viewport.x + (viewport.width / 2),
        y: viewport.y + (viewport.height / 2),
        width: 256,
      });
    } catch (error) {
      this.error = String(error);
    } finally {
      this.addingToBoard = false;
    }
  }

  renderImage() {
    return html`
      <img src=${this.imageUrl} />

      <mirotone-button size="small"
        iconRight="arrow-shape"
        ?loading=${this.addingToBoard}
        ?disabled=${this.addingToBoard}
        @click=${this.addImageToBoard}
      >
        Add image to board
      </mirotone-button>
    `
  }

  render() {
    return html`
      <mirotone-input
        size="small"
        label="Enter an image description"
        autofocus
        .value=${this.imageDescription}
        @input=${(evt: Event) => this.imageDescription = (evt as any).originalTarget?.value ?? ''}
        ?readonly=${this.generating}
      >
      </mirotone-input>

      <mirotone-button size="small" iconRight="eye"
        ?disabled=${!this.imageDescription || this.generating}
        ?loading=${this.generating}
        @click=${this.createImage}
      >
        Generate image
      </mirotone-button>

      ${this.error ? html`<p>${this.error}</p>` : ''}

      ${this.imageUrl ? this.renderImage() : ''}
    `
  }
}
