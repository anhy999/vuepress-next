import { onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { HotKeyOptions } from '../../shared'
import { isKeyMatched } from '../utils'

export const useHotKeys = ({
  input,
  hotKeys,
}: {
  input: Ref<HTMLInputElement | null>
  hotKeys: Ref<(string | HotKeyOptions)[]>
}): void => {
  if (hotKeys.value.length === 0) return

  const onKeydown = (event: KeyboardEvent): void => {
    if (!input.value) return
    if (
      // key matches
      isKeyMatched(event, hotKeys.value) &&
      // event does not come from search box
      !input.value.contains(event.target as Node)
    ) {
      event.preventDefault()
      input.value.focus()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
  })
}
