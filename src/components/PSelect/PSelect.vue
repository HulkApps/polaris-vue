<template>
    <div :class="labelHidden && 'Polaris-Labelled--hidden'">
        <div class="Polaris-Labelled__LabelWrapper" v-if="label">
            <div class="Polaris-Label">
                <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
                    {{ label }}
                </label>
            </div>
        </div>
        <div :class="className">
            <multiselect
                    :id="id"
                    :disabled="disabled"
                    :name="name"
                    :placeholder="placeholder"
                    v-model="computedValue"
                    :options="computedOptions"
                    label="label"
                    track-by="value"
                    :multiple="multiple"
                    :close-on-select="!multiple"
                    @tag="addTag"
                    aria-invalid="false"
                    @close="closeDropdown"
                    :hideSelected="hideSelected"
            >
                <template slot="caret">
                    <div class="multiselect__select">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8l-3-3-3 3h6zm-.1 4L10 14.9 7.1 12h5.8z" fill-rule="evenodd"/>
                        </svg>
                    </div>
                </template>
            </multiselect>
        </div>
        <PFieldError v-if="error" :error="error"/>
        <div v-if="helpText" class="Polaris-Labelled__HelpText">{{helpText}}</div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import {classNames} from '@/utilities/css';
    import Multiselect from 'vue-multiselect';
    import {PFieldError} from '@/components/PFieldError';

    interface StrictOption {
        value: any;
        label: string;
        disabled?: boolean;
        $isDisabled?: boolean;
        hidden?: boolean;
    }

    const PLACEHOLDER_VALUE = null;

    @Component({
        components: {Multiselect, PFieldError},
    })
    export default class PSelect extends Vue {
        @Prop({type: String, default: `PolarisSelect${new Date().getUTCMilliseconds()}`}) public id!: string;
        @Prop(String) public name!: string;
        @Prop(Boolean) public disabled!: boolean;
        @Prop(Boolean) public labelHidden!: boolean;
        @Prop(String) public label!: string;
        @Prop(String) public helpText!: string;
        @Prop({type: Array, default: []}) public options!: any[];
        @Prop({type: Boolean, default: false}) public multiple!: boolean;
        @Prop({type: Boolean, default: false}) public hideSelected!: boolean;
        @Prop(String) public placeholder!: string;
        @Prop(String) public error!: string;

        @Prop({default: PLACEHOLDER_VALUE}) public value!: any;

        public selected = this.value;

        public get computedOptions() {
            const options: StrictOption[] = [];
            if (this.placeholder) {
                options.push({
                    label: this.placeholder,
                    value: PLACEHOLDER_VALUE,
                    $isDisabled: true,
                });
            }
            this.options.map((value: any) => {
                if (typeof value === 'object') {
                    if (value.disabled) {
                        value.$isDisabled = value.disabled;
                    }
                    options.push(value);
                } else {
                    options.push({label: value, value});
                }
            });

            return options;
        }

        public get computedValue() {
            const selectedOptions = [] as any;

            if (this.selected) {
                if (this.multiple) {
                    this.selected.map((value: any) => {
                        if (typeof value === 'object') {
                            selectedOptions.push(value);
                        } else {
                            selectedOptions.push({label: value, value});
                        }
                    });
                } else {
                    if (typeof this.selected === 'object') {
                        selectedOptions.push(this.selected);
                    } else if (typeof this.selected === 'string' || typeof this.selected === 'number') {
                        selectedOptions.push({label: this.selected, value: this.selected});
                    } else {
                        this.options.map((value: any) => {
                            if (value.value === this.selected) {
                                selectedOptions.push({label: value.label, value: this.selected});
                            }
                        });
                    }
                }
            }

            return selectedOptions;
        }

        public set computedValue(value: any) {
            this.selected = value;
            if (this.multiple) {
                this.$emit('change', value);
            } else {
                if (typeof this.value === 'object') {
                    this.$emit('change', value);
                } else {
                    this.$emit('change', value.value);
                }
            }
        }

        public get className() {
            return classNames(
                'Polaris-Select',
                this.disabled && 'Polaris-Select--disabled',
                this.error && 'Polaris-Select--error',
            );
        }

        public closeDropdown(value, id) {
            console.log(value, id);
        }
        public addTag(newTag) {

            if (this.multiple) {
                const tag = {
                    label: newTag,
                    value: newTag,
                };
                this.selected.push(tag);
                this.options.push(tag);
            }
        }

        @Watch('value')
        public onValueChanged(value: any) {
            this.selected = value;
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">

    .Polaris-Select--error .multiselect__tags {
        background-color: #fbeae5 !important;
        border-color: #bf0711 !important;
    }
    .multiselect, .multiselect__input, .multiselect__single {
        font-size: unset;
    }

    .multiselect {
        min-height: 36px;

        .multiselect__input {
            min-height: 36px;
            background: unset;
            margin-bottom: 0;
            padding: 0;
        }

        &.multiselect--active .multiselect__select {
            transform: none;
        }

        .multiselect__select {
            height: 36px;
            width: 32px;
            padding: 4px 5px;
            right: 2px;

            svg {
                margin: 4px 0;
                width: 20px;
                fill: #637381;
            }
        }

        .multiselect__single {
            padding: 0;
            margin: 0;
            line-height: 34px;
            background: unset;
        }

        .multiselect__tags {
            min-height: 36px;
            padding: 0px 40px 0 8px;
            border: 1px solid #c4cdd5;
            box-shadow: 0 0 0 1px transparent, 0 1px 0 0 rgba(22, 29, 37, 0.05);
            border-radius: 3px;
            background: linear-gradient(180deg, #fff, #f9fafb);
        }

        .multiselect__placeholder {
            color: #3b4b5b;
            display: inline-block;
            line-height: 36px;
            vertical-align: top;
            margin-bottom: 0;
            padding-top: 0;
        }

        .multiselect__option--highlight {
            background: #5f6dc5;
        }

        .multiselect__option--highlight:after {
            background: #5f6dc5;
        }

        .multiselect__content-wrapper {
            border: 1px solid #c4cdd5;
            box-shadow: 0 0 0 1px transparent, 0 1px 0 0 rgba(22, 29, 37, 0.05);
            border-radius: 3px;
            background: linear-gradient(180deg, #fff, #f9fafb);
        }

        .multiselect__tag {
            border-radius: 3px;
            background: linear-gradient(180deg, #6371c7, #5563c1);
            margin: 6px 5px 6px 0;
        }

        .multiselect__tags-wrap {
            display: block;
            height: 34px;
        }

        .multiselect__tag-icon:after {
            color: #FFF;
            font-size: 13px;
        }

        .multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
            background: unset;
            outline: none;
        }

        .multiselect__select:before {
            display: none;
        }
    }
</style>
