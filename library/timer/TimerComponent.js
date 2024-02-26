import { LitElement, html, css } from "lit";    
import { TimerPartComponent } from "./TimerPartComponent";  

export class TimerComponent extends LitElement {
    static properties = {
        _hours: { type: Number },
        _minutes: { type: Number },
        _seconds: { type: Number },
        _days: { type: Number },
        limit: { type: Number, attribute: "true"}, 
        format: { type: String, attribute: "true"}, // default: "hh:mm:ss"
        start: { type: Number}, // default: 0
        join: { type: String}, // default: ":"
        
    };

    constructor() {
        super();
        this.format = "hh:mm:ss";
        this.start = 0;
        this.join = ":";
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }

    static styles = css`
        :host {
            displas: flex;
            justify-content: var(--timer-component-justify-content-center);
        }
        .timer-component_join {
            padding: var(--timer-component-join-padding);
        }
    `;

    render() {
        return html`
            <time-part-component value=${this.hours} format="hours"></time-part-component>
            <time-part-component value=${this.minutes} format="minutes"></time-part-component>
            <time-part-component value=${this.seconds} format="seconds"></time-part-component>
        `;
    }
}

customElements.define('timer-component', TimerComponent);
