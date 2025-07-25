import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    Injector,
    Input,
    NgModule,
    numberAttribute,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { getSelection } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseInput } from 'primeng/baseinput';
import { AngleDownIcon, AngleUpIcon, TimesIcon } from 'primeng/icons';
import { InputText } from 'primeng/inputtext';
import { Nullable } from 'primeng/ts-helpers';
import { InputNumberInputEvent } from './inputnumber.interface';
import { InputNumberStyle } from './style/inputnumberstyle';

export const INPUTNUMBER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumber),
    multi: true
};
/**
 * InputNumber is an input component to provide numerical input.
 * @group Components
 */
@Component({
    selector: 'p-inputNumber, p-inputnumber, p-input-number',
    standalone: true,
    imports: [CommonModule, InputText, AutoFocus, TimesIcon, AngleUpIcon, AngleDownIcon, SharedModule],
    template: `
        <input
            pInputText
            #input
            [attr.id]="inputId"
            role="spinbutton"
            [class]="cn(cx('pcInputText'), inputStyleClass)"
            [value]="formattedValue()"
            [ngStyle]="inputStyle"
            [variant]="$variant()"
            [invalid]="invalid()"
            [attr.aria-valuemin]="min()"
            [attr.aria-valuemax]="max()"
            [attr.aria-valuenow]="value"
            [attr.placeholder]="placeholder"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-describedby]="ariaDescribedBy"
            [attr.title]="title"
            [pSize]="size()"
            [attr.size]="inputSize()"
            [attr.name]="name()"
            [attr.autocomplete]="autocomplete"
            [attr.maxlength]="maxlength()"
            [attr.minlength]="minlength()"
            [attr.tabindex]="tabindex"
            [attr.aria-required]="ariaRequired"
            [attr.min]="min()"
            [attr.max]="max()"
            [attr.step]="step() ?? 1"
            [attr.required]="required() ? '' : undefined"
            [attr.readonly]="readonly ? '' : undefined"
            [attr.disabled]="$disabled() ? '' : undefined"
            inputmode="decimal"
            (input)="onUserInput($event)"
            (keydown)="onInputKeyDown($event)"
            (keypress)="onInputKeyPress($event)"
            (paste)="onPaste($event)"
            (click)="onInputClick()"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            [attr.data-pc-section]="'input'"
            [pAutoFocus]="autofocus"
            [fluid]="hasFluid"
        />
        <ng-container *ngIf="buttonLayout != 'vertical' && showClear && value">
            <svg data-p-icon="times" *ngIf="!clearIconTemplate && !_clearIconTemplate" [class]="cx('clearIcon')" (click)="clear()" [attr.data-pc-section]="'clearIcon'" />
            <span *ngIf="clearIconTemplate || _clearIconTemplate" (click)="clear()" [class]="cx('clearIcon')" [attr.data-pc-section]="'clearIcon'">
                <ng-template *ngTemplateOutlet="clearIconTemplate || _clearIconTemplate"></ng-template>
            </span>
        </ng-container>
        <span [class]="cx('buttonGroup')" *ngIf="showButtons && buttonLayout === 'stacked'" [attr.data-pc-section]="'buttonGroup'">
            <button
                type="button"
                [class]="cn(cx('incrementButton'), incrementButtonClass)"
                [attr.disabled]="$disabled() ? '' : undefined"
                tabindex="-1"
                (mousedown)="onUpButtonMouseDown($event)"
                (mouseup)="onUpButtonMouseUp()"
                (mouseleave)="onUpButtonMouseLeave()"
                (keydown)="onUpButtonKeyDown($event)"
                (keyup)="onUpButtonKeyUp()"
                [attr.aria-hidden]="true"
                [attr.data-pc-section]="'incrementbutton'"
            >
                <span *ngIf="incrementButtonIcon" [ngClass]="incrementButtonIcon" [attr.data-pc-section]="'incrementbuttonicon'"></span>
                <ng-container *ngIf="!incrementButtonIcon">
                    <svg data-p-icon="angle-up" *ngIf="!incrementButtonIconTemplate && !_incrementButtonIconTemplate" [attr.data-pc-section]="'incrementbuttonicon'" />
                    <ng-template *ngTemplateOutlet="incrementButtonIconTemplate || _incrementButtonIconTemplate"></ng-template>
                </ng-container>
            </button>

            <button
                type="button"
                [class]="cn(cx('decrementButton'), decrementButtonClass)"
                [attr.disabled]="$disabled() ? '' : undefined"
                tabindex="-1"
                [attr.aria-hidden]="true"
                (mousedown)="onDownButtonMouseDown($event)"
                (mouseup)="onDownButtonMouseUp()"
                (mouseleave)="onDownButtonMouseLeave()"
                (keydown)="onDownButtonKeyDown($event)"
                (keyup)="onDownButtonKeyUp()"
                [attr.data-pc-section]="'decrementbutton'"
            >
                <span *ngIf="decrementButtonIcon" [ngClass]="decrementButtonIcon" [attr.data-pc-section]="'decrementbuttonicon'"></span>
                <ng-container *ngIf="!decrementButtonIcon">
                    <svg data-p-icon="angle-down" *ngIf="!decrementButtonIconTemplate && !_decrementButtonIconTemplate" [attr.data-pc-section]="'decrementbuttonicon'" />
                    <ng-template *ngTemplateOutlet="decrementButtonIconTemplate || _decrementButtonIconTemplate"></ng-template>
                </ng-container>
            </button>
        </span>
        <button
            *ngIf="showButtons && buttonLayout !== 'stacked'"
            type="button"
            [class]="cx('incrementButton')"
            [attr.disabled]="$disabled() ? '' : undefined"
            tabindex="-1"
            [attr.aria-hidden]="true"
            (mousedown)="onUpButtonMouseDown($event)"
            (mouseup)="onUpButtonMouseUp()"
            (mouseleave)="onUpButtonMouseLeave()"
            (keydown)="onUpButtonKeyDown($event)"
            (keyup)="onUpButtonKeyUp()"
            [attr.data-pc-section]="'incrementbutton'"
        >
            <span *ngIf="incrementButtonIcon" [ngClass]="incrementButtonIcon" [attr.data-pc-section]="'incrementbuttonicon'"></span>
            <ng-container *ngIf="!incrementButtonIcon">
                <svg data-p-icon="angle-up" *ngIf="!incrementButtonIconTemplate && !_incrementButtonIconTemplate" [attr.data-pc-section]="'incrementbuttonicon'" />
                <ng-template *ngTemplateOutlet="incrementButtonIconTemplate || _incrementButtonIconTemplate"></ng-template>
            </ng-container>
        </button>
        <button
            *ngIf="showButtons && buttonLayout !== 'stacked'"
            type="button"
            [class]="cx('decrementButton')"
            [attr.disabled]="$disabled() ? '' : undefined"
            tabindex="-1"
            [attr.aria-hidden]="true"
            (mousedown)="onDownButtonMouseDown($event)"
            (mouseup)="onDownButtonMouseUp()"
            (mouseleave)="onDownButtonMouseLeave()"
            (keydown)="onDownButtonKeyDown($event)"
            (keyup)="onDownButtonKeyUp()"
            [attr.data-pc-section]="'decrementbutton'"
        >
            <span *ngIf="decrementButtonIcon" [ngClass]="decrementButtonIcon" [attr.data-pc-section]="'decrementbuttonicon'"></span>
            <ng-container *ngIf="!decrementButtonIcon">
                <svg data-p-icon="angle-down" *ngIf="!decrementButtonIconTemplate && !_decrementButtonIconTemplate" [attr.data-pc-section]="'decrementbuttonicon'" />
                <ng-template *ngTemplateOutlet="decrementButtonIconTemplate || _decrementButtonIconTemplate"></ng-template>
            </ng-container>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [INPUTNUMBER_VALUE_ACCESSOR, InputNumberStyle],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.data-pc-name]': "'inputnumber'",
        '[attr.data-pc-section]': "'root'",
        '[class]': "cn(cx('root'), styleClass)"
    }
})
export class InputNumber extends BaseInput implements OnInit, AfterContentInit, OnChanges {
    /**
     * Displays spinner buttons.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showButtons: boolean = false;
    /**
     * Whether to format the value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) format: boolean = true;
    /**
     * Layout of the buttons, valid values are "stacked" (default), "horizontal" and "vertical".
     * @group Props
     */
    @Input() buttonLayout: string = 'stacked';
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Advisory information to display on input.
     * @group Props
     */
    @Input() placeholder: string | undefined;
    /**
     * Specifies tab order of the element.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined;
    /**
     * Title text of the input text.
     * @group Props
     */
    @Input() title: string | undefined;
    /**
     * Specifies one or more IDs in the DOM that labels the input field.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Specifies one or more IDs in the DOM that describes the input field.
     * @group Props
     */
    @Input() ariaDescribedBy: string | undefined;
    /**
     * Used to define a string that labels the input element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Used to indicate that user input is required on an element before a form can be submitted.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) ariaRequired: boolean | undefined;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    @Input() autocomplete: string | undefined;
    /**
     * Style class of the increment button.
     * @group Props
     */
    @Input() incrementButtonClass: string | undefined;
    /**
     * Style class of the decrement button.
     * @group Props
     */
    @Input() decrementButtonClass: string | undefined;
    /**
     * Style class of the increment button.
     * @group Props
     */
    @Input() incrementButtonIcon: string | undefined;
    /**
     * Style class of the decrement button.
     * @group Props
     */
    @Input() decrementButtonIcon: string | undefined;
    /**
     * When present, it specifies that an input field is read-only.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) readonly: boolean | undefined;
    /**
     * Determines whether the input field is empty.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) allowEmpty: boolean = true;
    /**
     * Locale to be used in formatting.
     * @group Props
     */
    @Input() locale: string | undefined;
    /**
     * The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". See Locale Negotiation for details.
     * @group Props
     */
    @Input() localeMatcher: any;
    /**
     * Defines the behavior of the component, valid values are "decimal" and "currency".
     * @group Props
     */
    @Input() mode: string | any = 'decimal';
    /**
     * The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided.
     * @group Props
     */
    @Input() currency: string | undefined;
    /**
     * How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, ü"code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol".
     * @group Props
     */
    @Input() currencyDisplay: string | undefined | any;
    /**
     * Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) useGrouping: boolean = true;
    /**
     * The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
     * @group Props
     */
    @Input({ transform: (value: unknown) => numberAttribute(value, null) }) minFractionDigits: number | undefined;
    /**
     * The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
     * @group Props
     */
    @Input({ transform: (value: unknown) => numberAttribute(value, null) }) maxFractionDigits: number | undefined;
    /**
     * Text to display before the value.
     * @group Props
     */
    @Input() prefix: string | undefined;
    /**
     * Text to display after the value.
     * @group Props
     */
    @Input() suffix: string | undefined;
    /**
     * Inline style of the input field.
     * @group Props
     */
    @Input() inputStyle: any;
    /**
     * Style class of the input field.
     * @group Props
     */
    @Input() inputStyleClass: string | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showClear: boolean = false;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Callback to invoke on input.
     * @param {InputNumberInputEvent} event - Custom input event.
     * @group Emits
     */
    @Output() onInput: EventEmitter<InputNumberInputEvent> = new EventEmitter<InputNumberInputEvent>();
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke on input key press.
     * @param {KeyboardEvent} event - Keyboard event.
     * @group Emits
     */
    @Output() onKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
    /**
     * Callback to invoke when clear token is clicked.
     * @group Emits
     */
    @Output() onClear: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Template of the clear icon.
     * @group Templates
     */
    @ContentChild('clearicon', { descendants: false }) clearIconTemplate: Nullable<TemplateRef<any>>;
    /**
     * Template of the increment button icon.
     * @group Templates
     */
    @ContentChild('incrementbuttonicon', { descendants: false }) incrementButtonIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Template of the decrement button icon.
     * @group Templates
     */
    @ContentChild('decrementbuttonicon', { descendants: false }) decrementButtonIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    @ViewChild('input') input!: ElementRef<HTMLInputElement>;

    _clearIconTemplate: TemplateRef<any> | undefined;

    _incrementButtonIconTemplate: TemplateRef<any> | undefined;

    _decrementButtonIconTemplate: TemplateRef<any> | undefined;

    value: Nullable<number>;

    focused: Nullable<boolean>;

    initialized: Nullable<boolean>;

    groupChar: string = '';

    prefixChar: string = '';

    suffixChar: string = '';

    isSpecialChar: Nullable<boolean>;

    timer: any;

    lastValue: Nullable<string>;

    _numeral: any;

    numberFormat: any;

    _decimal: any;

    _decimalChar: string;

    _group: any;

    _minusSign: any;

    _currency: Nullable<RegExp | string>;

    _prefix: Nullable<RegExp>;

    _suffix: Nullable<RegExp>;

    _index: number | any;

    _componentStyle = inject(InputNumberStyle);

    private ngControl: NgControl | null = null;

    constructor(public readonly injector: Injector) {
        super();
    }

    ngOnChanges(simpleChange: SimpleChanges) {
        super.ngOnChanges(simpleChange);
        const props = ['locale', 'localeMatcher', 'mode', 'currency', 'currencyDisplay', 'useGrouping', 'minFractionDigits', 'maxFractionDigits', 'prefix', 'suffix'];
        if (props.some((p) => !!simpleChange[p])) {
            this.updateConstructParser();
        }
    }

    ngOnInit() {
        super.ngOnInit();

        this.ngControl = this.injector.get(NgControl, null, { optional: true });

        this.constructParser();

        this.initialized = true;
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'clearicon':
                    this._clearIconTemplate = item.template;
                    break;

                case 'incrementbuttonicon':
                    this._incrementButtonIconTemplate = item.template;
                    break;

                case 'decrementbuttonicon':
                    this._decrementButtonIconTemplate = item.template;
                    break;
            }
        });
    }

    getOptions() {
        return {
            localeMatcher: this.localeMatcher,
            style: this.mode,
            currency: this.currency,
            currencyDisplay: this.currencyDisplay,
            useGrouping: this.useGrouping,
            minimumFractionDigits: this.minFractionDigits ?? undefined,
            maximumFractionDigits: this.maxFractionDigits ?? undefined
        };
    }

    constructParser() {
        this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
        const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [d, i]));
        this._numeral = new RegExp(`[${numerals.join('')}]`, 'g');
        this._group = this.getGroupingExpression();
        this._minusSign = this.getMinusSignExpression();
        this._currency = this.getCurrencyExpression();
        this._decimal = this.getDecimalExpression();
        this._decimalChar = this.getDecimalChar();
        this._suffix = this.getSuffixExpression();
        this._prefix = this.getPrefixExpression();
        this._index = (d: any) => index.get(d);
    }

    updateConstructParser() {
        if (this.initialized) {
            this.constructParser();
        }
    }

    escapeRegExp(text: string): string {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    getDecimalExpression(): RegExp {
        const decimalChar = this.getDecimalChar();
        return new RegExp(`[${decimalChar}]`, 'g');
    }
    getDecimalChar(): string {
        const formatter = new Intl.NumberFormat(this.locale, { ...this.getOptions(), useGrouping: false });
        return formatter
            .format(1.1)
            .replace(this._currency as RegExp | string, '')
            .trim()
            .replace(this._numeral, '');
    }

    getGroupingExpression(): RegExp {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });
        this.groupChar = formatter.format(1000000).trim().replace(this._numeral, '').charAt(0);
        return new RegExp(`[${this.groupChar}]`, 'g');
    }

    getMinusSignExpression(): RegExp {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
        return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, '')}]`, 'g');
    }

    getCurrencyExpression(): RegExp {
        if (this.currency) {
            const formatter = new Intl.NumberFormat(this.locale, {
                style: 'currency',
                currency: this.currency,
                currencyDisplay: this.currencyDisplay,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            return new RegExp(`[${formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._group, '')}]`, 'g');
        }

        return new RegExp(`[]`, 'g');
    }

    getPrefixExpression(): RegExp {
        if (this.prefix) {
            this.prefixChar = this.prefix;
        } else {
            const formatter = new Intl.NumberFormat(this.locale, {
                style: this.mode,
                currency: this.currency,
                currencyDisplay: this.currencyDisplay
            });
            this.prefixChar = formatter.format(1).split('1')[0];
        }

        return new RegExp(`${this.escapeRegExp(this.prefixChar || '')}`, 'g');
    }

    getSuffixExpression(): RegExp {
        if (this.suffix) {
            this.suffixChar = this.suffix;
        } else {
            const formatter = new Intl.NumberFormat(this.locale, {
                style: this.mode,
                currency: this.currency,
                currencyDisplay: this.currencyDisplay,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            this.suffixChar = formatter.format(1).split('1')[1];
        }

        return new RegExp(`${this.escapeRegExp(this.suffixChar || '')}`, 'g');
    }

    formatValue(value: any) {
        if (value != null) {
            if (value === '-') {
                // Minus sign
                return value;
            }

            if (this.format) {
                let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
                let formattedValue = formatter.format(value);

                if (this.prefix && value != this.prefix) {
                    formattedValue = this.prefix + formattedValue;
                }

                if (this.suffix && value != this.suffix) {
                    formattedValue = formattedValue + this.suffix;
                }

                return formattedValue;
            }

            return value.toString();
        }

        return '';
    }

    parseValue(text: any) {
        const suffixRegex = new RegExp(this._suffix, '');
        const prefixRegex = new RegExp(this._prefix, '');
        const currencyRegex = new RegExp(this._currency, '');

        let filteredText = text
            .replace(suffixRegex, '')
            .replace(prefixRegex, '')
            .trim()
            .replace(/\s/g, '')
            .replace(currencyRegex, '')
            .replace(this._group, '')
            .replace(this._minusSign, '-')
            .replace(this._decimal, '.')
            .replace(this._numeral, this._index);

        if (filteredText) {
            if (filteredText === '-')
                // Minus sign
                return filteredText;

            let parsedValue = +filteredText;
            return isNaN(parsedValue) ? null : parsedValue;
        }

        return null;
    }

    repeat(event: Event, interval: number | null, dir: number) {
        if (this.readonly) {
            return;
        }

        let i = interval || 500;

        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);

        this.spin(event, dir);
    }

    spin(event: Event, dir: number) {
        let step = (this.step() ?? 1) * dir;
        let currentValue = this.parseValue(this.input?.nativeElement.value) || 0;
        let newValue = this.validateValue((currentValue as number) + step);
        if (this.maxlength() && this.maxlength() < this.formatValue(newValue).length) {
            return;
        }
        this.updateInput(newValue, null, 'spin', null);
        this.updateModel(event, newValue);

        this.handleOnInput(event, currentValue, newValue);
    }

    clear() {
        this.value = null;
        this.onModelChange(this.value);
        this.onClear.emit();
    }

    onUpButtonMouseDown(event: MouseEvent) {
        if (event.button === 2) {
            this.clearTimer();
            return;
        }

        if (!this.$disabled()) {
            this.input?.nativeElement.focus();
            this.repeat(event, null, 1);
            event.preventDefault();
        }
    }

    onUpButtonMouseUp() {
        if (!this.$disabled()) {
            this.clearTimer();
        }
    }

    onUpButtonMouseLeave() {
        if (!this.$disabled()) {
            this.clearTimer();
        }
    }

    onUpButtonKeyDown(event: KeyboardEvent) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, 1);
        }
    }

    onUpButtonKeyUp() {
        if (!this.$disabled()) {
            this.clearTimer();
        }
    }

    onDownButtonMouseDown(event: MouseEvent) {
        if (event.button === 2) {
            this.clearTimer();
            return;
        }
        if (!this.$disabled()) {
            this.input?.nativeElement.focus();
            this.repeat(event, null, -1);
            event.preventDefault();
        }
    }

    onDownButtonMouseUp() {
        if (!this.$disabled()) {
            this.clearTimer();
        }
    }

    onDownButtonMouseLeave() {
        if (!this.$disabled()) {
            this.clearTimer();
        }
    }

    onDownButtonKeyUp() {
        if (!this.$disabled()) {
            this.clearTimer();
        }
    }

    onDownButtonKeyDown(event: KeyboardEvent) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, -1);
        }
    }

    onUserInput(event: Event) {
        if (this.readonly) {
            return;
        }

        if (this.isSpecialChar) {
            (event.target as HTMLInputElement).value = this.lastValue as string;
        }
        this.isSpecialChar = false;
    }

    onInputKeyDown(event: KeyboardEvent) {
        if (this.readonly) {
            return;
        }

        this.lastValue = (event.target as HTMLInputElement).value;
        if ((event as KeyboardEvent).shiftKey || (event as KeyboardEvent).altKey) {
            this.isSpecialChar = true;
            return;
        }

        let selectionStart = (event.target as HTMLInputElement).selectionStart as number;
        let selectionEnd = (event.target as HTMLInputElement).selectionEnd as number;
        let inputValue = (event.target as HTMLInputElement).value as string;
        let newValueStr = null;

        if (event.altKey) {
            event.preventDefault();
        }

        switch (event.key) {
            case 'ArrowUp':
                this.spin(event, 1);
                event.preventDefault();
                break;

            case 'ArrowDown':
                this.spin(event, -1);
                event.preventDefault();
                break;

            case 'ArrowLeft':
                for (let index = selectionStart; index <= inputValue.length; index++) {
                    const previousCharIndex = index === 0 ? 0 : index - 1;
                    if (this.isNumeralChar(inputValue.charAt(previousCharIndex))) {
                        this.input.nativeElement.setSelectionRange(index, index);
                        break;
                    }
                }
                break;

            case 'ArrowRight':
                for (let index = selectionEnd; index >= 0; index--) {
                    if (this.isNumeralChar(inputValue.charAt(index))) {
                        this.input.nativeElement.setSelectionRange(index, index);
                        break;
                    }
                }
                break;

            case 'Tab':
            case 'Enter':
                newValueStr = this.validateValue(this.parseValue(this.input.nativeElement.value));
                this.input.nativeElement.value = this.formatValue(newValueStr);
                this.input.nativeElement.setAttribute('aria-valuenow', newValueStr);
                this.updateModel(event, newValueStr);
                break;

            case 'Backspace': {
                event.preventDefault();

                if (selectionStart === selectionEnd) {
                    if ((selectionStart == 1 && this.prefix) || (selectionStart == inputValue.length && this.suffix)) {
                        break;
                    }

                    const deleteChar = inputValue.charAt(selectionStart - 1);
                    const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);

                    if (this.isNumeralChar(deleteChar)) {
                        const decimalLength = this.getDecimalLength(inputValue);

                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                        } else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;

                            if (decimalLength) {
                                this.input?.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            } else {
                                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                            }
                        } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';
                            newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
                        } else if (decimalCharIndexWithoutPrefix === 1) {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                            newValueStr = (this.parseValue(newValueStr) as number) > 0 ? newValueStr : '';
                        } else {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                        }
                    } else if (this.mode === 'currency' && deleteChar.search(this._currency) != -1) {
                        newValueStr = inputValue.slice(1);
                    }

                    this.updateValue(event, newValueStr, null, 'delete-single');
                } else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, null, 'delete-range');
                }

                break;
            }

            case 'Delete':
                event.preventDefault();

                if (selectionStart === selectionEnd) {
                    if ((selectionStart == 0 && this.prefix) || (selectionStart == inputValue.length - 1 && this.suffix)) {
                        break;
                    }
                    const deleteChar = inputValue.charAt(selectionStart);
                    const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);

                    if (this.isNumeralChar(deleteChar)) {
                        const decimalLength = this.getDecimalLength(inputValue);

                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                        } else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;

                            if (decimalLength) {
                                this.input?.nativeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
                            } else {
                                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                            }
                        } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';
                            newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
                        } else if (decimalCharIndexWithoutPrefix === 1) {
                            newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                            newValueStr = (this.parseValue(newValueStr) as number) > 0 ? newValueStr : '';
                        } else {
                            newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                        }
                    }

                    this.updateValue(event, newValueStr as string, null, 'delete-back-single');
                } else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, null, 'delete-range');
                }
                break;

            case 'Home':
                if (this.min()) {
                    this.updateModel(event, this.min());
                    event.preventDefault();
                }
                break;

            case 'End':
                if (this.max()) {
                    this.updateModel(event, this.max());
                    event.preventDefault();
                }
                break;

            default:
                break;
        }

        this.onKeyDown.emit(event);
    }

    onInputKeyPress(event: KeyboardEvent) {
        if (this.readonly) {
            return;
        }

        let code = event.which || event.keyCode;
        let char = String.fromCharCode(code);
        let isDecimalSign = this.isDecimalSign(char);
        const isMinusSign = this.isMinusSign(char);

        if (code != 13) {
            event.preventDefault();
        }
        if (!isDecimalSign && event.code === 'NumpadDecimal') {
            isDecimalSign = true;
            char = this._decimalChar;
            code = char.charCodeAt(0);
        }
        const { value, selectionStart, selectionEnd } = this.input.nativeElement;
        const newValue = this.parseValue(value + char);
        const newValueStr = newValue != null ? newValue.toString() : '';
        const selectedValue = value.substring(selectionStart, selectionEnd);
        const selectedValueParsed = this.parseValue(selectedValue);
        const selectedValueStr = selectedValueParsed != null ? selectedValueParsed.toString() : '';

        if (selectionStart !== selectionEnd && selectedValueStr.length > 0) {
            this.insert(event, char, { isDecimalSign, isMinusSign });
            return;
        }

        if (this.maxlength() && newValueStr.length > this.maxlength()) {
            return;
        }

        if ((48 <= code && code <= 57) || isMinusSign || isDecimalSign) {
            this.insert(event, char, { isDecimalSign, isMinusSign });
        }
    }

    onPaste(event: ClipboardEvent) {
        if (!this.$disabled() && !this.readonly) {
            event.preventDefault();
            let data = (event.clipboardData || (this.document as any).defaultView['clipboardData']).getData('Text');
            if (data) {
                if (this.maxlength()) {
                    data = data.toString().substring(0, this.maxlength());
                }

                let filteredData = this.parseValue(data);
                if (filteredData != null) {
                    this.insert(event, filteredData.toString());
                }
            }
        }
    }

    allowMinusSign() {
        return this.min() == null || this.min() < 0;
    }

    isMinusSign(char: string) {
        if (this._minusSign.test(char) || char === '-') {
            this._minusSign.lastIndex = 0;
            return true;
        }

        return false;
    }

    isDecimalSign(char: string) {
        if (this._decimal.test(char)) {
            this._decimal.lastIndex = 0;
            return true;
        }

        return false;
    }

    isDecimalMode() {
        return this.mode === 'decimal';
    }

    getDecimalCharIndexes(val: string) {
        let decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;

        const filteredVal = val
            .replace(this._prefix as RegExp, '')
            .trim()
            .replace(/\s/g, '')
            .replace(this._currency as RegExp, '');
        const decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
        this._decimal.lastIndex = 0;

        return { decimalCharIndex, decimalCharIndexWithoutPrefix };
    }

    getCharIndexes(val: string) {
        const decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;
        const minusCharIndex = val.search(this._minusSign);
        this._minusSign.lastIndex = 0;
        const suffixCharIndex = val.search(this._suffix as RegExp);
        (this._suffix as RegExp).lastIndex = 0;
        const currencyCharIndex = val.search(this._currency as RegExp);
        (this._currency as RegExp).lastIndex = 0;

        return { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex };
    }

    insert(event: Event, text: string, sign = { isDecimalSign: false, isMinusSign: false }) {
        const minusCharIndexOnText = text.search(this._minusSign);
        this._minusSign.lastIndex = 0;
        if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
            return;
        }

        let selectionStart = this.input?.nativeElement.selectionStart;
        let selectionEnd = this.input?.nativeElement.selectionEnd;
        let inputValue = this.input?.nativeElement.value.trim();
        const { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex } = this.getCharIndexes(inputValue);
        let newValueStr;

        if (sign.isMinusSign) {
            if (selectionStart === 0) {
                newValueStr = inputValue;
                if (minusCharIndex === -1 || selectionEnd !== 0) {
                    newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
                }

                this.updateValue(event, newValueStr, text, 'insert');
            }
        } else if (sign.isDecimalSign) {
            if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
                this.updateValue(event, inputValue, text, 'insert');
            } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, 'insert');
            } else if (decimalCharIndex === -1 && this.maxFractionDigits) {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, 'insert');
            }
        } else {
            const maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
            const operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';

            if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
                    const charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;

                    newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
                    this.updateValue(event, newValueStr, text, operation);
                }
            } else {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, operation);
            }
        }
    }

    insertText(value: string, text: string, start: number, end: number) {
        let textSplit = text === '.' ? text : text.split('.');

        if (textSplit.length === 2) {
            const decimalCharIndex = value.slice(start, end).search(this._decimal);
            this._decimal.lastIndex = 0;
            return decimalCharIndex > 0 ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : value || this.formatValue(text);
        } else if (end - start === value.length) {
            return this.formatValue(text);
        } else if (start === 0) {
            return text + value.slice(end);
        } else if (end === value.length) {
            return value.slice(0, start) + text;
        } else {
            return value.slice(0, start) + text + value.slice(end);
        }
    }

    deleteRange(value: string, start: number, end: number) {
        let newValueStr;

        if (end - start === value.length) newValueStr = '';
        else if (start === 0) newValueStr = value.slice(end);
        else if (end === value.length) newValueStr = value.slice(0, start);
        else newValueStr = value.slice(0, start) + value.slice(end);

        return newValueStr;
    }

    initCursor() {
        let selectionStart = this.input?.nativeElement.selectionStart;
        let selectionEnd = this.input?.nativeElement.selectionEnd;
        let inputValue = this.input?.nativeElement.value;
        let valueLength = inputValue.length;
        let index = null;

        // remove prefix
        let prefixLength = (this.prefixChar || '').length;
        inputValue = inputValue.replace(this._prefix, '');

        // Will allow selecting whole prefix. But not a part of it.
        // Negative values will trigger clauses after this to fix the cursor position.
        if (selectionStart === selectionEnd || selectionStart !== 0 || selectionEnd < prefixLength) {
            selectionStart -= prefixLength;
        }

        let char = inputValue.charAt(selectionStart);
        if (this.isNumeralChar(char)) {
            return selectionStart + prefixLength;
        }

        //left
        let i = selectionStart - 1;
        while (i >= 0) {
            char = inputValue.charAt(i);
            if (this.isNumeralChar(char)) {
                index = i + prefixLength;
                break;
            } else {
                i--;
            }
        }

        if (index !== null) {
            this.input?.nativeElement.setSelectionRange(index + 1, index + 1);
        } else {
            i = selectionStart;
            while (i < valueLength) {
                char = inputValue.charAt(i);
                if (this.isNumeralChar(char)) {
                    index = i + prefixLength;
                    break;
                } else {
                    i++;
                }
            }

            if (index !== null) {
                this.input?.nativeElement.setSelectionRange(index, index);
            }
        }

        return index || 0;
    }

    onInputClick() {
        const currentValue = this.input?.nativeElement.value;

        if (!this.readonly && currentValue !== getSelection()) {
            this.initCursor();
        }
    }

    isNumeralChar(char: string) {
        if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
            this.resetRegex();
            return true;
        }

        return false;
    }

    resetRegex() {
        this._numeral.lastIndex = 0;
        this._decimal.lastIndex = 0;
        this._group.lastIndex = 0;
        this._minusSign.lastIndex = 0;
    }

    updateValue(event: Event, valueStr: Nullable<string>, insertedValueStr: Nullable<string>, operation: Nullable<string>) {
        let currentValue = this.input?.nativeElement.value;
        let newValue = null;

        if (valueStr != null) {
            newValue = this.parseValue(valueStr);
            newValue = !newValue && !this.allowEmpty ? 0 : newValue;
            this.updateInput(newValue, insertedValueStr, operation, valueStr);

            this.handleOnInput(event, currentValue, newValue);
        }
    }

    handleOnInput(event: Event, currentValue: string, newValue: any) {
        if (this.isValueChanged(currentValue, newValue)) {
            (this.input as ElementRef).nativeElement.value = this.formatValue(newValue);
            this.input?.nativeElement.setAttribute('aria-valuenow', newValue);
            this.updateModel(event, newValue);
            this.onInput.emit({ originalEvent: event, value: newValue, formattedValue: currentValue });
        }
    }

    isValueChanged(currentValue: string, newValue: string) {
        if (newValue === null && currentValue !== null) {
            return true;
        }

        if (newValue != null) {
            let parsedCurrentValue = typeof currentValue === 'string' ? this.parseValue(currentValue) : currentValue;
            return newValue !== parsedCurrentValue;
        }

        return false;
    }

    validateValue(value: number | string) {
        if (value === '-' || value == null) {
            return null;
        }

        if (this.min() != null && (value as number) < this.min()) {
            return this.min();
        }

        if (this.max() != null && (value as number) > this.max()) {
            return this.max();
        }

        return value;
    }

    updateInput(value: any, insertedValueStr: Nullable<string>, operation: Nullable<string>, valueStr: Nullable<string>) {
        insertedValueStr = insertedValueStr || '';

        let inputValue = this.input?.nativeElement.value;
        let newValue = this.formatValue(value);
        let currentLength = inputValue.length;

        if (newValue !== valueStr) {
            newValue = this.concatValues(newValue, valueStr as string);
        }

        if (currentLength === 0) {
            this.input.nativeElement.value = newValue;
            this.input.nativeElement.setSelectionRange(0, 0);
            const index = this.initCursor();
            const selectionEnd = index + insertedValueStr.length;
            this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
        } else {
            let selectionStart = this.input.nativeElement.selectionStart;
            let selectionEnd = this.input.nativeElement.selectionEnd;

            if (this.maxlength() && newValue.length > this.maxlength()) {
                newValue = newValue.slice(0, this.maxlength());
                selectionStart = Math.min(selectionStart, this.maxlength());
                selectionEnd = Math.min(selectionEnd, this.maxlength());
            }

            if (this.maxlength() && this.maxlength() < newValue.length) {
                return;
            }

            this.input.nativeElement.value = newValue;
            let newLength = newValue.length;

            if (operation === 'range-insert') {
                const startValue = this.parseValue((inputValue || '').slice(0, selectionStart));
                const startValueStr = startValue !== null ? startValue.toString() : '';
                const startExpr = startValueStr.split('').join(`(${this.groupChar})?`);
                const sRegex = new RegExp(startExpr, 'g');
                sRegex.test(newValue);

                const tExpr = insertedValueStr.split('').join(`(${this.groupChar})?`);
                const tRegex = new RegExp(tExpr, 'g');
                tRegex.test(newValue.slice(sRegex.lastIndex));

                selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            } else if (newLength === currentLength) {
                if (operation === 'insert' || operation === 'delete-back-single') this.input.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
                else if (operation === 'delete-single') this.input.nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
                else if (operation === 'delete-range' || operation === 'spin') this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            } else if (operation === 'delete-back-single') {
                let prevChar = inputValue.charAt(selectionEnd - 1);
                let nextChar = inputValue.charAt(selectionEnd);
                let diff = currentLength - newLength;
                let isGroupChar = this._group.test(nextChar);

                if (isGroupChar && diff === 1) {
                    selectionEnd += 1;
                } else if (!isGroupChar && this.isNumeralChar(prevChar)) {
                    selectionEnd += -1 * diff + 1;
                }

                this._group.lastIndex = 0;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            } else if (inputValue === '-' && operation === 'insert') {
                this.input.nativeElement.setSelectionRange(0, 0);
                const index = this.initCursor();
                const selectionEnd = index + insertedValueStr.length + 1;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            } else {
                selectionEnd = selectionEnd + (newLength - currentLength);
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
        }

        this.input.nativeElement.setAttribute('aria-valuenow', value);
    }

    concatValues(val1: string, val2: string) {
        if (val1 && val2) {
            let decimalCharIndex = val2.search(this._decimal);
            this._decimal.lastIndex = 0;

            if (this.suffixChar) {
                return decimalCharIndex !== -1 ? val1.replace(this.suffixChar, '').split(this._decimal)[0] + val2.replace(this.suffixChar, '').slice(decimalCharIndex) + this.suffixChar : val1;
            } else {
                return decimalCharIndex !== -1 ? val1.split(this._decimal)[0] + val2.slice(decimalCharIndex) : val1;
            }
        }
        return val1;
    }

    getDecimalLength(value: string) {
        if (value) {
            const valueSplit = value.split(this._decimal);

            if (valueSplit.length === 2) {
                return valueSplit[1]
                    .replace(this._suffix as RegExp, '')
                    .trim()
                    .replace(/\s/g, '')
                    .replace(this._currency as RegExp, '').length;
            }
        }

        return 0;
    }

    onInputFocus(event: Event) {
        this.focused = true;
        this.onFocus.emit(event);
    }

    onInputBlur(event: Event) {
        this.focused = false;

        const newValueNumber = this.validateValue(this.parseValue(this.input.nativeElement.value));
        const newValueString = newValueNumber?.toString();
        this.input.nativeElement.value = this.formatValue(newValueString);
        this.input.nativeElement.setAttribute('aria-valuenow', newValueString);
        this.updateModel(event, newValueNumber);
        this.onModelTouched();
        this.onBlur.emit(event);
    }

    formattedValue() {
        const val = !this.value && !this.allowEmpty ? 0 : this.value;
        return this.formatValue(val);
    }

    updateModel(event: Event, value: any) {
        const isBlurUpdateOnMode = this.ngControl?.control?.updateOn === 'blur';

        if (this.value !== value) {
            this.value = value;

            if (!(isBlurUpdateOnMode && this.focused)) {
                this.onModelChange(value);
            }
        } else if (isBlurUpdateOnMode) {
            this.onModelChange(value);
        }
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void): void {
        this.value = value ? Number(value) : value;
        setModelValue(value);
        this.cd.markForCheck();
    }

    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}

@NgModule({
    imports: [InputNumber, SharedModule],
    exports: [InputNumber, SharedModule]
})
export class InputNumberModule {}
