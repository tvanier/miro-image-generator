import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { mirotoneStyles } from '../styles.js'; // input classes only?

@customElement('mirotone-input-group')
export class MirotoneInputGroup extends LitElement {
  static styles = [
    mirotoneStyles,
  ];

  constructor() {
    super();
    this.classList.add('input-group');
  }

  onSlotChange(evt: any) {
    const children = evt.target.assignedElements() as Element[]
    children?.forEach((child) => {
      child.classList.add(child.tagName.toLowerCase())

      switch (child.getAttribute('fourth')) {
        case '1': child.classList.add('one-fourth'); break;
        case '2': child.classList.add('two-fourth'); break;
        case '3': child.classList.add('three-fourth'); break;
      }
    })
  }

  onDecorationChange(evt: any, side: 'left' | 'right') {
    const child = evt.target.assignedElements()?.[0];
    if (child) {
      child.classList.add('input-decoration');

      if (child.hasAttribute('border')) {
        child.classList.add(`border-${side === 'left' ? 'right' : 'left'}`);
      }
    }
  }

  render() {
    return html`
      <slot name="decorationLeft"
        @slotchange=${(evt: any) => this.onDecorationChange(evt, 'left')}>
      </slot>

      <slot @slotchange=${this.onSlotChange}></slot>

      <slot name="decorationRight"
        @slotchange=${(evt: any) => this.onDecorationChange(evt, 'right')}>
      </slot>
    `
  }
}
