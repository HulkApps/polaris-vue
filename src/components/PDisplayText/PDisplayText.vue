<template>
  <component :is="element" :class="className">
    <!-- @slot Display content -->
    <slot/>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';
type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

@Component
export default class PDisplayText extends Vue {
  /**
   * Size of the text
   * @values small | medium | large | extraLarge
   */
  @Prop({ type: String, default: 'medium' }) public size!: Size;

  /**
   * Element of text
   * @values h1...h6 | p | span
   */
  @Prop({ type: String, default: 'p' }) public element!: HeadingTagName;

  public get className() {
    return classNames(
      'Polaris-DisplayText',
      this.size && `Polaris-DisplayText--${variationName('size', this.size)}`,
    );
  }
}
</script>
