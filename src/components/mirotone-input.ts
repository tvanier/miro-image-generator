import { css, LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { mirotoneStyles } from './styles.js'; // button classes only?

export type InputType = 'text' | 'password' | 'email' | 'tel';
export type InputFeedback = '' | 'success' | 'error';
export type InputSize = 'normal' | 'small';

@customElement('mirotone-input')
export class MirotoneInput extends LitElement {
  static styles = [
    mirotoneStyles,
    css`
      input {
        box-sizing: border-box;
      }
    `
  ];

  @property({ type: Boolean })
  autofocus = false

  @property({ type: String })
  label = '';

  @property({ type: String })
  type: InputType = 'text'

  @property({ type: String })
  size: InputSize = 'normal'

  @property({ type: String })
  placeholder = ''

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  feedback: InputFeedback = ''

  @property({ type: String })
  statusText = '';

  @property({ type: String })
  helperText = '';

  @property({ type: Function })
  onInput: ((value: string) => void) | null = null

  @property({ type: String })
  value = ''

  render() {
    const formGroupClass = {
      'form-group': true,
      'form-group-small': this.size === 'small',
      'form-group__disabled': this.disabled,
      success: this.feedback === 'success',
      error: this.feedback === 'error'
    }

    const inputClass = {
      'input': true,
      'input-small': this.size === 'small'
    }

    return html`
      <div class=${classMap(formGroupClass)}>
        <label>${this.label}
          <input class="${classMap(inputClass)}"
            type="${this.type}"
            ?autofocus=${this.autofocus}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled} ?readonly=${this.readonly}
          />
        </label>
        ${this.helperText ? html`<span class="status-text">${this.helperText}</span>` : ''}
        ${this.statusText ? html`<div class="status-text">${this.statusText}</div>` : ''}
      </div>
    `
  }
}
