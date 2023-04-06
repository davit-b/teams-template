import { useCallback, useState } from "preact/hooks"
import { NewUserInput } from "../_model/_model.ts"

export default function ExpModal({ teamId, teamName }: { teamId: string; teamName: string }) {
  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="relative modal-box">
          <label htmlFor="my-modal-3" className="absolute btn btn-sm btn-circle right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Add a member</h3>
          <p className="py-4">
            Here you can add a member to this team by typing in their{" "}
            <span class="font-bold">exact github Id.</span>{" "}
            If they are already in the team, you will be unable to add them.
          </p>
          <InviteUser teamId={teamId} teamName={teamName} />
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
    console.log("val", element.value)
    setFields({ ...fields, [key]: element.value })
    setError(false) // Reset error on new key strokes
  }, [fields])

  const handleSubmit = useCallback(async (e: Event) => {
    console.log(fields)
    e.preventDefault()
    // e.stopPropagation()
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

      <button class="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
  )
}
