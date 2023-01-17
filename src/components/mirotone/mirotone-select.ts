import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { classMap } from 'lit/directives/class-map.js';
import { MirotoneFormGroup } from './mirotone-form-group.js';

@customElement('mirotone-select')
export class MirotoneSelect extends MirotoneFormGroup {
  @query('select', true) select: Element | undefined

  @queryAssignedElements({ selector: 'option' }) options!: Element[]

  onSlotChange() {
    if (this.options.length > 0) {
      this.select?.replaceChildren(...this.options);
    }
  }

  renderField() {
    const selectClass = {
      'select': true,
      [`select-${this.size}`]: this.size
    }

    return html`
      <select
        id=${this.fieldId}
        class=${classMap(selectClass)}
        ?disabled=${this.disabled}
      >
      </select>
      <slot @slotchange=${this.onSlotChange}></slot>
    `
  }
}
