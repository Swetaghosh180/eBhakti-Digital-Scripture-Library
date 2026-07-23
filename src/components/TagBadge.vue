<template>
  <span class="tag-minimal">{{ text }}</span>
</template>

<script>
export default {
  name: 'TagBadge',
  props: {
    text: String
  }
}
</script>
