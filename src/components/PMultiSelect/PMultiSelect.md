PDataTable example:

```vue
<template>
    <PMultiSelect :options="options"
                id="multiSelect1"
                v-model="computedValue"
                label="testSelect"
                :multiple="false"
                @change="optionChanged"
                :disabled="disabled"
                aria-invalid="false"
                track-by="value"
                :placeholder="placeholder"
                :searchable="searchable"
                :taggable="taggable"
                :close-on-select="!multiple"
                :clear-on-select="false"
                :preserve-search="true"
    > </PMultiSelect>   
</template>
<script>
export default {
  data() {
    return {
      options: [
        {label: 'test1', value:1, disabled: false},
        {label: 'test2', value:2, disabled: true},
        {label: 'test3', value:3, disabled: true},
        {label: 'test4', value:4, disabled: false}
      ],
   
    }
  },
  methods: {
    optionChanged(value) {
        alert('option changed');
      }
  }
}
</script>
```

