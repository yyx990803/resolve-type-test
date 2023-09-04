import { SetupContext, createApp, defineComponent, h } from 'vue'

const App = defineComponent(() => {
  return () =>
    h('div', [
      h(CompProps),
      h('hr'),
      h(CompEmit, {
        msg: 'hello',
        onTest() {
          alert('test')
        },
        onTest2() {
          alert('test2')
        },
        onTest3() {
          alert('test3')
        },
      }),
    ])
})

interface Base {
  base?: string
}
interface Props extends Base {
  str?: string
  bool?: boolean
  num?: number
  map?: Map<string, string>
}

const CompProps = defineComponent(
  (props: Props = { str: 'hello', num: -1 }) => {
    return () =>
      h('div', [JSON.stringify(props), h('br'), Object.keys(props).join(', ')])
  }
)

interface Emits {
  // Declaring the event here works
  test: () => void
  test2(): void
  test3: []
}

const CompEmit = defineComponent(
  (
    _props: { msg: string },
    {
      emit,
      attrs,
    }: // Declaring the event here works
    SetupContext<Emits>
  ) => {
    return () =>
      h('div', [
        h('button', { onClick: () => emit('test') }, ['Test']),
        h('button', { onClick: () => emit('test2') }, ['Test2']),
        h('button', { onClick: () => emit('test3') }, ['Test3']),

        // should be an empty array
        h('p', [JSON.stringify(Object.keys(attrs)), ' is []']),
      ])
  }
)

// Limitation:
//  - Cannot assign default value of props + declare event in the same time,
//    due to function.length. Can be fixed by Vue core.

createApp(App).mount('#app')
