import { LitElement, html, css } from 'lit';

export class TimerPlayerComponent extends LitElement {
    static properties = {
        playBtn :{ type : Boolean, attribute : 'play-btn' },
        pauseBtn :{ type : Boolean, attribute : 'pause-btn' },
        resetBtn :{ type : Boolean, attribute : 'reset-btn' },
        endMsg :{ type : String, attribute : 'end-msg' },
        enableEvents: { type: Boolean, attribute: 'enable-events' },
        _status: { type: String, state: true },
    }
    constructor() {
        super();
        this.playBtn = false;
        this.pauseBtn = false;
        this.resetBtn = false;
        this.endMsg = "Time is over";
        this.enableEvents = false;
        this._status = "";
        this.addEventListener('finishTimer', this._handleFinishTimer); // Evento de finalización
    }
    static styles = css`
    :host {
        display: flex;
        justify-content: var(--timer-player-component-justify-content, center);
        flex-direction: var(--timer-player-component-flex-direction, column);
    }
    .timer-player-component_status {
        padding: var(--timer-player-component-status-padding);
        color: var(--timer-player-component-status-color);
        font-size: var(--timer-player-component-status-font-size);
        text-align: var(--timer-player-component-status-text-align);
        margin: var(--timer-player-component-status-margin);
    }
    .timer-player-component_actions {
        display: flex;
        justify-content: var(--timer-player-component-actions-justify-content, center);
        flex-wrap: var(--timer-player-component-actions-flex-wrap, wrap);
        flex-direction: var(--timer-player-component-actions-flex-direction, row);
        margin: var(--timer-player-component-actions-margin);
    }

    botton {
        cursor: pointer;
        padding: var(--timer-player-component-button-padding);
        margin: var(--timer-player-component-button-margin);
        border: var(--timer-player-component-button-border-radius);
    }

    button.timer-player-component_actions--play {
        background-color: var(--timer-player-component-play-background-color);
        color: var(--timer-player-component-play-color);
        border: var(--timer-player-component-play-border);
    }

    button.timer-player-component_actions--pause {
        background-color: var(--timer-player-component-pause-background-color);
        color: var(--timer-player-component-pause-color);
        border: var(--timer-player-component-pause-border);
    }

    button.timer-player-component_actions--reset {
        background-color: var(--timer-player-component-reset-background-color);
        color: var(--timer-player-component-reset-color);
        border: var(--timer-player-component-reset-border);
    }
    `;
    connectedCallback() {
        super.connectedCallback();
        this.timer = this.querySelector('timer-component');
        this.sound = this.querySelector('sound-component'); 
    }

    _handleFinishTimer(e) { // Manejador de evento de finalización de tiempo
        if (!this.enableEvents) e.stopPropagation();
        this._status = this.endMsg;
        if (this.sound) this.sound.play();
    }

    _handleResetTimer(e) {
        if (!this.enableEvents) e.stopPropagation();
        this._status = "";
    }

    _handleResetTimer(e) {
        if (!this.enableEvents) e.stopPropagation();
        this._status = "";    
    }

    render() {
        return html`
            <div class="timer-player-component_status">${this._status}</div>
            <slot></slot>
            <div class="timer-player-component_actions">
            ${this.pauseBtn ? html`<button "timer-player-component_actions--pause" @click="${this.pause}">Pause</button>` : ""}
            ${this.playBtn ? html`<button "timer-player-component_actions--play" @click="${this.play}">Play</button>` : ""}
            ${this.resetBtn ? html`<button "timer-player-component_actions--reset" @click="${this.reset}">Reset</button>` : ""}
            </div>
        `;
    }
    play() {
        this.timer.startTimer();
        this._status = ""; 
    }
    pause() {
        this.timer.pauseTimer();
    }
    reset() {
        this.timer.resetTimer();
        this._status = "";
    }
}
window.customElements.define('timer-player-component', TimerPlayerComponent);