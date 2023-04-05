import { useCallback, useState } from "preact/hooks"
import { NewUserInput } from "../_model/_model.ts"

export default function ButtonModal({ teamId, teamName }: { teamId: string; teamName: string }) {
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
        class="bg-blue-400 px-2 py-1 rounded-lg"
        onClick={() => setOpen(true)}
      >
        Invite User
      </button>
      {open && (
        <div
          class="fixed top-0 bottom-0 right-0 left-0 bg-gray-500 z-50 opacity-90 flex justify-center items-center"
          onClick={exitModal}
        >
          <div
            class="w-5/6 max-w-xl bg-opacity-100 bg-[hsla(0,100%,50%,1)]"
            onClick={innerOnClick}
          >
            <button type="button" onClick={() => setOpen(false)}>Close modal</button>
            <InviteUser teamId={teamId} teamName={teamName} />
          </div>
        </div>
      )}
    </div>
  )
}

function InviteUser({ teamId, teamName }: { teamId: string; teamName: string }) {
  const [fields, setFields] = useState<NewUserInput>({
    teamId,
    githubId: "",
    teamName,
  })
  const [error, setError] = useState(false)

  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const element = e.target as HTMLInputElement
    setFields({ ...fields, [key]: element.value })
    setError(false) // Reset error on new key strokes
  }, [fields])

  const handleSubmit = useCallback(async () => {
    try {
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      })

      switch (response.status) {
        case 200: {
          // const data = await response.text()
          // console.log("Form submitted successfully", data)
          location.reload()
          break
        }
        case 403: {
          const duplicate = await response.text()
          console.error("Error submitting form on duplicate", duplicate)
          setError(true)
          break
        }
        default: {
          throw new Error("Failed to submit form")
        }
      }
    } catch (e) {
      setError(true)
      console.error("Error submitting form:", e)
    }
  }, [fields])

  return (
    <form>
      <input
        type="text"
        name="githubId"
        placeholder="Enter Github username"
        value={fields.githubId}
        onInput={(e) => handleChange(e, "githubId")}
      />
      {error && <h1>ERROR DUPLICATE</h1>}

      <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}
