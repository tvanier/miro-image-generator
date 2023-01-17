import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { MirotoneFormGroup } from './mirotone-form-group.js';

export type InputType = 'text' | 'password' | 'email' | 'tel';
export type InputFeedback = '' | 'success' | 'error';

@customElement('mirotone-input')
export class MirotoneInput extends MirotoneFormGroup {
  @property() type: InputType = 'text'

  @property() placeholder = ''

  @property({ type: Boolean }) readonly = false;

  @property() feedback: InputFeedback = ''

  @property() statusText = '';

  @property() helperText = '';

  @property() value = '';

  static styles = [
    ...MirotoneFormGroup.styles,
    css`
    input {
      box-sizing: border-box;
    }
  `];

  renderField() {
    const inputClass = {
      'input': true,
      [`input-${this.size}`]: this.size
    }

    return html`
      <input
        id=${this.fieldId}
        class=${classMap(inputClass)}
        type="${this.type}"
        .value=${this.value}
        placeholder=${this.placeholder}
        ?readonly=${this.readonly}
        ?disabled=${this.disabled}
      />

      ${this.helperText ? html`<span class="status-text">${this.helperText}</span>` : nothing}
      ${this.statusText ? html`<div class="status-text">${this.statusText}</div>` : nothing}
    `
  }
}

