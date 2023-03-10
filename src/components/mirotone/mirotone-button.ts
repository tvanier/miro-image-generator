import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { mirotoneStyles } from '../styles.js'; // button classes only?

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger'
export type ButtonSize = '' | 'small'

@customElement('mirotone-button')
export class MirotoneButton extends LitElement {
  static styles = mirotoneStyles;

  @property({ type: String })
  variant: ButtonVariant = 'primary';

  @property({ type: String })
  size: ButtonSize = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean})
  loading = false;

  @property({ type: String })
  iconLeft = ''

  @property({ type: String })
  iconRight = ''

  render() {
    const classes = {
      'button': true,
      [`button-${this.variant}`]: true,
      [`button-${this.size}`]: this.size,
      'button-loading': this.loading
    };

    return html`
      <button class=${classMap(classes)} type="button"
        ?disabled=${this.disabled}
      >
        ${this.iconLeft ? html`<span class=${`icon-${this.iconLeft}`}></span>` : ''}
        <slot></slot>
        ${this.iconRight ? html`<span class=${`icon-${this.iconRight}`}></span>` : ''}
      </button>
    `
  }
}
