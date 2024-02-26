import { LitElement, html, css } from "lit";
import { TimerPartComponent } from "./TimerPartComponent.js";

export class TimerComponent extends LitElement {
    static properties = {
        _days: { type: Number, state: true },
        _minutes: { type: Number, state: true },
        _hours: { type: Number, state: true },
        _seconds: { type: Number, state: true },
        format: { type: String, attribute: true }, // hh:mm:ss formato de tiempo
        start: { type: Number }, 
        reverse: { type: Boolean, attribute: true },
        limit: { type: Number, attribute: true },
        join: { type: String, attribute: true },
        autostart: { type: Boolean, attribute: true },
        autoreset: { type: Boolean, attribute: true },
    }

    static styles = css`
    :host {
        display: flex;
        justify-content: var(--timer-component-justify-content, center);
    }
    .timer-component_join {
        padding: var(--timer-component-join-padding);
    }   
    `;
    constructor() {
        super();
        
        this.format = "hh:mm:ss";
        this.start = 0;
        this.reverse = false;
        this.join = ":";
        this.finishEvent = new CustomEvent("finishTimer", {
            bubbles: true,
            composed: true,
        });
        this.resetEvent = new CustomEvent("resetTimer", {
            bubbles: true,
            composed: true,
        });
        this.playEvent = new CustomEvent("playTimer", {
            bubbles: true,
            composed: true,
        });
        this.pauseEvent = new CustomEvent("pauseTimer", {
            bubbles: true,
            composed: true,
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this._resetValues();
        if (this.autostart) this.startTimer();
    }
    disconnectedCallback() {
        this.finish();
        super.disconnectedCallback();
    }

    render() {
        return html`
           ${this._timerTemplate()}
        `;
    }

    get inFinish() {
        if (!this.reverse && this._seconds === 0) {
            return true;
        }
        else if (!this.reverse && this.limit && this._seconds === this.limit) {
            return true;
        }
    }

    startTimer() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                if (this.isFinished) {
                    this._finish();
                }
                else {
                    this.reverse ? this._secondsCount-- : this._secondsCount++;
                    this._setTime();
                    if (this.isFinished) this._finish();
                }

            }, 1000)
            this.dispatchEvent(this.playEvent);
        }
    }

    resetTimer() {
        this._resetValues();
        this.dispatchEvent(this.resetEvent);
        this.clearInterval();
        if (this.autostart) this.startTimer();
    }

    pauseTimer() {
        this.clearInterval();
        this.dispatchEvent(this.pauseEvent);
    }

    _joinTemplate() {
        return html`<span class="timer-component_join">${this.join}</span>`;
    }

    _timerTemplate() {
        const formatArray = this.format.split(":");
        const time = formatArray.map((part) => {
            switch (part) {
                case "hh":
                    return html`<time-part-component .value="${this._hours}" format="${part}"></time-part-component>`;
                case "mm":
                    return html`<time-part-component .value="${this._minutes}" format="${part}"></time-part-component>`;
                case "ss":
                    return html`<time-part-component .value="${this._seconds}" format="${part}"></time-part-component>`;
                default:
                    return html`<time-part-component .value="${this._days}" format="${part}"></time-part-component>`;
            }
        });

        const template = html`${time.map((value, index) => html`
            <time-part-component .value="${value}" format="${formatArray[index]}"></time-part-component>
            ${index < formatArray.length - 1 ? this._joinTemplate() : ""}
        `)}`;
return template;
    }

    _setTime() {
        const seconds = this._secondsCount % 60;
        const minutes = Math.floor(this._secondsCount / 60) % 60;
        const hours = Math.floor(this._secondsCount / 3600);
        const days = Math.floor(this._secondsCount / 86400);
    
        // Actualizar las propiedades de tiempo
        if (seconds !== this._seconds) {
            this._seconds = seconds;
            this.requestUpdate('_seconds', this._seconds);
        }
        if (minutes !== this._minutes) {
            this._minutes = minutes;
            this.requestUpdate('_minutes', this._minutes);
        }
        if (hours !== this._hours) {
            this._hours = hours;
            this.requestUpdate('_hours', this._hours);
        }
        if (days !== this._days) {
            this._days = days;
            this.requestUpdate('_days', this._days);
        }
    }
    
    _resetValues() {
        this._seconds = 0;
        this._minutes = 0;
        this._hours = 0;
        this._days = 0;
        this._secondsCount = this.start;
    
        // Actualizar las propiedades de tiempo
        this.requestUpdate('_seconds', this._seconds);
        this.requestUpdate('_minutes', this._minutes);
        this.requestUpdate('_hours', this._hours);
        this.requestUpdate('_days', this._days);
    }
    
    _clearInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }
    _finish() {
        this._clearInterval();
        this.dispatchEvent(this.finishEvent);
        if (this.autoreset) this.resetTimer();
    }
}
    window.customElements.define("timer-component", TimerComponent);
