import { SetupContext, createApp, defineComponent } from 'vue'

const App = defineComponent(() => {
  return () => (
    <div>
      <CompProps str="fesfef" alsoStr="ok" />
      <hr />
      <CompEmit msg="hello" onTest={() => alert('test')} />
    </div>
  )
})

interface Base {
  base?: string
}
interface Props<T> extends Base {
  str: T
  alsoStr: T
  bool?: boolean
  num?: number
  map?: Map<string, string>
}

const CompProps = defineComponent(
  <T extends string | number>(props: Props<T>) => {
    return () => (
      <div>
        {JSON.stringify(props)}
        <br />
        {Object.keys(props).join(', ')}
      </div>
    )
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
    _props: { msg: string; onTest: () => void },
    {
      emit,
      attrs
    }: // Declaring the event here works
    SetupContext<Emits>
  ) => {
    return () => (
      <div>
        <button onClick={() => emit('test')}>Test</button>
        <button onClick={() => emit('test2')}>Test2</button>
        <button onClick={() => emit('test3')}>Test3</button>
        <p>{JSON.stringify(Object.keys(attrs))} is []</p>
      </div>
    )
  }
)

// // Limitation:
// //  - Cannot assign default value of props + declare event in the same time,
// //    due to function.length. Can be fixed by Vue core.

createApp(App).mount('#app')
