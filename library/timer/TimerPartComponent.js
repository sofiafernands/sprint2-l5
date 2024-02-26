import { html, css, LitElement } from 'lit';

export class TimerPartComponent extends LitElement {
    static properties = {
        value: { type: Number },
        format: { type: String },
    };

    constructor () {
        super(); 
    }

    static styles = css`
        :host {
            color: var(--timer-component-part-color);
            border-radius: var(--timer-component-part-border-radius);
            background: var(--timer-component-part-background);
            padding: var(--timer-component-part-padding);
            box-shadow: var(--timer-component-part-box-shadow);
        }
    `;

    render() {
        return html`
            <div>${this._formatValue(this.value)}</div>
        `;
    }

    _formatValue(value) {
        if (this.format === 'hours') {
            return value.toString().padStart(2, '0');
        }
        return value;
    }
}

customElements.define('time-part-component', TimerPartComponent);
