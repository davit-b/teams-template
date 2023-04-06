import { useCallback, useState } from "preact/hooks"
import { NewUserInput } from "../_model/_model.ts"

export default function ExpModal() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="relative modal-box">
          <label htmlFor="my-modal-3" className="absolute btn btn-sm btn-circle right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to use Wikipedia for
            free!
          </p>
        </div>
      </div>
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
