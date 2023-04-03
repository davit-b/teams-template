import { useCallback, useState } from "preact/hooks"

export default function ButtonModal() {
  const [open, setOpen] = useState(false)

  const exitModal = useCallback(() => {
    setOpen(false)
  }, [open])

  const innerOnClick = useCallback((e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <div>
      <button
        type="button"
        className="bg-blue-400 px-2 py-1 rounded-lg"
        onClick={() => setOpen(true)}
      >
        Open modal
      </button>
      {open && (
        <div
          class="fixed top-0 bottom-0 right-0 left-0 bg-gray-500 z-50 opacity-80 flex justify-center items-center"
          onClick={exitModal}
        >
          <div
            class="w-5/6 max-w-xl bg-opacity-100 bg-[hsla(0,100%,50%,1)]"
            onClick={innerOnClick}
          >
            <button type="button" onClick={() => setOpen(false)}>Close modal</button>
          </div>
        </div>
      )}
    </div>
  )
}
