import { LitElement, html, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { mirotoneStyles } from '../styles.js';

export type FormGroupSize = '' | 'small';

@customElement('mirotone-form-group')
export class MirotoneFormGroup extends LitElement {
  @property({ type: Boolean }) disabled = false;

  @property() size: FormGroupSize = '';

  @property() label = '';

  @property() fieldId = '';

  static styles = [
    mirotoneStyles
  ];

  private static idCounter = 0

  constructor() {
    super();
    if (!this.fieldId) {
      this.fieldId = `mirotone-form-group-field-${MirotoneFormGroup.idCounter++}`;
    }
  }

  renderField() {
    return html`<slot></slot>`
  }

  render() {
    const formGroupClass = {
      'form-group': true,
      [`form-group-${this.size}`]: this.size,
      'form-group__disabled': this.disabled,
    }

    return html`
      <div class=${classMap(formGroupClass)}>
        ${this.label ? html`<label for=${this.fieldId}>${this.label}</label>` : nothing}
        ${this.renderField()}
      </div>
    `;
  }
}
