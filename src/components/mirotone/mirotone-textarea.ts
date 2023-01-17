import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { MirotoneFormGroup } from './mirotone-form-group.js';

@customElement('mirotone-textarea')
export class MirotoneTextarea extends MirotoneFormGroup {
  @property({ type: Number }) rows = 1;

  @property({ type: Boolean }) readonly = false;

  renderField() {
    const textareaClass = {
      'textarea': true,
      [`textarea-${this.size}`]: this.size
    }

    return html`
      <textarea
        id=${this.fieldId}
        class=${classMap(textareaClass)}
        rows=${this.rows}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
      >
      </textarea>
    `
  }
}
